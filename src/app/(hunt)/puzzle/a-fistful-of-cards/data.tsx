import Image from "next/image";
import horse from "./horse.png";
import boom_and_bust from "./boom_and_bust.png"
import boompile from "./boompile.png"
import granted_dynamite from "./granted_dynamite.png"
import holster_tavern from "./holster_tavern.png"
import ingenious_engineering from "./ingenious_engineering.png"
import booklet1 from "./booklet_1.png"
import booklet2 from "./booklet_2.png"
import booklet3 from "./booklet_3.png"
import booklet4 from "./booklet_4.png"
import discard from "./playmat discard.png"
import stash from "./playmat stash.png"
import town from "./playmat town.png"


/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "a-fistful-of-cards";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl text-center mb-6"><i>This is a physical puzzle! You should have received it at kickoff. Please visit HQ in Friedman 208 if you believe you are missing these supplies.</i></div>
    <hr className="border-t border-white mb-6 my-6" />
    <div className="max-w-3xl text-center mb-6"><span className="underline"><b>Round 1</b></span>: Deal 14 damage.</div>
    <div className="max-w-3xl mb-3"><span className="underline"><b>Legal cards</b></span>: The{" "}
      <Image
        src={horse}
        alt="horse"
        width={30}  
        height={30} 
        className="inline-block align-text-bottom"
      />{" "}
      set.

</div>

    <ul className="list-disc pl-6">
      <li>Boom and Bust</li>
      <li>Boompile</li>
      <li>Granted Dynamite</li>
      <li>Holster Tavern</li>
      <li>Ingenious Engineering</li>
    </ul>
  

  </div>
);

export const remoteBoxBody = (
  <div>
    <div className="max-w-3xl text-center"><i>This is a physical puzzle! You should have received it in your Box. Contact brownpuzzlehq@gmail.com with any questions about your Box or its materials.</i></div>
    <hr className="border-t border-white mb-6 my-6" />
    <div className="max-w-3xl text-center mb-6"><span className="underline"><b>Round 1</b></span>: Deal 14 damage.</div>
    <div className="max-w-3xl mb-3"><span className="underline"><b>Legal cards</b></span>: The{" "}
      <Image
        src={horse}
        alt="hat"
        width={30}  
        height={30} 
        className="inline-block align-text-bottom"
      />{" "}
      set.

    </div>

    <ul className="list-disc pl-6">
      <li>Boom and Bust</li>
      <li>Boompile</li>
      <li>Granted Dynamite</li>
      <li>Holster Tavern</li>
      <li>Ingenious Engineering</li>
    </ul>

  </div>
  );

export const remoteBody = (<div>
  <div className="w-full mb-6 text-center"><span className="underline"><b>Round 1</b></span>: Deal 14 damage.</div>
  <hr className="border-t border-white mb-6 my-6" />
  <div className="w-full mb-6 text-center"><span className="underline"><b>Legal cards</b></span>: The{" "}
    <Image
      src={horse}
      alt="hat"
      width={30}  
      height={30} 
      className="inline-block align-text-bottom"
    />{" "}
    set.

  </div>

  <div className="grid grid-cols-3 gap-4 justify-items-center mt-5">
      <Image
        src={boom_and_bust}
        alt="Boom and Bust"
        width={250}
        height={500}
      />
      <Image
        src={boompile}
        alt="Boompile"
        width={250}
        height={500}
      />
      <Image
        src={granted_dynamite}
        alt="Granted Dynamite"
        width={250}
        height={500}
      />
    </div>
  <div className="grid grid-cols-2 gap-x-8 justify-items-center mt-5 w-max mx-auto">
      <Image
        src={holster_tavern}
        alt="Holster Tavern"
        width={250}
        height={500}
      />
      <Image
        src={ingenious_engineering}
        alt="Ingenious Engineering"
        width={250} 
        height={500} 
      />
    </div>

  <hr className="border-t border-white mb-6 my-6" />

  <div className="w-full mb-6 text-center"><span className="underline"><b>Instructions</b></span></div>

  <div className="flex justify-center mt-8 gap-4">
      <Image
        src={booklet1}
        alt="Booklet #1"
        width={200}
        height={400}
      />
      <Image
        src={booklet2}
        alt="Booklet #2"
        width={200}
        height={400}
      />
      <Image
        src={booklet3}
        alt="Booklet #3"
        width={200}
        height={400}
      />
      <Image
        src={booklet4}
        alt="Booklet #4"
        width={200}
        height={400}
      />
    </div>

  <hr className="border-t border-white mb-6 my-6" />

  <div className="w-full mb-6 text-center"><span className="underline"><b>Playmats</b></span></div>

  <div className="flex flex-col items-center justify-between h-full gap-4">
      <Image
        src={stash}
        alt="The Stash"
        width={700}
        height={1000}
      />
      <Image
        src={town}
        alt="The Town"
        width={700}
        height={1000}
      />
      <Image
        src={discard}
        alt="Discard Pile"
        width={700}
        height={1000}
      />
      </div>

</div>
);

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl text-center">This puzzle does not have a solution. Go nag Jeremy. </div>
);

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `null`; // come back later
 
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
