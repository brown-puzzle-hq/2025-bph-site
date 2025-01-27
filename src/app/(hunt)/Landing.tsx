"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IN_PERSON, REMOTE } from "~/hunt.config";

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
});

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-screen overflow-hidden bg-mahogany-950">
      <div className="relative h-[100vh] w-screen overflow-hidden bg-mahogany-950">
        {/* absolute background with stars */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top"
          style={{
            backgroundImage: `url(/home/4.png)`,
            transform: `translateY(${scrollY * -0.1}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Back cityscape */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/3.png)`,
            transform: `translateY(${scrollY * -0.3}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Middle cityscape with lamps */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/2.png)`,
            transform: `translateY(${scrollY * -0.5}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Front theater building */}
        <div
          className="relative h-[200vh] bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/1.png)`,
            transform: `translateY(${scrollY * -1}px)`,
            clipPath: `inset-0`,
          }}
        />
        <div className="text-primary relative mt-6 w-full bg-mahogany-950 p-4">
          <h1>Hunt Information</h1>
          <h2>What is Brown Puzzlehunt?</h2>
        </div>
      </div>

      {/* Div right below the image */}
      <div className="text-primary relative mt-6 w-full bg-mahogany-950 p-4">
        <h1>Hunt Information</h1>
        <h2>What is Brown Puzzlehunt?</h2>
        <p>
          Brown Puzzlehunt 2025 is the third annual puzzlehunt run by current
          Brown and RISD students.
        </p>
        <p>
          In a puzzlehunt, participants compete in teams to solve puzzles.
          Puzzles can come in many different forms; the only commonality is that
          there are usually no direct instructions, so it is up to you to
          extract an English word or phrase from the information given. You can
          read a longer introduction to puzzlehunts{" "}
          <Link
            href="https://blog.vero.site/post/puzzlehunts"
            className="no-underline hover:underline"
          >
            here
          </Link>
          .
        </p>
        <p>
          This hunt is designed to be a relatively easy introduction to
          puzzlehunting for beginner teams. We expect this year's Brown
          Puzzlehunt to be roughly the same length and difficulty as last year's{" "}
          <Link
            href="https://2024.brownpuzzlehunt.com/"
            className="no-underline hover:underline"
          >
            hunt
          </Link>
          . If you are looking for some practice, we recommend looking at
          puzzles from other online hunts such as{" "}
          <Link
            href="https://galacticpuzzlehunt.com/"
            className="no-underline hover:underline"
          >
            Galactic Puzzle Hunt
          </Link>
          ,{" "}
          <Link
            href="https://teammatehunt.com/"
            className="no-underline hover:underline"
          >
            Teammate Hunt
          </Link>
          , or{" "}
          <Link
            href="https://puzzlepotluck.com/"
            className="no-underline hover:underline"
          >
            Puzzle Potluck
          </Link>
          .
        </p>
        <h2>When and where is this happening?</h2>
        <p>
          This year, Brown Puzzlehunt is offering three different ways to
          participate across two weekends. You can hunt in-person, hunt fully
          remotely, or purchase a Box.
        </p>
        <h3>In-Person Event</h3>
        <p>
          If you come to campus, you'll get to do events, physical puzzles,
          interactions, and the in-person runaround! The In-Person Event will
          run from {formatter.format(IN_PERSON.KICKOFF_TIME)} to{" "}
          {formatter.format(IN_PERSON.END_TIME)}, at{" "}
          <strong>Brown University</strong> in{" "}
          <strong>Providence, Rhode Island</strong>.
        </p>
        <p>
          <strong>All in-person participants </strong>
          need to print and fill out{" "}
          <Link
            href="https://studentactivities.brown.edu/sites/default/files/safety/Physical%20Activity%20Release.pdf"
            className="no-underline hover:underline"
          >
            this waiver
          </Link>{" "}
          ahead of time in order to come to campus. We will collect these at
          kickoff.
        </p>

        <h3>Remote Event</h3>
        <p>
          If you can't come to Brown's campus, you can do our online-only event.
          This runs from {formatter.format(REMOTE.START_TIME)} to{" "}
          {formatter.format(REMOTE.END_TIME)}. (This is a different weekend than
          the In-Person Event!)
        </p>
      </div>
    </div>
  );
}
