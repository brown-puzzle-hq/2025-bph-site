"use server";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { unlocks, events, answerTokens } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { IN_PERSON, REMOTE, INITIAL_PUZZLES } from "~/hunt.config";

export type viewStatus = "success" | "not_authenticated" | "not_authorized";

/** Checks whether the user can view the puzzle.
 * Admins can always view the puzzle, testsolvers can view the puzzle if it is unlocked,
 * and teams can view the puzzle if the hunt has started AND it is unlocked.
 * Returns a viewStatus string.
 */
export async function canViewPuzzle(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) return "success";
  // Otherwise, they must be signed in
  if (!session?.user?.id) return "not_authenticated";
  // Admin can always view the puzzle
  if (session.user.role == "admin") return "success";

  // If the hunt has ended for in-person teams
  // In-person teams can view puzzles
  if (
    session.user.interactionMode === "in-person" &&
    currentTime > IN_PERSON.END_TIME
  )
    return "success";

  // If they are a testsolver, or the hunt has started for them,
  // then check whether they have unlocked the puzzle
  if (
    session.user.role === "testsolver" ||
    currentTime >
      (session.user.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME)
  ) {
    const isInitialPuzzle = INITIAL_PUZZLES.includes(puzzleId);
    const isUnlocked = !!(await db.query.unlocks.findFirst({
      columns: { id: true },
      where: and(
        eq(unlocks.teamId, session.user.id),
        eq(unlocks.puzzleId, puzzleId),
      ),
    }));

    return isInitialPuzzle || isUnlocked ? "success" : "not_authorized";
  }

  // The hunt has not started yet and the user is not an admin or testsolver
  return "not_authorized";
}

/** Checks whether the user can view the solution.
 *  Does not check whether the solution actually exists.
 * Returns a viewStatus string.
 */
export async function canViewSolution(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  if (!session?.user?.id) return "not_authenticated";
  if (session.user.role == "admin") return "success";
  else return "not_authorized";
  // // If the hunt has ended, anyone can view solutions
  // if (new Date() > REMOTE.END_TIME) return "success";
  // // If the hunt has not ended, users must be signed-in
  // if (!session?.user?.id) return "not_authenticated";
  // // Admin can always view the solution
  // if (session.user.role == "admin") return "success";
  //
  // // Everyone else needs to have solved the puzzle
  // const solved = await db.query.solves.findFirst({
  //   where: and(
  //     eq(solves.teamId, session.user.id),
  //     eq(solves.puzzleId, puzzleId),
  //   ),
  // });
  //
  // return solved ? "success" : "not_authorized";
}

/** Inserts an answer token into the token table */
export async function insertAnswerToken(eventId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in!" };

  const teamId = session.user.id;
  const currDate = new Date();

  // Check that the team has not already had a token
  const token = await db.query.answerTokens.findFirst({
    where: and(
      eq(answerTokens.teamId, teamId),
      eq(answerTokens.eventId, eventId),
    ),
  });
  if (token) {
    revalidatePath(`/puzzle`);
    return { error: "Token already used!" };
  }

  // Check that the token is valid
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });
  if (!event) return { error: "Event not found!" };
  if (event.answer !== guess) return { error: "Incorrect token!" };

  // Insert a token into the token table
  await db.insert(answerTokens).values({
    teamId,
    eventId,
    timestamp: currDate,
  });

  revalidatePath(`/puzzle`);
  return { error: null };
}
