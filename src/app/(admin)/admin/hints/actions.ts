"use server";

import { auth } from "@/auth";
import { hints } from "@/db/schema";
import { db } from "@/db/index";
import { eq, and, isNull, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendEmail, extractEmails } from "~/lib/utils";
import { HintEmailTemplate } from "~/lib/email-template";

export async function insertHintResponse(
  hintId: number,
  teamDisplayName: string,
  puzzleName: string,
  response: string,
  members: string,
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a response to go through, the hint claimer must be the user and
  // the hint status must be no_response
  let user = session.user.id ? session.user.id : "";
  let result = (
    await db
      .update(hints)
      .set({
        response,
        responseTime: new Date(),
        status: "answered",
      })
      .where(
        and(
          eq(hints.id, hintId),
          eq(hints.claimer, user),
          eq(hints.status, "no_response"),
        ),
      )
      .returning({
        id: hints.id,
        request: hints.request,
        puzzleId: hints.puzzleId,
      })
  )?.[0];

  revalidatePath("/admin/");

  // Error-handling
  if (!result) {
    let hintSearch = await db.query.hints.findFirst({
      where: eq(hints.id, hintId),
    });
    if (!hintSearch) {
      return {
        title: "Error responding to hint",
        error: "Hint entry not found",
        response: response,
      };
    } else if (hintSearch.claimer !== user) {
      return {
        title: "Error responding to hint",
        error: `Hint not claimed by user. Its current value is ${hintSearch.claimer}.`,
        response: response,
      };
    } else if (hintSearch.status != "no_response") {
      return {
        title: "Error responding to hint",
        error: `Hint status is not no_response. It is ${hintSearch.status}.`,
        response: response,
      };
    } else {
      return {
        title: "Error responding to hint",
        error: "Unexpected error occured",
        response: response,
      };
    }
  }

  // Send email
  await sendEmail(
    extractEmails(members),
    `Hint Answered [${puzzleName}]`,
    HintEmailTemplate({
      teamDisplayName: teamDisplayName,
      puzzleName: puzzleName,
      puzzleId: result.puzzleId,
      request: result.request,
      response,
    }),
  );

  return { error: null, id: result.id };
}

export async function claimHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be claimed, the claimer must be null
  // And the hint status must be "no_response"
  let result = await db
    .update(hints)
    .set({
      claimer: session.user.id,
      claimTime: new Date(),
    })
    .where(
      and(
        eq(hints.id, hintId),
        isNull(hints.claimer),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  // Error-handling
  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error claiming hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== null) {
      return {
        title: "Error claiming hint",
        error: "Hint already claimed",
      };
    } else if (hint.status !== "no_response") {
      return {
        title: "error claiming hint",
        error: `Hint status is not no_response. It is ${hint.status}.`,
      };
    } else {
      return {
        title: "Error claiming hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}

export async function unclaimHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be unclaimed, the claimer must be the user
  // And the hint status must be "no_response"
  let user = session.user.id ? session.user.id : "";
  let result = await db
    .update(hints)
    .set({ claimer: null, claimTime: null })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, user),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error unclaiming hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== user) {
      return {
        title: "Error unclaiming hint",
        error: "Hint not currently claimed by user",
      };
    } else if (hint.status !== "no_response") {
      return {
        title: "Error unclaiming hint",
        error: `Hint status is not no_response. It is ${hint.status}.`,
      };
    } else {
      return {
        title: "Error unclaiming hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}

export async function refundHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be refunded, the claimer must be the user
  // And the hint status must not be "no_response"
  let user = session.user.id ? session.user.id : "";
  let result = await db
    .update(hints)
    .set({ status: "refunded" })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, user),
        ne(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error refunding hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== user) {
      return {
        title: "Error refunding hint",
        error: "Hint not currently claimed by user",
      };
    } else if (hint.status === "no_response") {
      return {
        title: "Error refunding hint",
        error: "Hint status is no_response",
      };
    } else {
      return {
        title: "Error refunding hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}
