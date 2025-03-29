"use client";
import { InferSelectModel } from "drizzle-orm";
import { mnk, MNKDecision, MNKDecisionType } from "~/server/db/schema";
import { useState, useEffect } from "react";
import { insertMNKDecision } from "./actions";
import { useToast } from "~/hooks/use-toast";
import { ElapsedTime } from "~/lib/time";

type Row = InferSelectModel<typeof mnk>;
type Step = "initial" | "door_1" | "door_2" | "door_3" | "switch" | "stay";
type State = {
  run: number;
  scenario: number;
  step: Step;
};

const coolDownTime = 30 * 60 * 1000; // 30 minutes

const stateToString = (scenario: number, step: Step) => {
  if (step === "initial") return `Scenario ${scenario}`;
  if (["door_1", "door_2", "door_3"].includes(step)) {
    return `Door ${step.split("_")[1]}`;
  }
  if (["switch", "stay"].includes(step)) {
    return `${step.charAt(0).toUpperCase() + step.slice(1)}`;
  }
};

const videos: Record<number, Partial<Record<Step, string>>> = {
  1: {
    initial: "K9U6X0WJunQ",
    door_1: "E94aGrxoyuk",
    door_2: "gAorxB3oJU4",
    door_3: "eBtARI1LfPI",
    switch: "WshgkZDiavo",
    stay: "w0qqX6vp4AE",
  },
  2: {
    initial: "U9ZURnPDRFs",
    door_1: "zGcKUldar5c",
    door_2: "1xwWnd1oiKo",
    door_3: "K7_pRbiM9Kg",
    switch: "3C5J7UNoD3g",
    stay: "3gC6vh-WjHs",
  },
  3: {
    initial: "voL9aS-gNEc",
    door_1: "o6FmcOb9Vaw",
    door_2: "Uqk-uERUiBs",
    door_3: "DVqhJrtwBw4",
    switch: "Sfw6BRGhCI0",
    stay: "WwPlpm7grE8",
  },
  4: {
    initial: "P3_MFiB9aHY",
    door_1: "Iq-oIEBbWzg",
    door_2: "Okf-8Aw7kkY",
    door_3: "TQzzUHRKuqU",
    switch: "M2SVM4gwRgc",
    stay: "7ovWo95JNRc",
  },
};

// Get the last row of a run
const getLastRow = (run: Row[]): Row | null => {
  return run.length
    ? run.reduce((acc, curr) => {
        if (curr.scenario > acc.scenario) return curr;
        if (curr.scenario < acc.scenario) return acc;
        if (curr.decisionType === "final") return curr;
        return acc;
      })
    : null;
};

// Get the previous state from a row
const getStateFromRow = (row: Row | null): State => {
  // Initial state
  if (!row)
    return {
      run: 1,
      scenario: 1,
      step: "initial",
    };

  return {
    run: row.run,
    scenario: row.scenario,
    step: row.decision,
  };
};

