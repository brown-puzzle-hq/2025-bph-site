// This layout is for displaying sequences.
import { auth } from "~/server/auth/auth";
import { canViewPuzzle } from "~/hunt.config";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const sequence = ["seq1", "seq2", "seq3"];
  const unlockedPuzzles = await Promise.all(
    sequence.filter(async (puzzleId) => {
      const status = await canViewPuzzle(puzzleId, session);
      return status === "SUCCESS";
    }),
  );

  return (
    <section className="flex w-auto flex-col">
      <div className="space-x-1 text-center">
        {unlockedPuzzles.map((puzzleId) => (
          <span>
            [<Link href={`/puzzle/${puzzleId}`}>{puzzleId}</Link>]
          </span>
        ))}
      </div>
      {children}
    </section>
  );
}
