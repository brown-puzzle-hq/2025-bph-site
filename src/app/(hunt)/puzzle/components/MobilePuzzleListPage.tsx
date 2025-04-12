"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, Table } from "lucide-react";
import PuzzleTable from "./PuzzleTable";
import EventTable from "./EventTable";
import { useState, useMemo } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { cn } from "~/lib/utils";
import { Round } from "~/hunt.config";

export type AvailablePuzzle = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
};

export type SolvedPuzzle = { puzzleId: string };

export type AvailableEvent = {
  id: string;
  name: string;
  answer: string;
  description: string;
  startTime: string;
};

export type FinishedEvent = {
  eventId: string;
  puzzleId: string | null;
};

type PuzzleListPageProps = {
  availablePuzzles: AvailablePuzzle[];
  solvedPuzzles: SolvedPuzzle[];
  availableRounds: Round[];
  canSeeEvents: boolean;
  availableEvents: AvailableEvent[];
  finishedEvents: FinishedEvent[];
  hasEventInputBox: boolean;
  hasFinishedHunt: boolean;
};

export default function PuzzleListPage({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
  canSeeEvents,
  availableEvents,
  finishedEvents,
  hasEventInputBox,
  hasFinishedHunt,
}: PuzzleListPageProps) {
  return (
    <div className="grid min-h-[calc(100vh-56px-32px)]">
      {/* Table content */}
      <div
        className={cn(
          "z-10 col-start-1 row-start-1 block bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg",
        )}
      >
        <div className="mx-auto mb-6 flex w-full max-w-3xl grow flex-col items-center p-4 pt-6">
          <h1 className="mb-2">Puzzles</h1>

          {hasFinishedHunt && (
            <div>
              <p className="text-base italic text-main-text">
                Congratulations on completing BPH 2025! Please contact HQ at
                brownpuzzlehq@gmail.com for runaround.
              </p>
            </div>
          )}

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
