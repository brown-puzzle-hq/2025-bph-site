import Image from "next/image";
import Link from "next/link";
import ten_guards from "./guards.png";

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
    <div className="mb-5 max-w-3xl">
      You are a guard and are standing in a large circle with ten doors and nine
      other guards, with each of you standing in front of a door and facing the
      center such that you can see every door but your own. Going through your
      door will lead to the next area of the puzzle hunt, but if any guard
      attempts to go through a door that has a window, a hungry pigeon behind it
      will eat the door first, preventing them from progressing. However, if a
      door does not have a window, the guard can go through the door before the
      pigeon has a chance to eat it. Other guards are all perfect logicians and
      will go through their doors if and only if they believe they are 100%
      certain it is windowless. However, unbeknownst to them, every guard other
      than you is hallucinating, and never sees another guard move, even when
      they do move…
    </div>
    <div className="max-w-3xl">You observe the following:</div>
    <div className="text-center">
      <Image
        src={ten_guards}
        width={800}
        height={800}
        alt=""
        className="mb-4"
      />
    </div>
    <div className="mb-5 max-w-3xl">
      At the beginning of day one, an announcer tells the whole group, “At least
      one door is windowless.”
    </div>
    <div className="mb-5 max-w-3xl">
      Once every day, starting on the first day, there is exactly one moment in
      which each guard simultaneously has the chance to stay or attempt to
      leave. If you observe another guard leave, you may not leave on the same
      day, but any number of guards may leave on a single day.
    </div>
    <div className="mb-5 max-w-3xl">
      The day you leave, you notice the word “Character” written on your door
      before walking through it.
    </div>
    <div className="mb-5 max-w-3xl">
      What is the earliest day that each guard attempts to leave?
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
    <div className="mt-8 max-w-3xl">
      This puzzle is based on using the logic explained in{" "}
      <Link href="https://www.youtube.com/watch?v=98TQv5IAtY8">
        <span className="underline">this video.</span>
      </Link>{" "}
      Using this logic of putting yourself in someone else's shoes, who then
      puts themselves in someone else's shoes, and so on, eventually allows you
      to deduce whether you are able to leave or not by observing when everyone
      else chooses to leave or stay. Because no guard ever sees another move
      (even when they do move), they all eventually come to believe their door
      must be closed and windowless (even if it's not).
    </div>

    <div>
      To solve this puzzle, we will break up the guards into groups: you, guards
      with windowless doors, and guards with windowed doors. For the clarity of
      the solution, designate numbers for each guard: you (1), guards with
      windowless doors (2-6), and guards with windowed doors (7-10). Note that
      the numbers designated in the solution do not reference the order guards
      are standing in, and are instead arbitrary numbers based on the number of
      guards of each category.
    </div>

    <div>
      <b>You (Guard 1):</b>
    </div>

    <div>
      {" "}
      You don't know whether your door has a window or not. Because you do not
      want to leave before you are certain your door is windowless, assume your
      door has a window, in which case there would be 5 windowed doors and 5
      windowless doors. Then, put yourself in the shoes of guard (2), who
      doesn't know the state of their own door and would see 4 windowless doors
      and 5 windowed doors.
    </div>

    <div>
      {" "}
      Based on present information, guard (2) does not have enough information
      to determine the state of their door. Therefore, they will suppose that
      their door has a window, in which case there would be 6 doors with windows
      and 4 doors without windows. They then put themselves in the shoes of
      guard (3), who would see 3 windowless doors and 6 windowed doors.
    </div>

    <div>
      Based on present information, guard (3) also does not have enough
      information to determine the state of their door. Therefore, they will
      suppose that their door has a window, in which case there would be 7 doors
      with windows and 3 doors without windows. They then put themselves in the
      shoes of guard (4), who would see 2 windowless doors and 7 windowed doors.
    </div>

    <div>
      Based on present information, guard (4) also does not have enough
      information to determine the state of their door. Therefore, they will
      suppose that their door has a window, in which case there would be 8 doors
      with windows and 2 doors without windows. They then put themselves in the
      shoes of guard (5), who would see 1 windowless door and 8 windowed doors.
    </div>

    <div>
      Based on present information, guard (5) also does not have enough
      information to determine the state of their door. Therefore, they will
      suppose that their door has a window, in which case there would be 9 doors
      with windows and 1 door without a window. They then put themselves in the
      shoes of guard (6), who would see 0 windowless doors and 9 windowed doors.
    </div>

    <div>
      In this scenario, guard (6) would see no windowless doors. Therefore, the
      only way for the announcer's statement to be true is if their door is
      windowless. This means that they would leave on day 1. Note that this is
      only true if all prior suppositions were correct.
    </div>

    <div>
      Because guard (5) does not observe guard (6) leave on day 1, guard (5)
      realizes that their supposition must be wrong, and thus their door must
      also be windowless. Therefore, if all suppositions prior to guard (5) were
      correct, guards (5-6) would leave on day 2.
    </div>

    <div>
      Because guard (4) does not observe guards (5-6) leave on day 1, guard (4)
      realizes that their supposition must be wrong, and thus their door must
      also be windowless. Therefore, if all suppositions prior to guard (4) were
      correct, guards (4-6) would leave on day 3.
    </div>

    <div>
      Because guard (3) does not observe guards (4-6) leave on day 1, guard (3)
      realizes that their supposition must be wrong, and thus their door must
      also be windowless. Therefore, if all suppositions prior to guard (3) were
      correct, guards (3-6) would leave on day 4.
    </div>

    <div>
      Because guard (2) does not observe guards (3-6) leave on day 1, guard (2)
      realizes that their supposition must be wrong, and thus their door must
      also be windowless. Therefore, if all suppositions prior to guard (2) were
      correct, guards (2-6) would leave on day 5.
    </div>

    <div>
      Because you do not observe guards (2-6) leave on day 1, you realize that
      your supposition must be wrong, and thus your door must also be
      windowless. Therefore, you and guards (2-6) all leave on day 6.
    </div>

    <div>
      Because you have worked out that your door is windowless, and you are not
      hallucinating, you know that each other guard will see your door as
      windowless.
    </div>

    <div>
      <b>Guards (2-6) (guards with windowless doors):</b>
    </div>

    <div>
      By the logic above, guards (2-6) would all leave with you on day 6.
    </div>

    <div>
      <b>Guards (7-10) (guards with windowed doors):</b>
    </div>

    <div>
      Each of these guards would use the same logic as above, however they begin
      by seeing one more windowless door and one less windowed door (since their
      door is windowed instead of windowless, and they cannot see their own
      door). Thus, it would take them one extra day to believe their door is
      windowless, and they would all leave on day 7.
    </div>

    <div>
      <b>Answer Extraction:</b>
    </div>

    <div>
      By the above logic, guards with windowless doors will leave on day 6, and
      guards with windowed doors will attempt to leave on day 7.
    </div>

    <div>
      We index into the given words by the day each guard leaves, starting with
      your door and going clockwise, giving:
    </div>

    <div className="flex flex-col items-center">
      <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
        <thead>
          <tr className="font-bold text-white">
            <th className="p-2 outline outline-white">Door Word</th>
            <th className="p-2 outline outline-white">Day Left</th>
            <th className="p-2 outline outline-white">Extracted Letter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 outline outline-white">CHARACTER</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">C</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">TRANSLATED</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">L</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">LOCATION</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">RELEASED</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">S</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">PRODUCER</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">E</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">SUCCEEDED</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">D</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">RECORDING</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">D</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">DIRECTOR</td>
            <td className="p-2 outline outline-white">7</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">PLATFORMS</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">O</td>
          </tr>
          <tr>
            <td className="p-2 outline outline-white">PERFORMER</td>
            <td className="p-2 outline outline-white">6</td>
            <td className="p-2 outline outline-white">R</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-6">
      Reading the extracted letters in order gives our answer:{" "}
      <span className="font-bold text-main-accent">
        CLOSED-DOOR
      </span>
      .
    </div>
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Nate Chinman, Nicholas Cressman, and Jack de Haan";

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
