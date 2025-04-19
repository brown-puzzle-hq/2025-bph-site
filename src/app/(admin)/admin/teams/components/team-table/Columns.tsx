"use client";
import { ColumnDef } from "@tanstack/react-table";
import { teams } from "~/server/db/schema";
import {
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Waypoints,
  Trophy
} from "lucide-react";
import { FormattedTime } from "~/lib/time";
import { ActualInteractionMode } from "~/server/db/schema";

export type TeamTableRow = {
  rank: number | null;
  id: string;
  displayName: string;
  role: string;
  actualInteractionMode: ActualInteractionMode;
  createTime: Date;
  finishTime: Date | null;
};

// Define the columns for the table using TanStack
export const columns: ColumnDef<TeamTableRow>[] = [
  {
    accessorKey: "rank",
    header: ({}) => <Trophy className="size-4" />,
    cell: ({ row }) => {
      const rank: number = row.getValue("rank");
      return <p className="text-center">{rank ?? "-"}</p>;
    },
    sortingFn: (rowA, rowB) => {
      const rankA: number | null = rowA.getValue("rank");
      const rankB: number | null = rowB.getValue("rank");
      if (rankA === null && rankB === null) return 0;
      if (rankA === null) return 1;
      if (rankB === null) return -1;
      return rankA - rankB;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex w-[200px] items-center space-x-2">
        <p>ID</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-[200px] items-center space-x-1">
        <a
          className="truncate text-blue-500 hover:underline"
          href={`/teams/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </a>
        <a
          href={`/admin/graph?team=${row.getValue("id")}`}
          className="hover:opacity-85"
        >
          <Waypoints className="size-4 text-orange-500" />
        </a>
      </div>
    ),
  },
  // TODO: figure out how to get this column to fill available space, if any
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <div className="flex w-[36em] items-center space-x-2">
        <p>Display Name</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[36em] truncate">{row.getValue("displayName")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-2">
        <p>Role</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "actualInteractionMode",
    header: ({ column }) => (
      <div className="flex w-20 items-center space-x-2">
        <p>Mode</p>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="size-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ChevronsUpDown className="size-4" />
        )}
      </div>
    ),
    filterFn: (row, id, filterValue: string[]) =>
      filterValue.includes(row.getValue(id)),
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => (
      <div className="flex w-36 items-center space-x-2">
        <p>Create Time</p>
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
      const time: Date = row.getValue("createTime");
      return <FormattedTime time={time} />;
    },
  },
  {
    accessorKey: "finishTime",
    header: ({ column }) => (
      <div className="flex w-36 items-center space-x-2">
        <p>Finish Time</p>
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
      const time: Date = row.getValue("finishTime");
      return <FormattedTime time={time} />;
    },
  },
];
