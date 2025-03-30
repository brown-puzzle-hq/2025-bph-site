import { puzzleId, solutionBody } from "./data";
import DefaultHeader from "@/puzzle/components/DefaultHeader";

export const metadata = {
  title: puzzleId
    .split("-")
    .map((word) => {
      // Uppercase every letter in a roman numeral
      const romanRegex =
        /^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
      if (romanRegex.test(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ") + " - Brown Puzzlehunt",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasSolution = !!solutionBody;

  return (
    <div className="flex min-w-36 grow flex-col items-center">
      <DefaultHeader puzzleId={puzzleId} hasSolution={hasSolution} />
      {children}
    </div>
  );
}
