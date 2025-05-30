/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "six-degrees";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div>
    <div className="max-w-3xl space-y-4 text-center">
      <b>This is a metapuzzle. It uses feeders from the Reality round.</b>
    </div>
    <div className="mb-4 max-w-3xl text-center italic">
      This puzzle has intermediate answer confirmation.
    </div>
    <div className="mb-4 max-w-3xl text-center">
      <i>
        Your documentary is in trouble... your subjects are all paid actors! How
        can you fix your movie and save your leads' bacon?
      </i>
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
  <div className="max-w-3xl">
    <div className="mx-auto max-w-3xl space-y-6">
      <p>
        This whole puzzle is based on biopics! All of the answers in the round
        are the names of a biopic. Solvers might clue into this from the
        reference to both 'documentary' and 'lead actor' in the flavortext.
      </p>
      <p>
        Once they find each of the movies, they should look at who the main
        actor is and find their Kevin Bacon number (as clued by the title). They
        should then index into the lead actor name and organize by release date
        (from earliest to most recent). This tells us what they need to do to
        fix their movie; they need to{" "}
        <span className="font-bold text-main-accent">FILM REAL</span>.
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Puzzle Answer
              </th>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Release Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Subject of Biopic
              </th>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Lead Actor
              </th>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Bacon Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-black">
                Index into Lead
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-black">
            {[
              ["BIRD", "1988", "Charlie Parker", "Forest Whitaker", "1", "F"],
              ["WIRED", "1989", "John Belushi", "Michael Chiklis", "2", "I"],
              [
                "GATHERING STORM",
                "2002",
                "Winston Churchill",
                "Albert Finney",
                "2",
                "L",
              ],
              ["FIGHTER", "2010", "Micky Ward", "Mark Wahlberg", "1", "M"],
              [
                "NATIONAL SECURITY",
                "2012",
                "Kim Jong-tae",
                "Park Won-sang",
                "3",
                "R",
              ],
              [
                "CONFIRMATION",
                "2016",
                "Anita Hill",
                "Kerry Washington",
                "2",
                "E",
              ],
              [
                "JUNGLE",
                "2017",
                "Yossi Ghinsberg",
                "Daniel Radcliffe",
                "2",
                "A",
              ],
              ["FAVOURITE", "2018", "Queen Anne", "Olivia Colman", "2", "L"],
            ].map((row, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                {row.map((cell, i) => (
                  <td key={i} className="border border-gray-300 px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors =
  "Megan Carlson, Malcolm Certain, Erin Finn, Kaylee Gallagher, and Eric Wu";

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
export const partialSolutions: Record<string, string> = {
  FORESTWHITAKER: "This is a lead actor! Keep going!",
  MICHAELCHIKLIS: "This is a lead actor! Keep going!",
  ALBERTFINNEY: "This is a lead actor! Keep going!",
  MARKWAHLBERG: "This is a lead actor! Keep going!",
  PARKWONSANG: "This is a lead actor! Keep going!",
  KERRYWASHINGTON: "This is a lead actor! Keep going!",
  DANIELRADCLIFFE: "This is a lead actor! Keep going!",
  OLIVIACOLMAN: "This is a lead actor! Keep going!",
};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
