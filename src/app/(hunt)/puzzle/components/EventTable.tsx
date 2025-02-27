"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import EventForm from "./EventForm";
import { PencilLine } from "lucide-react";

type Event = {
  id: string;
  name: string;
  startTime: Date;
  description: string;
  answer: string;
};

type Token = {
  eventId: string;
  puzzleId: string | null;
};

export default function EventTable({
  availableEvents,
  finishedEvents,
}: {
  availableEvents: Event[];
  finishedEvents: Token[];
}) {
  return (
    <div className="w-full">
      <Table className="mx-auto overflow-hidden rounded-md">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-secondary-text">Event</TableHead>
            <TableHead className="text-secondary-text">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableEvents
            // If both puzzles have null times, sort alphabetically
            // Otherwise, prioritize the puzzle with null time
            // If neither puzzles have null times, sort by earliest unlock
            .map((event) => (
              <TableRow key={event.id} className="hover:bg-inherit">
                <TableCell>
                  {event.name.trim() ? event.name : "\u200b"}
                  <div className="flex items-center space-x-2">
                    <PencilLine className="h-4 w-4" />
                    {finishedEvents.some((fe) => fe.eventId === event.id) ? (
                      <span
                        className={
                          finishedEvents.find((fe) => fe.eventId === event.id)
                            ?.puzzleId
                            ? "text-correct-guess line-through"
                            : "text-correct-guess"
                        }
                      >
                        {event.answer}
                      </span>
                    ) : (
                      <EventForm eventId={event.id} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
