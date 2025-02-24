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
    <div className="min-w-[40%]">
      <Table className="justify-center overflow-hidden rounded-md">
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
                </TableCell>
                <TableCell>
                  <div className="pb-2">{event.description}</div>
                  <div className="flex space-x-2">
                    <p>Token:</p>
                    {finishedEvents.some((fe) => fe.eventId === event.id) ? (
                      <span className="text-correct-guess">{event.answer}</span>
                    ) : (
                      <EventForm eventId={event.id} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
