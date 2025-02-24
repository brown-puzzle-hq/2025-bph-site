"use client";
import {
  useState,
  useEffect,
  useTransition,
  startTransition,
  Fragment,
} from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { IN_PERSON, REMOTE } from "~/hunt.config";

import {
  editMessage,
  insertFollowUp,
  insertHintRequest,
  MessageType,
} from "./actions";

type TableProps = {
  teamSide?: boolean;
  previousHints: PreviousHints;
  hintRequestState?: HintRequestState;
  teamDisplayName?: string;
  reply?: number;
  puzzleId?: string;
  puzzleName?: string;
};

// Intitial state
type PreviousHints = {
  id: number;
  request: string;
  response: string | null;
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
}[];

// Requesting hint state
type HintRequestState = {
  puzzleId: string;
  hintsRemaining: number;
  unansweredHint: { puzzleId: string; puzzleName: string } | null;
  isSolved: boolean;
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

export default function PreviousHintTable({
  teamSide,
  previousHints,
  hintRequestState,
  teamDisplayName,
  reply,
  puzzleId,
  puzzleName,
}: TableProps) {
  const { data: session } = useSession();
  const [optimisticHints, setOptimisticHints] = useState(previousHints);
  const [request, setRequest] = useState<string>("");
  const [followUp, setFollowUp] = useState<FollowUp | null>(
    reply ? { hintId: reply, message: "" } : null,
  );
  const [edit, setEdit] = useState<EditedMessage | null>(null);
  const [hiddenFollowUps, setHiddenFollowUps] = useState<number[]>([]);
  const [isPendingSubmit, startTransitionSubmit] = useTransition();

  const handleSubmitRequest = async (puzzleId: string, message: string) => {
    // Optimistic update
    startTransitionSubmit(() => {
      setOptimisticHints((prev) => [
        ...prev,
        {
          id: 0,
          team: {
            displayName: session?.user?.displayName!,
            id: session?.user?.id!,
            members: "",
          },
          claimer: null,
          request,
          response: null,
          requestTime: new Date(),
          followUps: [],
        },
      ]);
    });

    setRequest("");
    const id = await insertHintRequest(puzzleId, message);
    if (!id) {
      // Revert optimistic update
      startTransition(() => {
        setOptimisticHints((prev) => prev.filter((hint) => hint.id !== 0));
      });
    } else {
      // Update followUpId
      startTransition(() => {
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === 0
              ? {
                  ...hint,
                  id,
                }
              : hint,
          ),
        );
      });
    }
  };

  const handleSubmitEdit = async (
    id: number,
    value: string,
    type: MessageType,
  ) => {
    switch (type) {
      case "request":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, request: value } : hint,
            ),
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "response":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) =>
              hint.id === id ? { ...hint, response: value } : hint,
            ),
          );
          setEdit(null);
        });
        await editMessage(id, value, type);
        break;
      case "follow-up":
        startTransition(() => {
          setOptimisticHints((prev) =>
            prev.map((hint) => ({
              ...hint,
              followUps: hint.followUps.map((followUp) =>
                followUp.id === id ? { ...followUp, message: value } : followUp,
              ),
            })),
          );
        });
        setEdit(null);
        await editMessage(id, value, type);
        break;
    }
  };

  const handleSubmitFollowUp = async (
    hintId: number,
    message: string,
    members: string,
  ) => {
    // Optimistic update
    startTransition(() => {
      setOptimisticHints((prev) =>
        prev.map((hint) =>
          hint.id === hintId
            ? {
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
              }
            : hint,
        ),
      );
    });
    setFollowUp(null);
    // TODO: is there a better option than passing a ton of arguments?
    // wondering if we should have centralized hint types, same goes for inserting/emailing normal hint responses
    // Also might be more efficient to only pass team members once instead of storing in each hint
    const followUpId = await insertFollowUp({
      hintId,
      members,
      teamId: session?.user?.id,
      teamDisplayName,
      puzzleId,
      puzzleName,
      message,
    });
    if (followUpId === null) {
      // Revert optimistic update
      startTransition(() => {
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  followUps: hint.followUps.filter(
                    (followUp) => followUp.id !== 0,
                  ),
                }
              : hint,
          ),
        );
      });
    } else {
      // Update followUpId
      startTransition(() => {
        setOptimisticHints((prev) =>
          prev.map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  followUps: hint.followUps.map((followUp) =>
                    followUp.id === 0
                      ? { ...followUp, id: followUpId }
                      : followUp,
                  ),
                }
              : hint,
          ),
        );
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

  const handleHideFollowUps = (hintId: number) => {
    if (hiddenFollowUps.includes(hintId)) {
      setHiddenFollowUps((prev) => prev.filter((id) => id !== hintId));
    } else {
      setHiddenFollowUps((prev) => prev.concat(hintId));
      if (followUp?.hintId === hintId) {
        setFollowUp(null);
      }
    }
  };

  const getFormDescription = (hintRequestState: HintRequestState) => {
    const { puzzleId, hintsRemaining, unansweredHint, isSolved } =
      hintRequestState;
    if (
      new Date() >
      (session?.user?.interactionMode === "in-person"
        ? IN_PERSON.END_TIME
        : REMOTE.END_TIME)
    ) {
      return <>Hunt has ended and live hinting has closed.</>;
    }

    if (isSolved) {
      return <>You have already solved this puzzle.</>;
    }

    if (unansweredHint) {
      if (puzzleId === unansweredHint.puzzleId) {
        return <>You have an outstanding hint on this puzzle.</>;
      } else {
        return (
          <>
            You have an outstanding hint on the puzzle{" "}
            <Link
              href={`/puzzle/${unansweredHint.puzzleId}`}
              className="text-link hover:text-link hover:underline"
            >
              {unansweredHint.puzzleName}
            </Link>
            .
          </>
        );
      }
    }

    if (optimisticHints.some((hint) => !hint.response)) {
      return <>You have an outstanding hint on this puzzle.</>;
    }

    if (hintsRemaining === 0) {
      return <>No hints remaining.</>;
    } else if (hintsRemaining === 1) {
      return <>1 hint remaining.</>;
    } else {
      return <>{hintsRemaining} hints remaining.</>;
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
        {hintRequestState && (
          <TableRow className="hover:bg-inherit">
            <TableCell className="w-4"></TableCell>
            <TableCell className="break-words rounded-lg pb-4 pr-5">
              <p className="font-bold">Request</p>
              <p className="pb-3 pt-2 text-secondary-text">
                Please provide as much detail as possible to help us understand
                where you're at and where you're stuck! Specific clues, steps,
                and hypotheses are all helpful. If you're working with any
                spreadsheets, diagrams, or external resources, you can include
                links.
              </p>
              <AutosizeTextarea
                maxHeight={500}
                className="resize-none bg-secondary-bg text-secondary-accent focus-visible:ring-offset-0"
                disabled={
                  hintRequestState.isSolved ||
                  !!hintRequestState.unansweredHint ||
                  hintRequestState.hintsRemaining < 1 ||
                  isPendingSubmit ||
                  optimisticHints.some((hint) => !hint.response) ||
                  new Date() >
                    (session?.user?.interactionMode === "in-person"
                      ? IN_PERSON.END_TIME
                      : REMOTE.END_TIME)
                }
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <div className="py-3 text-sm text-secondary-text">
                {getFormDescription(hintRequestState)}
              </div>
              <Button
                onClick={() =>
                  handleSubmitRequest(hintRequestState.puzzleId, request)
                }
                disabled={
                  hintRequestState.isSolved ||
                  !!hintRequestState.unansweredHint ||
                  hintRequestState.hintsRemaining < 1 ||
                  isPendingSubmit ||
                  optimisticHints.some((hint) => !hint.response) ||
                  new Date() >
                    (session?.user?.interactionMode === "in-person"
                      ? IN_PERSON.END_TIME
                      : REMOTE.END_TIME)
                }
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        )}

        {optimisticHints.map((hint) => (
          <Fragment key={`${hint.id}`}>
            {/* Hint request row */}
            <TableRow
              key={`${hint.id}-request`}
              className="border-0 hover:bg-inherit"
            >
              <TableCell className="w-4"></TableCell>
              <TableCell className="break-words pr-5">
                {/* Top section with the team ID and the edit button */}
                <div className="flex justify-between">
                  <p className="pb-0.5 pt-1 font-bold">
                    {teamSide ? "Team" : teamDisplayName}
                  </p>
                  {/* If the hint request was made by the current user, allow edits */}
                  {hint.team.id === session?.user?.id && (
                    <div>
                      {edit?.id === hint.id && edit.type === "request" ? (
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              handleSubmitEdit(edit.id, edit.value, "request")
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
                            setFollowUp(null);
                            setEdit({
                              id: hint.id,
                              value: hint.request,
                              type: "request",
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

                {/* Bottom section with the hint request */}
                {edit?.type === "request" && edit.id === hint.id ? (
                  <div className="pt-2">
                    <AutosizeTextarea
                      maxHeight={500}
                      className="resize-none bg-secondary-bg text-secondary-accent focus-visible:ring-offset-0"
                      value={edit.value}
                      onChange={(e) => {
                        if (!edit) return;
                        setEdit({ ...edit, value: e.target.value });
                      }}
                    />
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{hint.request}</div>
                )}
              </TableCell>
            </TableRow>

            {/* Hint response row */}
            {hint.response && (
              <TableRow
                key={`${hint.id}-response`}
                className="border-0 hover:bg-inherit"
              >
                {/* Chevron for hiding follow-up hints */}
                <TableCell className="relative">
                  {hint.followUps.length > 0 && (
                    <div className="absolute left-0 top-2">
                      {hiddenFollowUps.includes(hint.id) ? (
                        <button onClick={() => handleHideFollowUps(hint.id)}>
                          <ChevronRight className="h-5 w-5 text-link" />
                        </button>
                      ) : (
                        <button onClick={() => handleHideFollowUps(hint.id)}>
                          <ChevronDown className="h-5 w-5 text-link" />
                        </button>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="break-words pr-5">
                  {/* Top section for claimer ID, the follow-up button, and the edit button */}
                  <div className="flex items-center justify-between">
                    <p className="pb-1 font-bold">
                      {teamSide ? "Admin" : hint.claimer?.displayName}
                    </p>
                    <div className="flex space-x-2">
                      {/* Follow-up button, only show if collapsed */}
                      {(!hint.followUps.length ||
                        hiddenFollowUps.includes(hint.id)) && (
                        <div>
                          {followUp?.hintId !== hint.id ? (
                            <button
                              onClick={() => {
                                setEdit(null);
                                // Hide other follow-ups under the same hint
                                setHiddenFollowUps((prev) =>
                                  prev.filter((prevId) => prevId !== hint.id),
                                );
                                setFollowUp({ hintId: hint.id, message: "" });
                              }}
                              className="text-link hover:underline"
                            >
                              Reply
                            </button>
                          ) : (
                            <button
                              onClick={() => setFollowUp(null)}
                              className="text-link hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}
                      {/* If the response was made by the current user, allow edits */}
                      {hint.claimer?.id === session?.user?.id && (
                        <div>
                          {edit?.id === hint.id && edit.type === "response" ? (
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
                                setFollowUp(null);
                                setEdit({
                                  id: hint.id,
                                  value: hint.response ?? "",
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
                    {edit?.type === "response" && edit.id === hint.id ? (
                      <div className="pt-2">
                        <AutosizeTextarea
                          maxHeight={500}
                          className="resize-none bg-secondary-bg text-secondary-accent focus-visible:ring-offset-0"
                          value={edit.value}
                          onChange={(e) => {
                            if (!edit) return;
                            setEdit({ ...edit, value: e.target.value });
                          }}
                        />
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{hint.response}</div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Follow-ups row */}
            {!hiddenFollowUps.includes(hint.id) &&
              hint.followUps
                .filter(
                  (hiddenFollowUp) =>
                    !teamSide || hiddenFollowUp.message !== "[Claimed]",
                )
                .map((hiddenFollowUp, i, row) => (
                  <TableRow
                    key={`${hiddenFollowUp.id}`}
                    className="border-0 hover:bg-inherit"
                  >
                    <TableCell className="relative">
                      <div className="absolute inset-y-0 w-1 bg-blue-200"></div>
                    </TableCell>
                    <TableCell className="break-words pr-5">
                      {/* Top section with userId and edit button */}
                      <div className="flex items-center justify-between">
                        {hiddenFollowUp.user.id === hint.team.id ? (
                          <p className="pb-1 font-bold">
                            {teamSide ? "Team" : teamDisplayName}
                          </p>
                        ) : (
                          <p className="pb-1 font-bold">
                            {teamSide
                              ? "Admin"
                              : hiddenFollowUp.user.displayName}
                          </p>
                        )}
                        <div className="flex space-x-2">
                          {i + 1 === row.length &&
                            !teamSide &&
                            hiddenFollowUp.message !== "[Claimed]" &&
                            hiddenFollowUp.user.id === hint.team.id && (
                              <button
                                onClick={() =>
                                  // TODO: kinda jank to use empty team members as signal to not send email
                                  handleSubmitFollowUp(
                                    hint.id,
                                    "[Claimed]",
                                    "",
                                  )
                                }
                                className="text-link hover:underline"
                              >
                                Ignore
                              </button>
                            )}
                          {i + 1 === row.length &&
                            (followUp?.hintId !== hint.id ? (
                              <button
                                onClick={() => {
                                  setEdit(null);
                                  // Hide other follow-ups under the same hint
                                  setHiddenFollowUps((prev) =>
                                    prev.filter((prevId) => prevId !== hint.id),
                                  );
                                  setFollowUp({
                                    hintId: hint.id,
                                    message: "",
                                  });
                                }}
                                className="text-link hover:underline"
                              >
                                Reply
                              </button>
                            ) : (
                              <button
                                onClick={() => setFollowUp(null)}
                                className="text-link hover:underline"
                              >
                                Cancel
                              </button>
                            ))}
                          {/* If the previous hint follow-up was made by user, allow edits */}
                          {hiddenFollowUp.user.id === session?.user?.id &&
                            hiddenFollowUp.message !== "[Claimed]" && (
                              <div>
                                {edit?.type === "follow-up" &&
                                edit.id === hiddenFollowUp.id ? (
                                  <button
                                    onClick={() =>
                                      handleSubmitEdit(
                                        hint.id,
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
                                      setFollowUp(null);
                                      setEdit({
                                        id: hiddenFollowUp.id,
                                        value: hiddenFollowUp.message,
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
                        {edit?.type === "follow-up" &&
                        edit.id === hiddenFollowUp.id ? (
                          <div className="pt-2">
                            <AutosizeTextarea
                              maxHeight={500}
                              className="resize-none bg-secondary-bg text-secondary-accent focus-visible:ring-offset-0"
                              value={edit.value}
                              onChange={(e) => {
                                if (!edit) return;
                                setEdit({ ...edit, value: e.target.value });
                              }}
                            />
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {hiddenFollowUp.message}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

            {/* New follow-up request row */}
            {followUp !== null && followUp.hintId === hint.id && (
              <TableRow
                id={`${hint.id}-follow-up-request`}
                key={`${hint.id}-follow-up-request`}
                className="border-0 hover:bg-inherit"
              >
                <TableCell className="relative">
                  <div className="absolute inset-y-0 w-1 bg-blue-200"></div>
                </TableCell>
                <TableCell className="break-words pr-5">
                  <p className="font-bold">Follow-Up</p>
                  <p className="pb-3 pt-2 text-secondary-text">
                    Ask for clarification in this follow-up thread. Follow-ups
                    don't count toward your hint limit!
                  </p>

                  <AutosizeTextarea
                    maxHeight={500}
                    className="resize-none bg-secondary-bg text-secondary-accent focus-visible:ring-offset-0"
                    value={followUp.message}
                    onChange={(e) => {
                      if (followUp === null) return;
                      setFollowUp({
                        hintId: hint.id,
                        message: e.target.value,
                      });
                    }}
                  />
                  <div className="flex space-x-2 pt-3">
                    <Button
                      onClick={() =>
                        // TODO: kinda jank to use empty team members as signal to not send email
                        handleSubmitFollowUp(
                          hint.id,
                          followUp.message,
                          teamSide ? "" : hint.team.members,
                        )
                      }
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-secondary-accent"
                      onClick={() => setFollowUp(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
