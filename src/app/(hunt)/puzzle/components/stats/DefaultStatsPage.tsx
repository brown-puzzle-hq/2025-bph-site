import StatsTable from "./StatsTable";
import GuessChart from "./GuessChart";
import { columns } from "./Columns";
import { db } from "~/server/db";
import { and, eq, sql, desc } from "drizzle-orm";
import { puzzles, teams, solves, guesses, unlocks, hints } from "@/db/schema";
import { INITIAL_PUZZLES } from "~/hunt.config";

export default async function DefaultStatsPage({
  puzzleId,
}: {
  puzzleId: string;
}) {
  const puzzleAnswer = await db
    .select({ answer: sql<string>`answer` })
    .from(puzzles)
    .where(eq(puzzles.id, puzzleId))
    .then((res) => res[0]?.answer ?? "");

  const totalUnlocks = INITIAL_PUZZLES.includes(puzzleId)
    ? "-"
    : await db
        .select({
          count: sql<number>`COUNT(${unlocks.id})`,
        })
        .from(unlocks)
        .where(eq(unlocks.puzzleId, puzzleId))
        .then((res) => res[0]?.count ?? 0);

  const totalGuesses = await db
    .select({
      count: sql<number>`COUNT(${guesses.id})`,
    })
    .from(guesses)
    .where(eq(guesses.puzzleId, puzzleId))
    .then((res) => res[0]?.count ?? 0);

  const totalHints = await db
    .select({
      count: sql<number>`COUNT(${hints.id})`,
    })
    .from(hints)
    .where(and(eq(hints.puzzleId, puzzleId)))
    .then((res) => res[0]?.count ?? 0);

  const statsTableData = await db
    .select({
      teamDisplayName: teams.displayName,
      guesses: sql<number>`COUNT(${guesses.id})`,
      unlockTime: unlocks.unlockTime,
      solveTime: solves.solveTime,
    })
    .from(solves)
    .where(eq(solves.puzzleId, puzzleId))
    .innerJoin(teams, eq(solves.teamId, teams.id))
    .innerJoin(
      unlocks,
      and(
        eq(solves.teamId, unlocks.teamId),
        eq(solves.puzzleId, unlocks.puzzleId),
      ),
    )
    .leftJoin(
      guesses,
      and(
        eq(solves.teamId, guesses.teamId),
        eq(solves.puzzleId, guesses.puzzleId),
      ),
    )
    .groupBy(teams.id, unlocks.unlockTime, solves.solveTime);

  const guessChartData = await db
    .select({
      guess: guesses.guess,
      count: sql<number>`COUNT(*)`,
    })
    .from(guesses)
    .where(eq(guesses.puzzleId, puzzleId))
    .groupBy(guesses.guess)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(10);
  return (
    <div className="h-full w-full max-w-3xl flex-col items-center justify-center px-4">
      <div className="flex justify-center space-x-8 py-8">
        <div>
          <div>Teams unlocked: {totalUnlocks}</div>
          <div>Total guesses: {totalGuesses}</div>
        </div>
        <div>
          <div>Total solves: {statsTableData.length}</div>
          <div>Total hints: {totalHints}</div>
        </div>
      </div>
      <div className="flex max-w-3xl justify-center">
        <StatsTable columns={columns} data={statsTableData} />
      </div>
      <div className="flex max-w-3xl flex-col justify-center py-8">
        <p className="py-8">Most Common Guesses</p>
        <GuessChart data={guessChartData} puzzleAnswer={puzzleAnswer} />
      </div>
    </div>
  );
}
