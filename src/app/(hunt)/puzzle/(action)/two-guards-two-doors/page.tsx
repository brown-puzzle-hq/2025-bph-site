import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";
import { db } from "~/server/db";
import { and, eq, lt } from "drizzle-orm";
import { tgtd } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import PuzzleBody from "./PuzzleBody";

const DOOR_RANGE = [1, 2, 3, 4, 5, 6];

export type DecisionMapKey = 1 | 2 | 3 | 4 | 5 | 6;

export type Decision = {
  decision: string;
  time: Date;
};
export type DecisionMap = Record<DecisionMapKey, Decision | null>;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const teamId = session?.user?.id;
  if (!teamId) redirect("/login");

  const decisions = await db
    .select()
    .from(tgtd)
    .where(and(eq(tgtd.teamId, teamId)));

  const decisionMap: Partial<Record<number, Decision>> = {};

  for (const entry of decisions) {
    if (
      !decisionMap[entry.door] ||
      entry.time > decisionMap[entry.door]!.time
    ) {
      decisionMap[entry.door] = entry;
    }
  }

  const currDecisions: DecisionMap = Object.fromEntries(
    DOOR_RANGE.map((n) => [n, decisionMap[n] ?? null]),
  ) as DecisionMap;

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={<PuzzleBody decisionsMap={currDecisions} />}
      remoteBoxBody={<PuzzleBody decisionsMap={currDecisions} />}
      remoteBody={<PuzzleBody decisionsMap={currDecisions} />}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}
