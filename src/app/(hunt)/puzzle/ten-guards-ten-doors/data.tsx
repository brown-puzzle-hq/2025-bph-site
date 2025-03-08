import Image from "next/image"
import ten-guards from "./ten-guards.png"

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "ten-guards-ten-doors";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>

    <div className="max-w-3xl mb-5">You are a guard, and are standing in a large circle with ten doors and nine other guards, with each of you standing in front of a door and facing the center such that you can see every door but your own. Going through your door will lead to the next area of the puzzle hunt, but if any guard attempts to go through a door that has a window, a hungry pigeon behind it will eat the door first, preventing them from progressing. However, if a door does not have a window, the guard can go through the door before the pigeon has a chance to eat it. Other guards are all perfect logicians and will go through their doors if and only if they believe they are 100% certain it is windowless. However, unbeknownst to them, every guard other than you is hallucinating, and never sees another guard move, even when they do move…</div>
    <div className="max-w-3xl">You observe the following:</div>



  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">This is an example solution.</div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `1\t2\t3
4\t5\t6
7\t8\t9`;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {
  EXAMP: "Almost there!",
  EXAMPL: "Learn to spell!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {
  EX: (
    <div className="max-w-3xl text-center">
      This is a task unlocked by submitting EX.
    </div>
  ),
  EXAM: (
    <div className="max-w-3xl text-center">
      This is a task unlocked by submitting EXAM.
    </div>
  ),
};
