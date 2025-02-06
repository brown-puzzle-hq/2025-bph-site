"use client";
import { useEffect, useState } from "react";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import Link from "next/link";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex w-screen justify-center overflow-hidden h-[150vh]">
      <div className="relative w-full h-full">
        {/* Absolute background with stars */}
        <img
          src="/home/4.png"
          className="absolute top-[0vh] h-auto w-full"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />

        {/* Back cityscape */}
        <img
          src="/home/3.png"
          className="absolute top-[2vh] h-auto w-full"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        />

        {/* Middle cityscape with lamps */}
        <img
          src="/home/2.png"
          className="absolute top-[5vh] h-auto w-full"
          style={{ transform: `translateY(${scrollY * -0.6}px)` }}
        />

        {/* Front theater building (stays above the red div) */}
        <img
          src="/home/1.png"
          className="absolute top-[9vh] h-auto w-full"
          style={{ transform: `translateY(${scrollY * -1}px)` }}
        />

        {/* Invisible clickable overlay */}
        <div
          className="absolute rounded-md bg-black opacity-0 hover:opacity-5"
          style={{
            top: `calc(11.25vh + 34vw)`,
            left: "35%",
            width: "30%",
            height: "5vw",
            transform: `translateY(${scrollY * -1}px)`,
            pointerEvents: "auto",
          }}
        >
          <Link href="/register" className="absolute h-full w-full" />
        </div>

        {/* Div right below the image */}
        <div
          className="absolute flex justify-center text-center"
          style={{
            top: `calc(80vw)`,
            left: "20%",
            width: "60%",
            transform: `translateY(${scrollY * -1}px)`,
            pointerEvents: "auto",
          }}
        >
          <div className="absolute left-1/2 top-[-50px] -translate-x-1/2 transform">
            <Link
              href="/register"
              className="rounded-md bg-main-text px-8 py-3 text-lg font-semibold text-secondary-text transition duration-200 hover:bg-secondary-accent"
            >
              Register!
            </Link>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>What?</h1>
            <p>
              The third annual puzzlehunt by current Brown and RISD students.
            </p>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>When?</h1>
            <p>
              In-Person:{" "}
              <span>
                {formatter.format(IN_PERSON.START_TIME)} –{" "}
                {formatter.format(IN_PERSON.END_TIME)}
              </span>
            </p>
            <p className="mt-2">
              Remote:{" "}
              <span>
                {formatter.format(REMOTE.START_TIME)} –{" "}
                {formatter.format(REMOTE.END_TIME)}
              </span>
            </p>
            <p className="mt-2">
              <Link href="/info" className="no-underline hover:underline">
                <i>What do you mean, there are two weekends?</i>
              </Link>
            </p>
          </div>
          <div className="z-5 w-1/3 p-2 md:p-4">
            <h1>Who?</h1>
            <p>
              Anyone can come to campus. (Just tell us so we know you're
              coming!)
            </p>
            <p className="z-5 mt-2">Anyone can get a Box.</p>
            <p className="z-5 mt-2">
              <Link href="/info" className="no-underline hover:underline">
                <i>Box? What box?</i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
