"use client";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

// TODO: replace this
import Countdown from "../../(adventure)/m-guards-n-doors-and-k-choices/Countdown";

import Image from "next/image";
import DoorImage from "./door.png";
import GImage from "./g.png";
import SImage from "./s.png";
import TImage from "./t.png";
import IImage from "./i.png";
import MImage from "./m.png";
import EImage from "./e.png";
import RImage from "./r.png";
import NImage from "./n.png";
import HandImage from "./pointer.png";
import { TGTDDecision } from "~/server/db/schema";
import { DecisionMap, DecisionMapKey } from "./page";
import { insertTGTDDecision } from "./actions";

export default function PuzzleBody({
  decisionsMap,
}: {
  decisionsMap: DecisionMap;
}) {
  const { toast } = useToast();

  const [currDecisions, setCurrDecisions] = useState<DecisionMap>(decisionsMap);

  const handleDoorClick = async (
    door: DecisionMapKey,
    decision: TGTDDecision,
  ) => {
    if (currDecisions[door]) return;

    const result = await insertTGTDDecision(door, decision);

    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });

      if (result.decisionMap) setCurrDecisions(result.decisionMap);

      return;
    }

    const newDecisions = { ...currDecisions };
    if (!newDecisions[door])
      newDecisions[door] = { time: new Date(), decision };
    setCurrDecisions(newDecisions);
  };

  return (
    <div>
      {/* DOORS SET 1 */}
      <div className="mb-5 max-w-3xl">
        As you approach the beginning of Brown Puzzlehunt, you find in front of
        you two doors. One door leads to the beginning of the Puzzlehunt; the
        other does not.
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard always lies and the other always
        tells the truth.
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the guards, “If I asked the other guard which door is the
        correct door, then what door would they choose?”
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[1] && (
          <Countdown
            targetDate={
              new Date(currDecisions[1].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[1] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex min-w-[480px] items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(1, "left")}
            className={!currDecisions[1] ? "hover:opacity-80" : ""}
          />
          {currDecisions[1]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={GImage} width={80} height={80} alt="Letter G" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(1, "right")}
            className={!currDecisions[1] ? "hover:opacity-80" : ""}
          />
          {currDecisions[1]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={SImage} width={80} height={80} alt="Letter S" />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mb-8 border-t border-white" />

      {/* DOORS SET 2 */}

      <div className="mb-5 mt-8 max-w-3xl">
        As you continue on, you come across another two doors. One door will
        lead you to the beginning of the Puzzlehunt, while the other will not.
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard always tells the truth and one
        alternates whether it is telling the truth or lying for every question
        it is asked.
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the guards “If I asked the other guard which door is the correct
        door, then what door would they not choose?”{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[2] && (
          <Countdown
            targetDate={
              new Date(currDecisions[2].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[2] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(2, "left")}
            className={!currDecisions[2] ? "hover:opacity-80" : ""}
          />
          {currDecisions[2]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={TImage} width={80} height={80} alt="Letter T" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(2, "right")}
            className={!currDecisions[2] ? "hover:opacity-80" : ""}
          />
          {currDecisions[2]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={IImage} width={45} height={80} alt="Letter I" />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mb-8 border-t border-white" />

      {/* DOORS SET 3 */}

      <div className="mb-5 mt-8 max-w-3xl">
        As you continue on, you come across another two doors. One door will
        lead you to the beginning of the Puzzlehunt, while the other will not.{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard always picks the correct door and one
        is the alternating guard from the previous set of doors.
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the question “Which door is the correct door?”
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[3] && (
          <Countdown
            targetDate={
              new Date(currDecisions[3].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[3] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(3, "left")}
            className={!currDecisions[3] ? "hover:opacity-80" : ""}
          />
          {currDecisions[3]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={MImage} width={90} height={80} alt="Letter M" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(3, "right")}
            className={!currDecisions[3] ? "hover:opacity-80" : ""}
          />
          {currDecisions[3]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={EImage} width={70} height={80} alt="Letter E" />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mb-8 border-t border-white" />

      {/* DOORS SET 4 */}

      <div className="mb-5 mt-8 max-w-3xl">
        As you continue on, you come across another two doors. One door will
        lead you to the beginning of the Puzzlehunt, while the other will not.{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard either always lies or always tells
        the truth, and the other is the alternating guard from the previous two
        sets of doors.
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the question “If I asked the other guard to pick the door that
        you’d pick if I asked you to pick the correct door, what door would they
        pick?”{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[4] && (
          <Countdown
            targetDate={
              new Date(currDecisions[4].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[4] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(4, "left")}
            className={!currDecisions[4] ? "hover:opacity-80" : ""}
          />
          {currDecisions[4]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={RImage} width={80} height={80} alt="Letter R" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(4, "right")}
            className={!currDecisions[4] ? "hover:opacity-80" : ""}
          />
          {currDecisions[4]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={EImage} width={80} height={80} alt="Letter E" />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mb-8 border-t border-white" />

      {/* DOORS SET 5 */}

      <div className="mb-5 mt-8 max-w-3xl">
        As you continue on, you come across another two doors. One door will
        lead you to the beginning of the Puzzlehunt, while the other will not.{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard always either tells the truth or lies
        and the other guard always either tells what they think is the truth or
        what they think is a lie (but unbeknownst to the other guard, they
        always think the other guard tells the truth, regardless of whether or
        not that is true).
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the question “If I asked the other guard to pick the door that
        you’d pick if I asked you to pick the correct door, what door would they
        pick?”{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[5] && (
          <Countdown
            targetDate={
              new Date(currDecisions[5].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[5] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(5, "left")}
            className={!currDecisions[5] ? "hover:opacity-80" : ""}
          />
          {currDecisions[5]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={RImage} width={80} height={80} alt="Letter R" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[70%] left-[170%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[70%] left-[170%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[310deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(5, "right")}
            className={!currDecisions[5] ? "hover:opacity-80" : ""}
          />
          {currDecisions[5]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={NImage} width={80} height={80} alt="Letter N" />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6 mb-8 border-t border-white" />

      {/* DOORS SET 6 */}

      <div className="mb-5 mt-8 max-w-3xl">
        As you continue on, you come across another two doors. One door will
        lead you to the beginning of the Puzzlehunt, while the other will not.{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        In front of the doors are two guards. You are only allowed to ask one
        question to both guards. One guard is super excited about Brown
        Puzzlehunt and will always point to the correct door, regardless of the
        question. The other guard always tells the truth.
      </div>

      <div className="mb-5 max-w-3xl">
        You ask the question “Which door will lead me to the most exciting and
        thrilling weekend of my entire life?”{" "}
      </div>

      <div className="mb-5 max-w-3xl">
        The guards each point to a door. Knowing which door is correct, you go
        through it.
      </div>

      {/* Timer */}
      <div className="mb-5">
        {currDecisions[6] && (
          <Countdown
            targetDate={
              new Date(currDecisions[6].time.getTime() + 10 * 60 * 1000)
            }
            callBack={() => {
              setCurrDecisions((prev) => {
                const newMap = { ...prev };
                newMap[6] = null;
                return newMap;
              });
            }}
          />
        )}
      </div>

      <div className="relative flex items-center justify-center gap-20">
        <div className="relative">
          {/* Left door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(6, "left")}
            className={!currDecisions[6] ? "hover:opacity-80" : ""}
          />
          {currDecisions[6]?.decision === "left" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={SImage} width={80} height={80} alt="Letter S" />
            </div>
          )}

          {/* Hands */}
          <div className="absolute -right-[50%] left-[150%] top-[60%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={350}
              height={350}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
          <div className="absolute -right-[50%] left-[150%] top-[85%] z-10 -ml-20 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={HandImage}
              width={150}
              height={150}
              alt="Pointing Hand"
              className="rotate-[230deg] scale-[1.75]"
            />
          </div>
        </div>

        <div className="relative">
          {/* Right door */}
          <Image
            src={DoorImage}
            width={200}
            height={400}
            alt="Door"
            onClick={() => handleDoorClick(6, "right")}
            className={!currDecisions[6] ? "hover:opacity-80" : ""}
          />
          {currDecisions[6]?.decision === "right" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={EImage} width={80} height={80} alt="Letter E" />
            </div>
          )}
        </div>
      </div>
      <div className="h-2"></div>
    </div>
  );
}
