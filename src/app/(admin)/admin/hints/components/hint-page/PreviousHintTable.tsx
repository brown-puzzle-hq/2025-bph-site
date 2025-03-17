"use client";
import { useState, useEffect, useTransition, startTransition } from "react";
import { useSession } from "next-auth/react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { EyeOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { editMessage, insertFollowUp, MessageType } from "./actions";
import { insertHintResponse } from "../../actions";

type TableProps = {
  hint: Hint;
  reply?: number;
};

// Intitial state
type Hint = {
  id: number;
  request: string;
  response: string | null;
  status: "no_response" | "answered" | "refunded";
  puzzle: {
    id: string;
    name: string;
  };
  team: {
    id: string;
    displayName: string;
    members: string;
  };
  claimer: {
    id: string;
    displayName: string;
  } | null;
  requestTime: Date;
  followUps: {
    id: number;
    message: string;
    user: { id: string; displayName: string };
    time: Date;
  }[];
};

// Edited messages
type EditedMessage = {
  id: number;
  value: string;
  type: MessageType;
};

// New follow-up messages
type FollowUp = {
  hintId: number;
  message: string;
};

export default function PreviousHintTable({ hint, reply }: TableProps) {
  const { data: session } = useSession();
  const [optimisticHint, setOptimisticHint] = useState(hint);
  const [response, setResponse] = useState<string>("");
  const [newFollowUp, setNewFollowUp] = useState<FollowUp | null>(
    reply ? { hintId: reply, message: "" } : null,
  );
  const [edit, setEdit] = useState<EditedMessage | null>(null);
  const [isPendingSubmit, startTransitionSubmit] = useTransition();

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    switch (type) {
      case "request":
        startTransition(async () => {
          setOptimisticHint((hint) =>
            hint.id === id ? { ...hint, request: value } : hint,
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "response":
        startTransition(() => {
          setOptimisticHint((hint) =>
            hint.id === id ? { ...hint, response: value } : hint,
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "follow-up":
        startTransition(async () => {
          setOptimisticHint((hint) => {
            hint.followUps = hint.followUps.map((followUp) =>
              followUp.id === id ? { ...followUp, message: value } : followUp,
            );
            return hint;
          });
          setEdit(null);
          await editMessage(id, value, type);
        });
    }
  };

  const handleSubmitFollowUp = async (
    hintId: number,
    message: string,
    members: string,
  ) => {
    // Optimistic update
    startTransition(() => {
      setOptimisticHint((hint) => ({
        ...hint,
        followUps: hint.followUps.concat({
          id: 0,
          message,
          user: {
            displayName: session!.user!.displayName,
            id: session!.user!.id!,
          },
          time: new Date(),
        }),
      }));
    });

    if (message !== "[Claimed]") setNewFollowUp(null);
    // TODO: is there a better option than passing a ton of arguments?
    // wondering if we should have centralized hint types, same goes for inserting/emailing normal hint responses
    // Also might be more efficient to only pass team members once instead of storing in each hint
    const followUpId = await insertFollowUp({
      hintId,
      members,
      teamId: session?.user?.id,
      teamDisplayName: hint.team.displayName,
      puzzleId: hint.puzzle.id,
      puzzleName: hint.puzzle.name,
      message,
    });

    if (followUpId === null) {
      // Revert optimistic update
      startTransition(() => {
        setOptimisticHint((hint) => ({
          ...hint,
          followUps: hint.followUps.filter((followUp) => followUp.id !== 0),
        }));
      });
    } else {
      // Update followUpId
      startTransition(() => {
        setOptimisticHint((hint) => ({
          ...hint,
          followUps: hint.followUps.map((followUp) =>
            followUp.id === 0 ? { ...followUp, id: followUpId } : followUp,
          ),
        }));
      });
      // TODO: Not working for some reason
      // toast({
      //   title: "Failed to submit follow-up.",
      //   description:
      //     "Please try again. If the problem persists, please submit the feedback form.",
      //   variant: "destructive",
      // });
    }
  };

  const handleSubmitResponse = async (message: string) => {
    // Optimistic update
    startTransitionSubmit(() => {
      setOptimisticHint((hint) => ({ ...hint, response: response }));
    });

    setResponse("");
    const res = await insertHintResponse(
      hint.id,
      hint.team.displayName,
      hint.puzzle.name,
      message,
      hint.team.members,
    );

    if (res.error !== null) {
      // Revert optimistic update
      startTransition(() => {
        setOptimisticHint((hint) => ({ ...hint, response: null }));
      });
    } else {
      // Update followUpId
      startTransition(() => {
        setOptimisticHint((hint) => ({ ...hint, id: res.id }));
      });
    }
  };

  useEffect(() => {
    if (reply) {
      document.getElementById(`${reply}-follow-up-request`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <Table className="table-fixed">
      <TableBody>
        {/* Hint request row */}
        <TableRow className="border-0 hover:bg-inherit">
          <TableCell className="break-words pr-5">
            <p className="pb-0.5 pt-1 font-bold">
              {optimisticHint.team.displayName}
            </p>
            <div>{optimisticHint.request}</div>
          </TableCell>
        </TableRow>

        {/* Hint response row */}
        {optimisticHint?.claimer?.id &&
          session?.user?.id === optimisticHint?.claimer?.id && (
            <TableRow className="border-0 hover:bg-inherit">
              <TableCell className="break-words pr-5">
                {/* Top section for claimer ID, the follow-up button, and the edit button */}
                <div className="flex items-center justify-between">
                  <p className="pb-1 font-bold">
                    {optimisticHint.claimer.displayName}
                  </p>
                  <div className="flex space-x-2">
                    {/* Follow-up button, only show if there are no follow ups */}
                    <div>
                      {optimisticHint.followUps.length === 0 && (
                        <button
                          onClick={() => {
                            setEdit(null);
                            setNewFollowUp({
                              hintId: optimisticHint.id,
                              message: "",
                            });
                          }}
                          className="text-link hover:underline"
                        >
                          Reply
                        </button>
                      )}
                    </div>

                    {/* If the response was made by the current user, allow edits */}
                    {optimisticHint.claimer?.id === session?.user?.id && (
                      <div>
                        {edit?.id === optimisticHint.id &&
                        edit.type === "response" ? (
                          <div className="space-x-2">
                            <button
                              onClick={() =>
                                handleSubmitEdit(
                                  edit.id,
                                  edit.value,
                                  "response",
                                )
                              }
                              className="text-link hover:underline"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEdit(null)}
                              className="text-link hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setNewFollowUp(null);
                              setEdit({
                                id: optimisticHint.id,
                                value: optimisticHint.response ?? "",
                                type: "response",
                              });
                            }}
                            className="text-link hover:underline"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botton section with hint response */}
                <div>
                  {!optimisticHint.response ? (
                    <>
                      <div className="pb-4">
                        <AutosizeTextarea
                          maxHeight={500}
                          className="resize-none focus-visible:ring-offset-0"
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                        />
                      </div>
                      <Button onClick={() => handleSubmitResponse(response)}>
                        Submit
                      </Button>
                    </>
                  ) : edit?.type === "response" &&
                    edit.id === optimisticHint.id ? (
                    <div className="pt-2">
                      <AutosizeTextarea
                        maxHeight={500}
                        className="resize-none focus-visible:ring-offset-0"
                        value={edit.value}
                        onChange={(e) => {
                          if (!edit) return;
                          setEdit({ ...edit, value: e.target.value });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {optimisticHint.response}
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}

        {/* Follow-ups row */}
        {optimisticHint.followUps.map((followUp, i, row) => (
          <TableRow
            key={`${followUp.id}`}
            className="border-0 hover:bg-inherit"
          >
            <TableCell className="break-words pr-5">
              {/* Top section */}
              <div className="flex items-center justify-between">
                {/* Team name and whether this is a hidden follow-up*/}
                {followUp.user.id === optimisticHint.team.id ? (
                  <p className="pb-1 font-bold">
                    {optimisticHint.team.displayName}
                  </p>
                ) : (
                  <p className="flex items-center pb-1 font-bold">
                    {followUp.user.displayName}
                    {followUp.message === "[Claimed]" && (
                      <div className="group relative ml-1.5 font-medium">
                        <EyeOff className="h-4 cursor-help" />
                        <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100">
                          <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent border-b-black" />
                          Visible to admins only
                        </span>
                      </div>
                    )}
                  </p>
                )}

                {/* Claim, reply, and edit buttons */}
                <div className="flex space-x-2">
                  {i + 1 === row.length &&
                    followUp.user.id === optimisticHint.team.id && (
                      <button
                        onClick={() =>
                          handleSubmitFollowUp(
                            optimisticHint.id,
                            "[Claimed]",
                            "",
                          )
                        }
                        className="text-link hover:underline"
                      >
                        Claim
                      </button>
                    )}

                  {i + 1 === row.length &&
                    (newFollowUp?.hintId !== optimisticHint.id ? (
                      <button
                        onClick={() => {
                          setEdit(null);
                          setNewFollowUp({
                            hintId: optimisticHint.id,
                            message: "",
                          });
                        }}
                        className="text-link hover:underline"
                      >
                        Reply
                      </button>
                    ) : (
                      <button
                        onClick={() => setNewFollowUp(null)}
                        className="text-link hover:underline"
                      >
                        Cancel
                      </button>
                    ))}

                  {/* If the previous hint follow-up was made by user, allow edits */}
                  {followUp.user.id === session?.user?.id &&
                    followUp.message !== "[Claimed]" && (
                      <div>
                        {edit?.type === "follow-up" &&
                        edit.id === followUp.id ? (
                          <button
                            onClick={() =>
                              handleSubmitEdit(
                                followUp.id,
                                edit.value,
                                "follow-up",
                              )
                            }
                            className="text-link hover:underline"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setNewFollowUp(null);
                              setEdit({
                                id: followUp.id,
                                value: followUp.message,
                                type: "follow-up",
                              });
                            }}
                            className="text-link hover:underline"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    )}
                </div>
              </div>
              {/* Botton section with follow-up message */}
              <div>
                {edit?.type === "follow-up" && edit.id === followUp.id ? (
                  <div className="pt-2">
                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none focus-visible:ring-offset-0"
                      value={edit.value}
                      onChange={(e) => {
                        if (!edit) return;
                        setEdit({ ...edit, value: e.target.value });
                      }}
                    />
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{followUp.message}</div>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}

        {/* New follow-up request row */}
        {newFollowUp !== null && newFollowUp.hintId === optimisticHint.id && (
          <TableRow className="border-0 hover:bg-inherit">
            <TableCell className="break-words pr-5">
              <p className="pb-2 font-bold">Follow-Up</p>
              <AutosizeTextarea
                maxHeight={500}
                className="resize-none focus-visible:ring-offset-0"
                value={newFollowUp.message}
                onChange={(e) => {
                  if (newFollowUp === null) return;
                  setNewFollowUp({
                    hintId: optimisticHint.id,
                    message: e.target.value,
                  });
                }}
              />
              <div className="flex space-x-2 pt-3">
                <Button
                  onClick={() =>
                    handleSubmitFollowUp(
                      optimisticHint.id,
                      newFollowUp.message,
                      optimisticHint.team.members,
                    )
                  }
                >
                  Submit
                </Button>
                <Button variant="outline" onClick={() => setNewFollowUp(null)}>
                  Cancel
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
