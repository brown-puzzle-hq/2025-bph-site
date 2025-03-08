/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "drop-the";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const inPersonBody = (
  <div className="flex flex-col items-center">
  <div className="max-w-3xl text-center mb-4"><b>This is a metapuzzle. It uses feeders from the{" "}<span className="underline">ACTION</span> round.</b></div>
  <div className="max-w-3xl mb-4"><i>You're trying to adapt these characters -- better known by other names -- into your movie, but people are butting heads. What do they need?</i></div>

  <div className="grid grid-cols-8 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">4</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">5</div>
    </div>     
  <div className="grid grid-cols-7 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">10</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">6</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      </div>  
  <div className="grid grid-cols-6 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">7</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">8</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      </div>  
  <div className="grid grid-cols-5 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center">3</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">9</div>
      </div>  
  <div className="grid grid-cols-4 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">2</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      </div>  
  <div className="grid grid-cols-3 gap-1 justify-center mt-4">
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
      <div className="w-10 h-10 border border-white flex items-center justify-center">1</div>
      <div className="w-10 h-10 border border-white flex items-center justify-center"></div>
    </div>  

</div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center"> This solution does not exist yet. Nag the triplets. </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `null`; // TO DO LATER tbh not dealing with this rn

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
