import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

export const metadata = {
  title: "A Fistful of Cards II - Brown Puzzlehunt"
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={data.remoteBoxBody}
      remoteBody={data.remoteBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}
