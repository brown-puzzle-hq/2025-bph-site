"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type TeamPuzzleStats = {
  teamDisplayName: string;
  guesses: number;
  unlockTime: Date | null;
  solveTime: Date | null;
};

function formatTime(time: Date) {
  return time.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Define the columns for the table using TanStack
export const columns: ColumnDef<TeamPuzzleStats>[] = [
  {
    accessorKey: "teamDisplayName",
    header: ({ column }) => (
      <div className="flex w-32 items-center space-x-1">
        <p>Team</p>

        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    accessorFn: (row) => row.teamDisplayName,
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("teamDisplayName")}</div>
    ),
  },
  {
    accessorKey: "guesses",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Guesses</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => <div className="w-8">{row.getValue("guesses")}</div>,
  },
  {
    accessorKey: "unlockTime",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Unlock Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => formatTime(row.getValue("unlockTime")),
    sortingFn: "datetime",
  },
  {
    accessorKey: "delta",
    accessorFn: (row) =>
      row.solveTime && row.unlockTime
        ? row.solveTime.getTime() - row.unlockTime.getTime()
        : null,
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Delta</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => {
      const deltaMs = row.getValue<number>("delta");
      if (deltaMs == null) return "-";

      const totalSeconds = Math.floor(deltaMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const parts = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);

      return parts.join(" ");
    },
  },
  {
    accessorKey: "solveTime",
    header: ({ column }) => (
      <div className="flex w-28 items-center space-x-1">
        <p>Solve Time</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => formatTime(row.getValue("solveTime")),
    sortingFn: "datetime",
  },
];
