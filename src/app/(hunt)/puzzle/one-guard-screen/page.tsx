import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";
import { headers } from "next/headers";

export default async function Page() {
  const userAgent = headers().get("user-agent") || "";
  const isMobile = /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
  const mobileMessage = (
    <div className="max-w-3xl">
      Note: this puzzle must be done on a computer
    </div>
  );

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={isMobile ? mobileMessage : data.inPersonBody}
      remoteBoxBody={isMobile ? mobileMessage : data.remoteBoxBody}
      remoteBody={isMobile ? mobileMessage : data.remoteBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
    />
  );
}
