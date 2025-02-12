import Link from "next/link";
import { canViewSolution } from "~/hunt.config";
import { auth } from "~/server/auth/auth";

export default async function DefaultHeader({
  puzzleName,
  puzzleId,
  hasSolution,
}: {
  puzzleName: string;
  puzzleId: string;
  hasSolution: boolean;
}) {
  const session = await auth();
  return (
    <div className="mb-4 min-w-36 flex-col items-center text-center">
      <h1>{puzzleName}</h1>
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
  );
}
