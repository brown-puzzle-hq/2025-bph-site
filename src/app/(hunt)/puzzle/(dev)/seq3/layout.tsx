import Link from "next/link";
import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { puzzles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { canViewPuzzle, SEQUENCES } from "~/hunt.config";
import { puzzleId, SolutionBody } from "./data";
import DefaultHeader from "@/puzzle/components/DefaultHeader";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  // Get sequences that contain this puzzle
  const sequences = SEQUENCES.filter((seq) => seq.includes(puzzleId));

  // Show only unlocked puzzles in sequences
  const unlockedSequences = await Promise.all(
    sequences.map((seq) =>
      seq.filter(async (puzzleId) => {
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

  const hasSolution = !!SolutionBody();

  return (
    <section className="flex w-auto flex-col">
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
      <div className="flex min-w-36 grow flex-col items-center pt-6">
        <DefaultHeader
          puzzleId={puzzleId}
          puzzleName={puzzle.name}
          hasSolution={hasSolution}
        />
        {children}
      </div>
    </section>
  );
}
