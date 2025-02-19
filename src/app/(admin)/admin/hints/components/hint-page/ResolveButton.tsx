"use client";

import { useSession } from "next-auth/react";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { HintWithRelations } from "../hint-table/Columns";
import { resolveHint } from "../../actions";

export function ResolveButton({ hint }: { hint: HintWithRelations }) {
  const { data: session } = useSession();
  const currHinter = session?.user?.id;

  const handleResolve = async () => {
    const { error, title } = await resolveHint(hint.id);

    if (error) {
      toast({
        variant: "destructive",
        title: title,
        description: error,
      });
    }

    return { error };
  };

  if (hint.claimer?.id == currHinter)
    return (
      <div className="full grid gap-1.5">
        <Button
          className="mt-4 w-fit"
          onClick={handleResolve}
          disabled={hint.status !== "answered"}
        >
          Mark as Resolved
        </Button>
      </div>
    );
}
