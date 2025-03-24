"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Filter,
  Rows2,
  Rows4,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { EditableFields, EditedTeam, updateTeam } from "../../actions";

export type EditedRow = {
  [K in keyof EditableFields]?: {
    new: EditableFields[K];
    old: EditableFields[K];
  };
};

interface TeamTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TeamTable<TData, TValue>({
  columns,
  data,
}: TeamTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCompact, setIsCompact] = useState(true);
  const pageSize = 100;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
      columnVisibility: {
        responseTime: false,
      },
    },
    pageCount: Math.ceil(data.length / pageSize),
  });

  const [editedRows, setEditedRows] = useState<Record<string, EditedRow>>({});

  function handleEditRow<F extends keyof EditableFields>(
    teamId: string,
    field: F,
    cellValue: any,
    e: any,
  ) {
    setEditedRows((prev) => {
      const prevEdits = prev[teamId] ?? {};
      const oldValue = prevEdits[field]?.old ?? cellValue;
      const newValue = e.target.value;

      // If the new value is the same as the original, remove the field
      // If no other fields are left, remove the team entirely
      if (newValue === oldValue) {
        const { [field]: _, ...rest } = prevEdits;
        const updatedTeamEdit = { ...rest };

        if (Object.keys(updatedTeamEdit).length === 0) {
          const { [teamId]: _, ...restTeams } = prev;
          return restTeams;
        }

        return {
          ...prev,
          [teamId]: updatedTeamEdit,
        };
      }

      // Otherwise, update the field
      return {
        ...prev,
        [teamId]: {
          ...prevEdits,
          [field]: {
            new: newValue,
            old: oldValue,
          },
        },
      };
    });
  }

  const handleSaveEdits = async () => {
    const editedTeams: Record<string, EditedTeam> = Object.entries(
      editedRows,
    ).reduce((acc: Record<string, EditedTeam>, [teamId, fields]) => {
      acc[teamId] = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, value.new]),
      ) as EditedTeam;
      return acc;
    }, {});
    await updateTeam(editedTeams);
    setEditedRows({});
  };

  return (
    <div className="w-screen px-4 xl:px-12">
      {/* Controls */}
      <div className="flex items-center justify-between space-x-2 pb-2 text-neutral-500">
        <div className="flex items-center space-x-2">
          <Filter className="size-5" />
          <input
            name="filterTeams"
            placeholder="Filter teams..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="border-b text-sm placeholder:text-neutral-300 focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="role-button ml-2 text-sm text-blue-600 disabled:opacity-50"
            disabled={Object.keys(editedRows).length === 0}
            onClick={handleSaveEdits}
          >
            Save
          </button>
          <button
            className="hover:opacity-70"
            onClick={() => setIsCompact(!isCompact)}
          >
            {isCompact ? (
              <Rows2 className="size-5" />
            ) : (
              <Rows4 className="size-5" />
            )}
          </button>
          <button
            className="hover:opacity-70"
            onClick={() => table.previousPage()}
          >
            <SquareChevronLeft className="size-5" />
          </button>
          <button className="hover:opacity-70" onClick={() => table.nextPage()}>
            <SquareChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={`header-${headerGroup.id}`}
                className="hover:bg-inherit"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={() =>
                      header.column.toggleSorting(
                        header.column.getIsSorted() === "asc",
                      )
                    }
                    role="button"
                    className={`hover:text-opacity-70 ${isCompact && "py-0"}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  // onClick={(event) => {
                  //   if (
                  //     event.target instanceof HTMLElement &&
                  //     event.target.classList.contains("role-button")
                  //   )
                  //     return;
                  //   if (event.metaKey || event.ctrlKey) {
                  //     // Open in new tab
                  //     window.open(`/teams/${row.getValue("id")}`, "_blank");
                  //   } else {
                  //     // Move to team page
                  //     router.push(`/teams/${row.getValue("id")}`);
                  //     router.refresh();
                  //   }
                  // }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`cursor-pointer ${isCompact && "py-0"}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    const teamId = row.getValue("id") as string;
                    const cellValue = cell.getValue();

                    // Check whether column is editable
                    if (["role", "interactionMode"].includes(columnId)) {
                      const field = columnId as keyof EditableFields;
                      const options =
                        field === "role"
                          ? roleEnum.enumValues
                          : field === "interactionMode"
                            ? interactionModeEnum.enumValues
                            : [];

                      return (
                        <TableCell key={cell.id}>
                          <select
                            className="rounded border px-2 py-1 text-sm"
                            value={
                              editedRows[teamId]?.[field]?.new ??
                              (cellValue as string)
                            }
                            onChange={(e) =>
                              handleEditRow(teamId, field, cellValue, e)
                            }
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={cell.id}
                        className={isCompact ? "py-0" : undefined}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="pointer-events-none h-16 text-center font-medium text-neutral-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
