import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import { puzzleId, PuzzleBody, copyText, partialSolutions } from "./data";

export default async function Page() {
  return (
    <DefaultPuzzlePage
      puzzleId={puzzleId}
      puzzleBody={PuzzleBody()}
      copyText={copyText}
      partialSolutions={partialSolutions}
    />
  );
}
