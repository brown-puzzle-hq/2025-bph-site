import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { puzzles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { canViewPuzzle, canViewSolution, SEQUENCES } from "~/hunt.config";

export default async function DefaultHeader({
  puzzleId,
  hasSolution,
}: {
  puzzleId: string;
  hasSolution: boolean;
}) {
  const session = await auth();

  // Get sequences that contain this puzzle
  const sequences = SEQUENCES.filter((seq) => seq.puzzles.includes(puzzleId));

  // Show only unlocked puzzles in sequences
  const unlockedSequences = await Promise.all(
    sequences.map((seq) =>
      seq.puzzles.filter(async (puzzleId) => {
        const status = await canViewPuzzle(puzzleId, session);
        return status === "SUCCESS";
      }),
    ),
  );

  // Get puzzle name
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;

  if (!puzzle) {
    redirect("/404");
  }

  return (
    <div>
      <div className="text-center">
        {unlockedSequences.map((seq) => (
          <div className="space-x-1">
            {seq.map((puzzleId) => (
              <span>
                [<Link href={`/puzzle/${puzzleId}`}>{puzzleId}</Link>]
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-4 w-full flex-col items-center pt-6 text-center">
        <h1>{puzzle.name}</h1>
        <div className="space-x-2 text-sm">
          <Link
            href={`/puzzle/${puzzleId}`}
            className="text-link hover:underline"
          >
            Puzzle
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href={`/puzzle/${puzzleId}/hint`}
            className="text-link hover:underline"
          >
            Hint
          </Link>
          {hasSolution &&
            (await canViewSolution(puzzleId, session)) === "SUCCESS" && (
              <>
                <span className="text-gray-500">|</span>
                <Link
                  href={`/puzzle/${puzzleId}/solution`}
                  className="text-link hover:underline"
                >
                  Solution
                </Link>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
