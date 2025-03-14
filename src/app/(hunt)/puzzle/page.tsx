import { auth } from "@/auth";
import { IN_PERSON, INITIAL_PUZZLES, REMOTE } from "@/hunt.config";
import Link from "next/link";
import { db } from "@/db/index";
import { eq, inArray } from "drizzle-orm";
import { solves, puzzles, unlocks, answerTokens } from "~/server/db/schema";
import PuzzleTable from "./components/PuzzleTable";
import EventTable from "./components/EventTable";
import { Round, ROUNDS } from "@/hunt.config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { MapIcon, Table } from "lucide-react";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default async function Home() {
  const session = await auth();
  const currDate = new Date();

  var availablePuzzles: {
    unlockTime: Date | null;
    id: string;
    name: string;
    answer: string;
  }[] = [];

  var solvedPuzzles: { puzzleId: string }[] = [];

  // Not logged in
  if (!session?.user?.id) {
    // If the hunt has not ended, tell them to log in
    if (currDate < REMOTE.END_TIME) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Puzzles</h1>
          <p>
            <Link href="/login" className="text-link hover:underline">
              Login
            </Link>{" "}
            to access puzzles
          </p>
        </div>
      );
    } // Otherwise, let them see all of the puzzles
    else {
      availablePuzzles = (
        await db.query.puzzles.findMany({
          columns: { id: true, name: true, answer: true },
        })
      ).map((puzzle) => ({ ...puzzle, unlockTime: null }));

      solvedPuzzles = [];
    }
  }

  // Logged in
  if (session?.user?.id) {
    // If the hunt has not yet started for users or admin, display a message
    if (
      (session.user.role === "user" || session.user.role === "admin") &&
      currDate <
        (session.user.interactionMode === "in-person"
          ? IN_PERSON.START_TIME
          : REMOTE.START_TIME)
    ) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Puzzles</h1>
          <p>The hunt has not started yet.</p>
        </div>
      );
    }

    // Otherwise, always display the puzzles unlocked
    let initialPuzzles = await db.query.puzzles.findMany({
      columns: { id: true, name: true, answer: true },
      where: inArray(puzzles.id, INITIAL_PUZZLES),
    });

    let unlockedPuzzles = await db.query.unlocks.findMany({
      columns: { unlockTime: true },
      where: eq(unlocks.teamId, session.user.id),
      with: { puzzle: { columns: { id: true, name: true, answer: true } } },
    });

    availablePuzzles = [
      ...initialPuzzles.map((puzzle) => ({ ...puzzle, unlockTime: null })),
      ...unlockedPuzzles.map((unlock) => ({
        ...unlock.puzzle,
        unlockTime: unlock.unlockTime,
      })),
    ];

    solvedPuzzles = await db.query.solves.findMany({
      columns: { puzzleId: true },
      where: eq(solves.teamId, session.user.id),
    });
  }

  const availableRounds: Round[] = ROUNDS.map((round) => ({
    name: round.name,
    puzzles: round.puzzles.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle),
    ),
  })).filter((round) => round.puzzles.length > 0);

  return (
    <Tabs defaultValue="map">
      <TabsList className="fixed z-20 right-0 m-2 space-x-1 py-5 bg-footer-bg text-[#6c518e]">
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
      <TabsContent value="map" className="mt-0">
        <Map
          availablePuzzles={availablePuzzles}
          solvedPuzzles={solvedPuzzles}
        />
      </TabsContent>
      <TabsContent value="tables" className="mt-0">
        <div className="mx-auto mb-6 flex w-full max-w-3xl grow flex-col items-center p-4 pt-6">
          <h1 className="mb-2">Puzzles</h1>
          <PuzzleTable
            availableRounds={availableRounds}
            availablePuzzles={availablePuzzles}
            solvedPuzzles={solvedPuzzles}
          />
          {(async () => {
            // Check if user should see the events
            const canSeeEvents =
              currDate > REMOTE.END_TIME ||
              (session?.user &&
                session.user.interactionMode === "in-person" &&
                currDate > IN_PERSON.START_TIME);

            if (!canSeeEvents) return;

            const availableEvents: {
              id: string;
              name: string;
              answer: string;
              description: string;
              startTime: Date;
            }[] = await db.query.events.findMany();

            const finishedEvents: {
              eventId: string;
              puzzleId: string | null;
            }[] = session?.user
              ? await db.query.answerTokens.findMany({
                  where: eq(answerTokens.teamId, session.user?.id!),
                })
              : [];

            return (
              <>
                <h1 className="mb-2 mt-4">Events</h1>
                <EventTable
                  availableEvents={availableEvents}
                  finishedEvents={finishedEvents}
                  inputBox={!!session?.user}
                />
              </>
            );
          })()}
        </div>
      </TabsContent>
    </Tabs>
  );
}
