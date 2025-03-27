"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, Table } from "lucide-react";
import PuzzleTable from "../puzzle/components/PuzzleTable";
import EventTable from "../puzzle/components/EventTable";
import Map from "./Map";
import { useState, useMemo, useEffect } from "react";

import { getCookie, setCookie } from "typescript-cookie";
import { cn } from "~/lib/utils";

type PuzzleListPageProps = {
  availablePuzzles: any;
  solvedPuzzles: any;
  availableRounds: any;
  canSeeEvents: any;
  availableEvents: any;
  finishedEvents: any;
  hasEventInputBox: boolean;
};

export default function PuzzleListPage({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
  canSeeEvents,
  availableEvents,
  finishedEvents,
  hasEventInputBox,
}: PuzzleListPageProps) {
  const [activeTab, setActiveTab] = useState("map");
  useEffect(() => {
    setActiveTab(getCookie("puzzle_view") ?? "map");
  }, []);

  // Will crash on mobile if not memoized
  const memoizedMap = useMemo(
    () => (
      <Map availablePuzzles={availablePuzzles} solvedPuzzles={solvedPuzzles} />
    ),
    [availablePuzzles, solvedPuzzles],
  );

  return (
    <div className="grid">
      <Tabs
        defaultValue={getCookie("puzzle_view")}
        onValueChange={(value) => {
          setActiveTab(value);
          setCookie("puzzle_view", value);
        }}
        className="col-start-1 row-start-1"
      >
        <TabsList className="fixed right-0 z-20 m-2 flex h-fit flex-col space-y-1 bg-footer-bg text-[#6c518e] md:flex-row md:space-x-1 md:space-y-0">
          {/* Icons */}
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="map"
          >
            <MapIcon />
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="tables"
          >
            <Table />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Map content */}
      <div className={"col-start-1 row-start-1"}>{memoizedMap}</div>

      {/* Table conent */}
      <div
        className={cn(
          "col-start-1 row-start-1 bg-main-bg",
          activeTab === "tables" && "z-10",
        )}
      >
        <div className="mx-auto mb-6 flex w-full max-w-3xl grow flex-col items-center p-4 pt-6">
          <h1 className="mb-2">Puzzles</h1>

          {/* Puzzle table */}
          <PuzzleTable
            availableRounds={availableRounds}
            availablePuzzles={availablePuzzles}
            solvedPuzzles={solvedPuzzles}
          />

          {/* Event table */}
          {canSeeEvents && (
            <>
              <h1 className="mb-2 mt-4">Events</h1>
              <EventTable
                availableEvents={availableEvents}
                finishedEvents={finishedEvents}
                inputBox={hasEventInputBox}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
