import { StatsTable } from "./StatsTable";
import { columns } from "./Columns";
import { db } from "~/server/db";
import { and, eq, sql } from "drizzle-orm";
import { teams, solves, guesses, unlocks, hints } from "@/db/schema";
import { INITIAL_PUZZLES } from "~/hunt.config";

export default async function DefaultStatsPage({
  puzzleId,
}: {
  puzzleId: string;
}) {
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

  const data = await db
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

  return (
    <div className="h-full w-full flex-col items-center justify-center px-4">
      <div className="flex justify-center space-x-8 py-8">
        <div>
          <div>Teams unlocked: {totalUnlocks}</div>
          <div>Total guesses: {totalGuesses}</div>
        </div>
        <div>
          <div>Total solves: {data.length}</div>
          <div>Total hints: {totalHints}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <StatsTable columns={columns} data={data} />
      </div>
    </div>
  );
}
