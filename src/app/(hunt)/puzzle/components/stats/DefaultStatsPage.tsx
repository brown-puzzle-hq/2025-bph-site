import StatsTable from "./StatsTable";
import GuessChart from "./GuessChart";
import { columns } from "./Columns";
import { db } from "~/server/db";
import { and, eq, sql, desc } from "drizzle-orm";
import { puzzles, teams, solves, guesses, unlocks, hints } from "@/db/schema";
import { INITIAL_PUZZLES } from "~/hunt.config";
import { LockOpen } from "lucide-react";

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
    <div className="mb-12 w-full max-w-3xl space-y-8 px-4">
      <div className="grid grid-cols-4 gap-0 overflow-hidden rounded-md text-center sm:gap-4">
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Unlocks</p>
          <p className="text-2xl font-bold">{totalUnlocks}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Guesses</p>
          <p className="text-2xl font-bold">{totalGuesses}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Solves</p>
          <p className="text-2xl font-bold">{statsTableData.length}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Hints</p>
          <p className="text-2xl font-bold">{totalHints}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-main-header">Team Statistics</p>
        <StatsTable columns={columns} data={statsTableData} />
      </div>
      <div>
        <p className="mb-4 font-semibold text-main-header">
          Most Common Guesses
        </p>
        <div className="flex w-full flex-col">
          <GuessChart data={guessChartData} puzzleAnswer={puzzleAnswer} />
        </div>
      </div>
    </div>
  );
}
