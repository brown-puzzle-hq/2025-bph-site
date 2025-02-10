import "@pixi/events";
import Map from "./Map";
import { auth } from "~/server/auth/auth";
import { db } from "~/server/db";
import { unlocks } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import {
  PuzzleSection,
  PuzzleBlock,
  numberToPuzzleBlock,
  numberToPuzzleSections,
  numberToPuzzleIcon,
} from "./types";
import {
  numbersToPuzzles,
  puzzlesToNumbers,
  INITIAL_PUZZLES,
} from "~/hunt.config";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Login to see the map.</div>;
  }

  // Get unlocked blocks
  var puzzleBlocks: PuzzleBlock[] = [];
  var puzzleSections: PuzzleSection[] = [];
  var puzzleIcons: PuzzleBlock[] = [];

  // Includes puzzles in unlock table and initial puzzles
  const unlockedPuzzles = [
    ...INITIAL_PUZZLES,
    ...(
      await db.query.unlocks.findMany({
        columns: { puzzleId: true },
        where: eq(unlocks.teamId, session.user.id),
      })
    )?.map((unlock) => unlock.puzzleId),
  ];

  for (const puzzleId of unlockedPuzzles) {
    const puzzleNumber = puzzlesToNumbers[puzzleId]!;

    const puzzleBlock = numberToPuzzleBlock[puzzleNumber]!;
    puzzleBlocks.push({ ...puzzleBlock, puzzleId: puzzleId });

    const puzzleIcon = numberToPuzzleIcon[puzzleNumber]!;
    puzzleIcons.push({ ...puzzleIcon, puzzleId: puzzleId });

    const puzzleSection = numberToPuzzleSections[puzzleNumber];
    if (puzzleSection) {
      puzzleSections = puzzleSections.concat(puzzleSection);
    }
  }

  // const unlockedPuzzles = [1, 2, 4, 6];
  // const unlockedPuzzles = [0, 1, 2, 3];

  // const unlockedPuzzles = [
  //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  //   21, 22, 23,
  // ];

  // for (const number of unlockedPuzzles) {
  //   puzzleSections = puzzleSections.concat(numberToPuzzleSections[number]!);

  //   puzzleBlocks.push({
  //     ...numberToPuzzleBlock[number]!,
  //     puzzleId: numbersToPuzzles[number]!,
  //   });

  //   puzzleIcons.push({
  //     ...numberToPuzzleIcon[number]!,
  //     puzzleId: numbersToPuzzles[number]!,
  //   });
  // }

  const uniquePuzzleSections = Array.from(new Set(puzzleSections));
  const uniquePuzzleBlocks = Array.from(new Set(puzzleBlocks));
  const uniquePuzzleIcons = Array.from(new Set(puzzleIcons));

  return (
    <div className="mx-auto mb-10">
      {/* <h1 className="text-center mb-6">Map!</h1> */}
      <Map
        puzzleIcons={uniquePuzzleIcons}
        puzzleSections={uniquePuzzleSections}
        puzzleBlocks={uniquePuzzleBlocks}
      />
    </div>
  );
}
