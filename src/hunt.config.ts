import { db } from "./server/db";
import { hints } from "./server/db/schema";
import { and, count, eq, ne } from "drizzle-orm";
import { LucideIcon, ScrollText, Shield, ShieldCheck } from "lucide-react";

/** REGISTRATION AND HUNT START */
export const REGISTRATION_START_TIME = new Date("2024-11-17T17:00:00.000Z");
export const REGISTRATION_END_TIME = new Date("2027-11-24T17:00:00Z");

export const IN_PERSON = {
  KICKOFF_DOOR_TIME: new Date("2025-04-12T15:30:00.000Z"),
  KICKOFF_TIME: new Date("2025-04-12T16:00:00.000Z"),
  START_TIME: new Date("2025-04-12T17:00:00.000Z"),
  END_TIME: new Date("2025-04-13T23:00:00Z"),
  WRAPUP_DOOR_TIME: new Date("2025-04-13T23:30:00.000Z"),
  WRAPUP_TIME: new Date("2025-04-14T00:00:00Z"),
};

export const REMOTE = {
  START_TIME: new Date("2025-04-19T16:00:00.000Z"),
  END_TIME: new Date("2025-04-25T16:00:00.000Z"),
  WRAPUP_TIME: new Date("2025-04-26T17:00:00Z"),
};

type Sequence = {
  name?: string;
  icon: LucideIcon;
  puzzles: string[];
};

/** The sequence list is ordered. Sequences that occur earlier in the list
 * will be displayed earlier. Puzzles that occur earlier in the list will
 * be displayed earlier. */
export const SEQUENCES: Sequence[] = [
  { name: "A", icon: ScrollText, puzzles: ["seq1", "seq2"] },
  { name: "B", icon: ShieldCheck, puzzles: ["seq1", "seq3"] },
  { name: "guards", icon: Shield, puzzles: ["guards-river"] },
];

/** GUESSES */
export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team. */
export const INITIAL_PUZZLES: string[] = [];
/** List of meta puzzles. Solving all of the metas unlocks the runaround. */
export const META_PUZZLES: string[] = [];
/** Adjacency list for puzzles */
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {};

// For developers
// export const INITIAL_PUZZLES: string[] = ["example", "seq1"];
// export const META_PUZZLES = ["meta"];
// export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {
//   example: ["puzzle1", "puzzle2"],
//   puzzle1: ["puzzle2", "hello"],
//   seq1: ["seq2"],
// };

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
export function getTotalHints(teamId: string, role: string) {
  const initialNumberOfHints =
    role == "admin" || role == "testsolver" ? 1e6 : 1;
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - IN_PERSON.START_TIME.getTime(); // In milliseconds
  const rate = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return initialNumberOfHints + Math.max(Math.floor(timeDifference / rate), 0);
}

/** Calculates the total number of hints available to a team */
export async function getNumberOfHintsRemaining(teamId: string, role: string) {
  const totalHints = getTotalHints(teamId, role);
  const query = await db
    .select({ count: count() })
    .from(hints)
    .where(and(eq(hints.teamId, teamId), ne(hints.status, "refunded")));
  const usedHints = query[0]?.count ? query[0].count : 0;
  return totalHints - usedHints;
}
