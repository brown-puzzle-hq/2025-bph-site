"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export default function CopyButton({ copyText }: { copyText: string }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(copyText);
  const plainText = copyText.replace(/<[^>]+>/g, "");

  return (
    <button
      onClick={() => {
        if (isHtml) {
          const blob = new Blob([copyText], { type: "text/html" });
          const clipboardItem = new ClipboardItem({ "text/html": blob });
          navigator.clipboard.write([clipboardItem]);
        } else {
          navigator.clipboard.writeText(copyText);
        }
        toast({
          title: "Copied to clipboard!",
          description: (
            <span className="block max-w-[calc(100vw-64px)] truncate md:max-w-[356px]">
              {plainText}
            </span>
          ),
        });
      }}
    >
      <Clipboard className="size-5 text-yellow-800" />
    </button>
  );
}
