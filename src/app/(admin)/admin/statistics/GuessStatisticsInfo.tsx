import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { guesses, puzzles } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import GuessPieChart from "./GuessPieChart";
import { GuessTable } from "./guess-table/GuessTable";
import { columns } from "./guess-table/Columns";
import DefaultHeader from "~/app/(hunt)/puzzle/components/DefaultHeader";

export type GuessWithTeam = typeof guesses.$inferSelect & {
  team: { displayName: string };
};

export default async function GuessStatisticsInfo({
  puzzleId,
}: {
  puzzleId: string;
}) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return;
  }

  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;

  if (!puzzle) {
    throw new Error("Puzzle does not exist in database");
  }

  // Get previous guesses
  const previousGuesses = await db.query.guesses.findMany({
    where: eq(guesses.puzzleId, puzzleId),
    with: {
      team: { columns: { displayName: true } },
    },
  });

  return (
    <div className="flex grow flex-col items-center">
      <DefaultHeader
        puzzleId={puzzleId}
        hasSolution={true}
      />
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-0 text-center">
            <CardTitle>Guess Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex h-[calc(100%-40px)] p-4">
            {previousGuesses.length ? (
              <GuessPieChart previousGuesses={previousGuesses} />
            ) : (
              <p>No guesses yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader className="pb-0 text-center">
            <CardTitle>Recent Guesses</CardTitle>
          </CardHeader>
          <CardContent>
            <GuessTable columns={columns} data={previousGuesses} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
