"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export default function CopyButton({ copyText }: { copyText: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        toast({
          title: "Puzzle copied to clipboard!",
          description: (
            <span className="block w-[29em] truncate">{copyText}</span>
          ),
        });
      }}
    >
      <Clipboard className="hover:opacity-75" />
    </button>
  );
}
