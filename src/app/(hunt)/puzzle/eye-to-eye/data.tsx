import Image from "next/image"
import eye from "./eye.png"


/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "eye-to-eye";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>

    <div className="max-w-3xl mb-4">This is a sequence metapuzzle. It uses feeders from the 👁️ sequence.
    </div>
    <hr className="border-t border-white mb-6 my-6" />
    <div className="max-w-3xl mb-4"><i>Only one of my eyes ever work... What do I need to fix my eyesight?</i></div>

    <div className="grid grid-cols-9 w-fit gap-0 border-2 border-white overflow-x-auto mx-auto">
    {[
      "T", "", "", "", "👁️", "", "", "", "⬜",
      "", "", "", "", "", "👁️", "", "⬜", "⬜",
      "", "", "", "", "👁️", "", "", "", "⬜",
      "", "", "", "", "", "👁️", "", "", "⬜",
      "⬜", "", "", "", "👁️", "", "", "", "",
      "⬜", "", "", "", "", "👁️", "", "", "⬜",
      "⬜", "", "", "", "👁️", "", "", "⬜", "⬜",
    ].map((cell, index) => (
      <div
        key={index}
        className={`w-10 h-10 flex items-center justify-center text-lg font-bold border border-white ${
          cell === "⬜" ? "bg-white" : "bg-transparent"
        }`}
      >
        {cell !== "⬜" && cell}
      </div>
    ))}
  </div>

  </div>
);

// Flagging: need actual emoji integration here

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">This solution does not exist yet. Go nag Arnav + Thomas.</div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `https://docs.google.com/spreadsheets/d/103uKqdsu4fi5W_qSEZvDmk5nRNHgCFCb3HtWhQLfZVw/edit?usp=sharing`;

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
