import * as data from "./data";
import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { solves, guesses, errata } from "~/server/db/schema";
import { redirect } from "next/navigation";
import GuessTable from "@/puzzle/components/puzzle/guess/GuessTable";
import ErratumDialog from "~/app/(hunt)/puzzle/components/puzzle/ErratumDialog";
import { canViewPuzzle } from "@/puzzle/actions";
import CopyButton from "~/app/(hunt)/puzzle/components/puzzle/CopyButton";

export default async function Page() {
  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
    />
  );
}

async function DefaultPuzzlePage({
  puzzleId,
  inPersonBody,
  copyText,
  partialSolutions,
  tasks,
}: {
  puzzleId: string;
  inPersonBody: (isSolved: boolean) => React.ReactNode;
  copyText: string | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
}) {
  // Authentication
  const session = await auth();
  switch (await canViewPuzzle(puzzleId, session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  // If user is not logged in, show puzzle without errata or guesses
  if (!session?.user?.id) {
    return (
      <div className="mb-8 w-full px-4">
        <div className="no-scrollbar overflow-auto">
          <div className="mx-auto flex w-fit items-start justify-center space-x-2">
            {copyText && <div className="min-w-6" />}
            <div className="w-fit">{inPersonBody(true)}</div>
            {copyText && <CopyButton copyText={copyText} />}
          </div>
        </div>

        {Object.keys(tasks).map((task) => {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // Puzzle answer
  const puzzleAnswer = "KELPIEMUTT";

  // Get errata if user is logged in
  const errataList: {
    puzzleId: string;
    id: number;
    timestamp: Date;
    description: string;
  }[] = (
    await db.query.errata.findMany({
      where: eq(errata.puzzleId, puzzleId),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Get previous guesses
  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, session.user.id),
      eq(guesses.puzzleId, puzzleId),
    ),
  });

  const isSolved = !!(await db.query.solves.findFirst({
    where: and(
      eq(solves.teamId, session.user.id),
      eq(solves.puzzleId, puzzleId),
    ),
  }));

  const puzzleBody = inPersonBody;

  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-3xl">
        <ErratumDialog errataList={errataList} />
      </div>

      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto flex w-fit items-start justify-center space-x-2">
          {copyText && <div className="min-w-6" />}
          <div className="w-fit">{puzzleBody(isSolved)}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable
          puzzleAnswer={puzzleAnswer}
          previousGuesses={previousGuesses}
          partialSolutions={partialSolutions}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
