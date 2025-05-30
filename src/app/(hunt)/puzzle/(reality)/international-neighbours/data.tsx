/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * exampxe.com/puzzle/puzzleId.
 */
export const puzzleId = "international-neighbours";

/**
 * The `puzzleBody` renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="flex max-w-3xl flex-col items-center space-y-4">
    <p className="pb-2.5 text-center italic">
      You ask a friend for help with your linguistics assignment, but they
      pronounce things a little differently each time.
    </p>
    <div className="grid grid-cols-1 gap-4">
      <div>
        <span className="bg-yellow-200 text-black">_</span> _ _ _ _
      </div>
      <div>
        <span className="bg-yellow-200 text-black">_</span> _ _ _ _
      </div>
      <div>
        _ _ _ _ <span className="bg-yellow-200 text-black">_</span>
      </div>
      <div>
        _ <span className="bg-yellow-200 text-black">_</span> _ _ _
      </div>
      <div>
        _ _ _ <span className="bg-yellow-200 text-black">_</span> _
      </div>
      <div>
        <span className="bg-yellow-200 text-black">_</span> _ _ _ _
      </div>
    </div>
    <div></div>
    <div className="border-4 border-white p-4">
      <div>Someone who collapses</div>
      <div>Partner of copier</div>
      <div>Wider</div>
      <div>Religion associated with reggae, for short</div>
      <div>Christian leader of a congregation</div>
      <div>Leonardo da Vinci or Pablo Picasso, for two</div>
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
  <div className="max-w-3xl space-y-4">
    <div>
      This puzzle is a word ladder but instead of a letter off they're a sound off
      because the answers are all spelled in IPA with one symbol changing
      between each. It's also British pronunciation.
    </div>
    <div>
      So the blanks should be filled in this order, with the green symbol being
      indexed from the highlighted space.
    </div>
    <div className="text-xl">
      <span className="font-bold text-green-400">ɹ</span>
      <span>ɑ</span>
      <span>s</span>
      <span>t</span>
      <span>ə</span>→<span className="font-bold text-green-400">v</span>
      <span>ɑ</span>
      <span>s</span>
      <span>t</span>
      <span>ə</span>→<span>p</span>
      <span>ɑ</span>
      <span>s</span>
      <span>t</span>
      <span className="font-bold text-green-400">ə</span>→<span>p</span>
      <span className="font-bold text-green-400">eɪ</span>
      <span>s</span>
      <span>t</span>
      <span>ə</span>→<span>p</span>
      <span>eɪ</span>
      <span>n</span>
      <span className="font-bold text-green-400">t</span>
      <span>ə</span>→<span className="font-bold text-green-400">f</span>
      <span>eɪ</span>
      <span>n</span>
      <span>t</span>
      <span>ə</span>
    </div>
    <div>
      (<span className="font-bold text-green-400">eɪ</span> is a diphthong so it
      counts as one symbol)
    </div>
    <div>Written in english:</div>
    <div className="text-xl">
      Rasta → Vaster → Pastor → Paster → Painter → Fainter
    </div>
    <div>(remember it's British pronunciation!)</div>
    <div>
      The clues are meant to help people guess the words. They are arranged in
      the order that the indexed symbols should be arranged (so the f from the
      IPA spelling of fainter will go first because that clue is first, then the
      eɪ from paster because that clue is second, etc.)
    </div>
    <div>
      Then using the highlighted symbol and ordering them based on the clues,
      you should get: f eɪ v ɹ ə t, aka the British pronunciation of favorite,
      which they would spell {" "}
      <span className="font-bold text-main-accent">
        FAVOURITE</span>.
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Chloe Johnson";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `Someone who collapses
Partner of copier
Wider
Religion associated with reggae, for short
Christian leader of a congregation
Leonardo da Vinci or Pablo Picasso, for two
`;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be dispxayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
