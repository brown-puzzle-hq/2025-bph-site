import Game from "./Game";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "guards-river";

/**
 * The `PuzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export function PuzzleBody(): JSX.Element {
  return (
    <div>
      <p className="italic">
        You are traveling with two guards, two doors, and a cabbage. You arrive
        at a river and find a boat. The boat can hold you and two other
        entities, and it cannot cross the river without you.
      </p>
      <br />
      <p className="italic">
        There is a wolf guard and a goat guard. The guards are
        indistinguishable. There are two doors: one will let you through to
        [Drama], and the other will end your puzzlehunt journey. The doors are
        also indistinguishable. If you leave the wolf guard with the correct
        door unattended, the wolf will eat it. If you leave the goat guard with
        the incorrect door, the goat will eat it as well. If you leave the wolf
        guard with the goat guard, the wolf will eat the goat. If you leave the
        goat guard with the cabbage, the goat guard will eat the cabbage. If you
        bring the cabbage on the boat, the cabbage will eat the boat, and you
        will drown (no one can swim) 💀.
      </p>
      <br />
      <p>How can you ensure you go through the correct door?</p>
      <br />
      <Game />
    </div>
  );
}

/**
 * The `SolutionBody` renders in the solution page.
 * If there are no solutions available, return null.
 */
export function SolutionBody(): JSX.Element | null {
  return null;
  // return <div className="text-center">This is an example solution.</div>;
}

export const copyText = null;
