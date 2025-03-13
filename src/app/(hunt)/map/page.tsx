import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { IN_PERSON, INITIAL_PUZZLES, REMOTE } from "@/hunt.config";
import Link from "next/link";
import { db } from "@/db/index";
import { eq, inArray } from "drizzle-orm";
import { solves, puzzles, unlocks, answerTokens } from "~/server/db/schema";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default async function Home() {
  const session = await auth();
  const currDate = new Date();

  // TODO: should we abstract all of this logic out from here and puzzle page?
  var availablePuzzles: {
    unlockTime: Date | null;
    id: string;
    name: string;
    answer: string;
  }[] = [];

  var solvedPuzzles: { puzzleId: string }[] = [];

  // Not logged in
  if (!session?.user?.id) {
    // If the hunt has not ended, tell them to log in
    if (currDate < REMOTE.END_TIME) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Map</h1>
          <p>
            <Link href="/login" className="text-link hover:underline">
              Login
            </Link>{" "}
            to access map
          </p>
        </div>
      );
    } // Otherwise, let them see all of the puzzles
    else {
      availablePuzzles = (
        await db.query.puzzles.findMany({
          columns: { id: true, name: true, answer: true },
        })
      ).map((puzzle) => ({ ...puzzle, unlockTime: null }));

      solvedPuzzles = [];
    }
  }

  // Logged in
  if (session?.user?.id) {
    // If the hunt has not yet started for users or admin, display a message
    if (
      session.user.role === "user" &&
      currDate <
        (session.user.interactionMode === "in-person"
          ? IN_PERSON.START_TIME
          : REMOTE.START_TIME)
    ) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Map</h1>
          <p>The hunt has not started yet.</p>
        </div>
      );
    }

    // Otherwise, always display the puzzles unlocked
    let initialPuzzles = await db.query.puzzles.findMany({
      columns: { id: true, name: true, answer: true },
      where: inArray(puzzles.id, INITIAL_PUZZLES),
    });

    let unlockedPuzzles = await db.query.unlocks.findMany({
      columns: { unlockTime: true },
      where: eq(unlocks.teamId, session.user.id),
      with: { puzzle: { columns: { id: true, name: true, answer: true } } },
    });

    availablePuzzles = [
      ...initialPuzzles.map((puzzle) => ({ ...puzzle, unlockTime: null })),
      ...unlockedPuzzles.map((unlock) => ({
        ...unlock.puzzle,
        unlockTime: unlock.unlockTime,
      })),
    ];

    solvedPuzzles = await db.query.solves.findMany({
      columns: { puzzleId: true },
      where: eq(solves.teamId, session.user.id),
    });
  }

  return (
    <Map availablePuzzles={availablePuzzles} solvedPuzzles={solvedPuzzles} />
  );
}
