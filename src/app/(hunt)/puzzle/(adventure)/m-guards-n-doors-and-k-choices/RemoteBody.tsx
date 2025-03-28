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

export const coolDownTime = 30 * 60 * 1000; // 30 minutes

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
  const lastRow = getLastRow(run);
  const currState = getStateFromRow(lastRow);
  const [state, setState] = useState<State>(currState);
  const [nextAttempt, setNextAttempt] = useState<Date | null>(null);

  useEffect(() => {
    if (lastRow?.scenario === 4 && lastRow?.decisionType === "final") {
      const cooldown = new Date(lastRow.time.getTime() + coolDownTime);
      setNextAttempt(cooldown);
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
      if (result?.lastRun) setState(getStateFromRow(lastRow));
    }

    // Otherwise, update the state with the last row
    if (result?.row)
      setState((prevState) => ({ ...prevState, step: decision }));

    // And check whether there is a cooldown
    if (result?.row?.decisionType === "final" && result?.row?.scenario === 4) {
      setNextAttempt(new Date(result.row.time.getTime() + coolDownTime));
    }
  };

  const handleNextScenarioClick = () => {
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

  return (
    <div>
      <p>Run: {state.run}</p>
      <p>Scenario: {state.scenario}</p>
      <p>Step: {state.step}</p>

      <div className="p-4 text-lg">{`scenario ${state.scenario} ${state.step} video`}</div>

      {state.step == "initial" && (
        <div className="flex space-x-10">
          <button onClick={() => handleDecisionClick("door_1", "door")}>
            Door 1
          </button>
          <button onClick={() => handleDecisionClick("door_2", "door")}>
            Door 2
          </button>
          <button onClick={() => handleDecisionClick("door_3", "door")}>
            Door 3
          </button>
        </div>
      )}

      {["door_1", "door_2", "door_3"].includes(state.step) && (
        <div className="flex space-x-10">
          <button onClick={() => handleDecisionClick("switch", "final")}>
            Switch
          </button>
          <button onClick={() => handleDecisionClick("stay", "final")}>
            Stay
          </button>
        </div>
      )}

      {["stay", "switch"].includes(state.step) && (
        <div>
          {state.scenario < 4 ? (
            <button onClick={handleNextScenarioClick}>Next scenario</button>
          ) : (
            <button
              onClick={handleNextScenarioClick}
              disabled={nextAttempt ? new Date() < nextAttempt : false}
            >
              {nextAttempt && new Date() < nextAttempt ? (
                <p>
                  Try again in <ElapsedTime date={nextAttempt} />
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
