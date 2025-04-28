import DefaultHintPage from "~/app/(hunt)/puzzle/components/hint/DefaultHintPage";
import { puzzleId } from "../data";

export default async function Page() {
  return <DefaultHintPage puzzleId={puzzleId} />;
}
