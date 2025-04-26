/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "filming-schedule";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="mx-auto max-w-3xl space-y-4 text-center">
        <div className="pb-2.5 italic">
        It's really hard to register and coordinate my Brown University courses
        for this semester with this filming schedule.
    </div>
    <ol className="list-inside list-decimal space-y-3 text-left">
      <li>
        <span className="font-semibold">EDUC 0610</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “The Halfblood's _____” by Devin Hanson{" "}
            <span className="text-gray-400">[5]</span>
          </li>
        </ol>
      </li>
      <li>
        <span className="font-semibold">IAPA 1502</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “____” by Ali Hazelwood (now titled “Deep End”){" "}
            <span className="text-gray-400">[4]</span>
          </li>
        </ol>
      </li>
      <li>
        <span className="font-semibold">RELS 1325C</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “The Aeneid” by ______ <span className="text-gray-400">[6]</span>
          </li>
        </ol>
      </li>
      <li>
        <span className="font-semibold">LITR 1153C</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “_____ in the Hills” by Elizabeth West{" "}
            <span className="text-gray-400">[5]</span>
          </li>
        </ol>
      </li>
      <li>
        <span className="font-semibold">PHP 1650</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “The ____” by A.E. Ellis <span className="text-gray-400">[4]</span>
          </li>
        </ol>
      </li>
      <li>
        <span className="font-semibold">APMA 2610</span>
        <ol className="ml-5 list-inside list-disc">
          <li>
            “In the Name of ______ Citizens: The Trials of Frank de Groot” by
            Brian Wright <span className="text-gray-400">[6]</span>
          </li>
        </ol>
      </li>
    </ol>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = (
  <div className="max-w-3xl space-y-4 text-left">
    <p>
      Solving the puzzle involves identifying these pairs of words differing by one letter, finding the
      letter, and putting those letters together.
    </p>
    <p>
      To start, each indented item in the list refers to a book, with one word
      in the title or author's name missing. This missing word is the first in
      the pair of words we need to find. They are as follows:
    </p>
    <ul className="ml-5 list-inside list-disc space-y-3">
      <li>
        “The Halfblood's <span className="font-semibold">HOARD</span>” by Devin
        Hanson
      </li>
      <li>
        “<span className="font-semibold">WHET</span>” by Ali Hazelwood (now
        titled “Deep End”)
      </li>
      <li>
        “The Aeneid” by <span className="font-semibold">VIRGIL</span>
      </li>
      <li>
        “<span className="font-semibold">HOVEL</span> in the Hills” by Elizabeth
        West
      </li>
      <li>
        “The <span className="font-semibold">RACK</span>” by A. E. Ellis
      </li>
      <li>
        “In the Name of <span className="font-semibold">DECENT</span> Citizens:
        The Trials of Frank De Groot” by Brian Wright
      </li>
    </ul>
    <p>
      The other word in each pair is deduced from the course title on Courses @
      Brown. For example, EDUC 0610 is “Brown v. Board of Education and the
      History of School Desegregation.” Since "hoard" is in the book title, the
      matching word must be "Board."
    </p>

    <table className="items-center border border-white pb-4 text-xs leading-none sm:text-base">
      <thead>
        <tr className="font-bold text-white">
          <th className="w-1/3 p-2 outline outline-white">Book word</th>
          <th className="w-1/3 p-2 outline outline-white">Course title word</th>
          <th className="w-1/3 p-2 outline outline-white">Changed letter in course title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 outline outline-white">HOARD</td>
          <td className="p-2 outline outline-white">BOARD</td>
          <td className="p-2 outline outline-white">B</td>
        </tr>
        <tr>
          <td className="p-2 outline outline-white">WHET</td>
          <td className="p-2 outline outline-white">WHAT</td>
          <td className="p-2 outline outline-white">A</td>
        </tr>
        <tr>
          <td className="p-2 outline outline-white">VIRGIL</td>
          <td className="p-2 outline outline-white">VIRGIN</td>
          <td className="p-2 outline outline-white">N</td>
        </tr>
        <tr>
          <td className="p-2 outline outline-white">HOVEL</td>
          <td className="p-2 outline outline-white">NOVEL</td>
          <td className="p-2 outline outline-white">N</td>
        </tr>
        <tr>
          <td className="p-2 outline outline-white">RACK</td>
          <td className="p-2 outline outline-white">RACE</td>
          <td className="p-2 outline outline-white">E</td>
        </tr>
        <tr>
          <td className="p-2 outline outline-white">DECENT</td>
          <td className="p-2 outline outline-white">RECENT</td>
          <td className="p-2 outline outline-white">R</td>
        </tr>
      </tbody>
    </table>

    <div>
      The new letters in the course titles spell out our answer,{" "}
      <span className="bg-main-text py-0.5 transition-all duration-300 hover:bg-inherit">BANNER.</span>
    </div>
          
  </div>
);

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = "Noah";

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `<table><tr><td>It's really hard to register and coordinate my Brown University courses with this filming schedule.<tr><tr><td><b>EDUC 0610</b><tr><td>"The Halfblood's _____" by Devin Hanson [5]<tr><tr><td><b>IAPA 1502</b><tr><td>"____" by Ali Hazelwood (now titled "Deep End") [4]<tr><tr><td><b>RELS 1325C</b><tr><td>"The Aeneid" by ______ [6]<tr><tr><td><b>LITR 1153C</b><tr><td>"_____ in the Hills" by Elizabeth West [5]<tr><tr><td><b>PHP 1650</b><tr><td>"The ____" by A.E. Ellis [4]<tr><tr><td><b>APMA 2610</b><tr><td>"In the Name of ______ Citizens: The Trials of Frank de Groot" by Brian Wright [6]</table>`;

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