export default function RemoteBody({ run }: { run: Row[] }) {
  const { toast } = useToast();

  // Keep track of the current run
  const [currRun, setRun] = useState<Row[]>(run);

  // Initialize the current state of the puzzle
  const lastRow = getLastRow(run);
  const currState = getStateFromRow(lastRow);
  const [state, setState] = useState<State>(currState);

  // Figure out when the cooldown ends
  const [cooldown, setCooldown] = useState<Date | null>(null);
  useEffect(() => {
    if (lastRow?.scenario === 4 && lastRow?.decisionType === "final") {
      const cooldown = new Date(lastRow.time.getTime() + coolDownTime);
      setCooldown(cooldown);
    }
  }, [lastRow]);

  const handleDecisionClick = async (
    decision: MNKDecision,
    decisionType: MNKDecisionType,
  ) => {
    const result = await insertMNKDecision(
      state.run,
      state.scenario,
      decision,
      decisionType,
    );

    // If error, toast and
    // Try to update the state with the last run
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });

      if (result?.lastRun) {
        setRun(result.lastRun);
        setState(getStateFromRow(getLastRow(result.lastRun)));
      }
    }

    // Otherwise, update the run and the state with the last row
    // And check whether there is a cooldown
    if (result?.row != null) {
      const row = result.row;
      setRun((prevState) => [...prevState, row]);
      setState((prevState) => ({ ...prevState, step: decision }));
      if (row.decisionType === "final" && row.scenario === 4)
        setCooldown(new Date(result.row.time.getTime() + coolDownTime));
    }
  };

  const handleNextScenarioClick = () => {
    // Only update the run if the current scenario is 4 and the step is "stay" or "switch"
    setRun((prevState) => {
      if (
        state.scenario === 4 &&
        (state.step === "stay" || state.step === "switch")
      )
        return [];
      return prevState;
    });

    setState((prevState) => {
      const isNewScenario =
        prevState.step === "stay" || prevState.step === "switch";
      const isNewRun = prevState.scenario + +isNewScenario > 4;

      // Check if the run is new
      if (isNewRun) {
        return {
          run: prevState.run + 1,
          scenario: 1,
          step: "initial",
        };
      }

      // Check if the scenario is new
      if (isNewScenario) {
        return {
          run: prevState.run,
          scenario: prevState.scenario + 1,
          step: "initial",
        };
      }

      return prevState;
    });
  };

  const handlePreviousScenarioClick = (scenario: number, step: Step) => {
    setState((prevState) => ({
      ...prevState,
      scenario,
      step,
    }));
  };

  return (
    <div>
      {/* List of states of the puzzles */}
      <div className="flex flex-col">
        {currRun.map((row) => (
          <>
            {row.decisionType === "door" && (
              <button
                onClick={() =>
                  handlePreviousScenarioClick(row.scenario, "initial")
                }
                className={`hover:bg-gray-400 ${state.scenario === row.scenario && state.step == "initial" && "bg-gray-400"}`}
              >
                <div>{stateToString(row.scenario, "initial")}</div>
              </button>
            )}
            <button
              onClick={() =>
                handlePreviousScenarioClick(row.scenario, row.decision)
              }
              className={`hover:bg-gray-400 ${state.scenario === row.scenario && state.step == row.decision && "bg-gray-400"}`}
            >
              <div>{stateToString(row.scenario, row.decision)}</div>
            </button>
          </>
        ))}
        {(() => {
          const lastRow = getLastRow(currRun);
          if (lastRow?.decisionType === "final" && lastRow.scenario < 4) {
            return (
              <button
                onClick={() =>
                  handlePreviousScenarioClick(lastRow.scenario + 1, "initial")
                }
                className={`hover:bg-gray-400 ${state.scenario === lastRow.scenario + 1 && state.step == "initial" && "bg-gray-400"}`}
              >
                <div>{stateToString(lastRow.scenario + 1, "initial")}</div>
              </button>
            );
          }
        })()}
      </div>

      {/* Video */}
      <div className="py-4">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videos[state.scenario]![state.step]}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Door 1, Door 2, and Door 3 buttons */}
      {(() => {
        if (state.step !== "initial") return null;

        const prevDecision = currRun.find(
          (row) =>
            row.scenario === state.scenario && row.decisionType === "door",
        );

        return (
          <div className="flex space-x-10">
            {["door_1", "door_2", "door_3"].map((decision) => (
              <button
                key={decision}
                disabled={!!prevDecision && prevDecision.decision != decision}
                onClick={() =>
                  prevDecision
                    ? handlePreviousScenarioClick(
                        state.scenario,
                        decision as Step,
                      )
                    : handleDecisionClick(decision as MNKDecision, "door")
                }
                className={`rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 ${prevDecision?.decision === decision ? "disabled:bg-blue-500" : "disabled:bg-gray-500"} disabled:cursor-not-allowed`}
              >
                {decision
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        );
      })()}

      {/* Switch and Stay buttons */}
      {(() => {
        if (!["door_1", "door_2", "door_3"].includes(state.step)) return null;

        const prevDecision = currRun.find(
          (row) =>
            row.scenario === state.scenario && row.decisionType === "final",
        );

        return (
          <div className="flex space-x-10">
            {["switch", "stay"].map((decision) => (
              <button
                key={decision}
                disabled={!!prevDecision && prevDecision.decision != decision}
                onClick={() =>
                  prevDecision
                    ? handlePreviousScenarioClick(
                        state.scenario,
                        decision as Step,
                      )
                    : handleDecisionClick(decision as MNKDecision, "final")
                }
                className={`rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 ${prevDecision?.decision === decision ? "disabled:bg-blue-500" : "disabled:bg-gray-500"}`}
              >
                {decision
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        );
      })()}

      {/* Next Scenario and Try Again buttons */}
      {["stay", "switch"].includes(state.step) && (
        <div>
          {state.scenario < 4 ? (
            <button
              onClick={handleNextScenarioClick}
              className={`rounded-md bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-700`}
            >
              Next scenario
            </button>
          ) : (
            <button
              onClick={handleNextScenarioClick}
              disabled={cooldown ? new Date() < cooldown : false}
              className={`rounded-md bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-700 disabled:bg-gray-500`}
            >
              {cooldown && new Date() < cooldown ? (
                <p>
                  Try again in <ElapsedTime date={cooldown} />
                </p>
              ) : (
                <p>Try again</p>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
