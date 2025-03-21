import Link from "next/link";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { followUps, guesses, hints, unlocks } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import Toast from "../components/hint-page/Toast";
import PreviousHintTable from "../components/hint-page/AdminHintPage";
import PreviousGuessTable from "~/app/(hunt)/puzzle/components/PreviousGuessTable";
import { FormattedTime, ElapsedTime } from "~/lib/time";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import { Label } from "~/components/ui/label";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: number }>;
  searchParams?: { reply?: boolean };
}) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized.");
  }

  // Check if slug is a valid number
  const { slug } = await params;
  const reply = searchParams?.reply;
  const hintId = Number(slug);
  if (isNaN(hintId)) {
    return (
      <Toast
        title={"Invalid path"}
        description={`${slug} is not a valid hint ID.`}
      />
    );
  }

  // Get hint data
  const hint = await db.query.hints.findFirst({
    where: eq(hints.id, hintId),
    with: {
      team: {
        columns: {
          displayName: true,
          id: true,
          members: true,
          interactionMode: true,
        },
      },
      puzzle: { columns: { id: true, name: true, answer: true } },
      claimer: { columns: { id: true, displayName: true } },
      followUps: {
        columns: { id: true, message: true, userId: true, time: true },
        with: { user: { columns: { id: true, displayName: true } } },
        orderBy: [asc(followUps.time)],
      },
    },
  });

  if (!hint) {
    return (
      <Toast
        title={"Hint not found"}
        description={`No hint with ID ${slug} was found.`}
      />
    );
  }

  // If there is no unlock, the unlock time is the start of the hunt
  const unlockTime =
    (
      await db.query.unlocks.findFirst({
        columns: { unlockTime: true },
        where: and(
          eq(unlocks.teamId, hint.teamId),
          eq(unlocks.puzzleId, hint.puzzleId),
        ),
      })
    )?.unlockTime ??
    (hint.team.interactionMode === "in-person"
      ? IN_PERSON.START_TIME
      : REMOTE.START_TIME);

  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, hint.teamId),
      eq(guesses.puzzleId, hint.puzzleId),
    ),
  });

  return (
    <div className="mx-auto mb-12 flex max-w-[calc(min(100vw,968px))] flex-col items-center px-4">
      <h1 className="p-4">Hint #{hint.id}</h1>
      <div className="grid w-full grid-cols-1 gap-4 text-sm text-zinc-700 sm:grid-cols-2">
        <div>
          <p className="w-full truncate text-ellipsis">
            <span className="font-semibold">Team: </span>
            <Link
              href={`/teams/${hint.team.id}`}
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {hint.team.displayName} ({hint.team.id})
            </Link>
          </p>
          <p>
            <span className="font-semibold">Puzzle: </span>
            <Link
              href={`/puzzle/${hint.puzzleId}`}
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {hint.puzzle.name}
            </Link>
          </p>
          <p>
            <span className="font-semibold">Claimer: </span>
            {hint.claimer?.displayName}
          </p>
        </div>
        <div>
          <p className="text-nowrap">
            <span className="font-semibold">Puzzle unlocked </span>
            <FormattedTime time={unlockTime} /> (
            <ElapsedTime date={unlockTime} /> ago)
          </p>
          <p>
            <span className="font-semibold">Hint requested </span>
            <FormattedTime time={hint.requestTime} /> (
            <ElapsedTime date={hint.requestTime} /> ago)
          </p>
          <p>
            <span className="font-semibold">Hint claimed </span>
            {hint.claimTime && (
              <>
                <FormattedTime time={hint.claimTime} /> (
                <ElapsedTime date={hint.claimTime} /> ago)
              </>
            )}
          </p>
          <p>
            <span className="font-semibold">Hint responded </span>
            {hint.responseTime && (
              <>
                <FormattedTime time={hint.responseTime} /> (
                <ElapsedTime date={hint.responseTime} /> ago)
              </>
            )}
          </p>
        </div>
      </div>

      <PreviousHintTable hint={hint} reply={reply ? hintId : undefined} />

      {previousGuesses.length > 0 && (
        <div className="w-full max-w-3xl space-y-2">
          <p className="w-full text-center text-sm font-semibold text-zinc-700">
            Previous Guesses
          </p>
          <PreviousGuessTable
            puzzleAnswer={hint.puzzle.answer}
            previousGuesses={previousGuesses}
            partialSolutions={{}} // TODO: Import from puzzle
            tasks={{}} // TODO: Import from puzzle
          />
        </div>
      )}
    </div>
  );
}
