"use server";

import { db } from "~/server/db";
import { eq, and, lt } from "drizzle-orm";
import { tgtd, TGTDDecision } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import { DecisionMap } from "./page";

const DOOR_RANGE = [1, 2, 3, 4, 5, 6];
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

export async function insertTGTDDecision(door: number, decision: TGTDDecision) {
  const session = await auth();
  const teamId = session?.user?.id;
  if (!teamId) return;

  const getCurrentDecisionMap = async (): Promise<DecisionMap> => {
    const decisions = await db
      .select()
      .from(tgtd)
      .where(and(eq(tgtd.teamId, teamId), lt(tgtd.time, new Date())));

    return Object.fromEntries(
      DOOR_RANGE.map((n) => [
        n,
        decisions.find((entry) => entry.door === n) ?? null,
      ]),
    ) as DecisionMap;
  };

  try {
    // Check that cooldown time has passed
    const lastEntry = await db.query.tgtd.findFirst({
      where: and(eq(tgtd.teamId, teamId), eq(tgtd.door, door)),
      orderBy: ({ time }, { desc }) => desc(time),
    });

    const currDate = new Date();

    if (
      lastEntry &&
      lastEntry.time.getTime() + COOLDOWN_MS > currDate.getTime()
    ) {
      return {
        decisionMap: await getCurrentDecisionMap(),
        error: "You must wait 10 minutes before playing the interaction again.",
      };
    }

    await db.insert(tgtd).values({
      teamId,
      door,
      decision,
      time: currDate,
    });

    return { error: null };
  } catch (err) {
    return {
      decisionMap: await getCurrentDecisionMap(),
      error:
        "An error occurred while processing your request. Updating to latest puzzle state.",
    };
  }
}
