import Image from "next/image";
import SECRET_INGREDIENT from "./puzzle.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "secret-ingredient";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 text-center">
    <div className="font-bold">
      This is a sequence metapuzzle. It uses feeders from the 🌲 sequence.
    </div>
    <Image alt="" src={SECRET_INGREDIENT}></Image>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div>
    <div className="max-w-3xl space-y-4">
      <div>
        This puzzle is about the mobile game Little Alchemy (the first one, NOT
        Little Alchemy 2). That game is about combining elements to create new
        elements. You start with Earth, Air, Water, and Fire, and create from
        there by combining two elements at a time.
      </div>
      <div>
        For this puzzle, you follow along with the combinations laid out in the
        tree. Each junction is an element created by combining the two above it,
        leading back to the four basic elements. The blue nodes are labelled
        with the names of other puzzles, and for those, you plug in the answer
        to those puzzles (BIRD for Opening Sequences and SUN for What's My
        Ride).
      </div>
      <div>
        Once you complete the trees, you should get EGG and PLANT for the bottom
        two blue boxes. Concatenating those words gives{" "}
        <span className="font-bold text-main-accent">
          EGGPLANT</span>,{" "}
        the puzzle's answer.
      </div>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Noah Elbaum";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
