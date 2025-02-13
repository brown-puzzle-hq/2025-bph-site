"use client";
import { useEffect, useState, useRef } from "react";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import Link from "next/link";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [angle, setAngle] = useState(0); // Angle for sine wave
  const spotlight1Ref = useRef(null); // First spotlight
  const spotlight2Ref = useRef(null); // Second spotlight

  useEffect(() => {
    let animationFrameId;

    const moveSpotlights = () => {
      if (spotlight1Ref.current && spotlight2Ref.current) {
        const screenWidth = window.innerWidth;

        // Spotlight 1 (Left to Right)
        const x1 = screenWidth / 2 + Math.sin(angle) * (screenWidth / 4);
        const y1 = 10 + Math.cos(angle) * 30; // Slight vertical movement
        const rotation1 = Math.sin(angle) * 15 + 90; // Arcing effect

        spotlight1Ref.current.style.transform = `translate(${x1 - 500}px, ${y1}px) rotate(${rotation1}deg)`;

        // Spotlight 2 (Right to Left, Opposite Movement)
        const x2 = screenWidth / 2 + Math.sin(-angle) * (screenWidth / 4);
        const y2 = 10 + Math.cos(-angle) * 30;
        const rotation2 = Math.sin(-angle) * 15 + 90;

        spotlight2Ref.current.style.transform = `translate(${x2 - 200}px, ${y2 + 50}px) rotate(${rotation2}deg)`;

        // Increase angle for next frame
        setAngle((prevAngle) => prevAngle + 0.01); // Adjust speed

        // Request next frame
        animationFrameId = requestAnimationFrame(moveSpotlights);
      }
    };

    animationFrameId = requestAnimationFrame(moveSpotlights);

    return () => cancelAnimationFrame(animationFrameId);
  }, [angle]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-screen overflow-hidden">
      <div className="relative h-[100vh] w-screen">
        {/* Absolute background with stars */}
        <div
          className="absolute inset-0 z-0 w-full bg-cover bg-top sm:h-[100vh] md:h-[150vh]"
          style={{
            backgroundImage: `url(/home/4.png)`,
            transform: `translateY(${scrollY * -0.1}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Back cityscape */}
        <div
          className="z-1 absolute inset-0 w-full bg-cover bg-top bg-no-repeat sm:h-[100vh] md:h-[150vh]"
          style={{
            backgroundImage: `url(/home/3.png)`,
            transform: `translateY(${scrollY * -0.3}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Middle cityscape with lamps */}
        <div
          className="absolute inset-0 z-[2] w-full bg-cover bg-top bg-no-repeat sm:h-[100vh] md:h-[150vh] lg:z-[3]"
          style={{
            backgroundImage: `url(/home/2.png)`,
            transform: `translateY(${scrollY * -0.5}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Spotlight */}
        <div
          ref={spotlight1Ref}
          className="absolute top-10 z-[0] h-[5vh] w-[10vw] bg-cover bg-top bg-no-repeat md:h-[20vh] md:w-[50vw]"
          style={{
            backgroundImage: `url(/home/Spotlight.PNG)`,
            transition: "transform 0.02s linear",
          }}
        />
        {/* Spotlight */}
        <div
          ref={spotlight2Ref}
          className="absolute top-10 z-[0] h-[20vh] w-[50vw] bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/Spotlight.PNG)`,
            transition: "transform 0.02s linear",
          }}
        />

        {/* Red overlay to cover background */}
        <div className="absolute bottom-0 z-[3] h-[105vh] w-screen translate-y-[55vh] bg-[#4e0000] md:h-[70vh] lg:z-[0] lg:z-[3]"></div>

        {/* Front theater building (stays above the red div) */}
        <div
          className="absolute inset-0 z-[4] w-full bg-cover bg-top bg-no-repeat sm:h-[100vh] md:h-[150vh] lg:h-[200vh]"
          style={{
            backgroundImage: `url(/home/1.png)`,
            transform: `translateY(${scrollY * -1}px)`,
            clipPath: `inset-0`,
          }}
        />
      </div>

      {/* Invisible clickable overlay */}
      <div
        className="absolute left-1/2 top-[47%] z-[6] h-[10vh] w-2/3 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * -1}px)`, // Apply dynamic Y shift
        }}
      >
        <Link
          href="/register"
          className="absolute left-0 top-0 h-full w-full"
        />
      </div>

      {/* Div right below the image */}
      <div className="relative z-[6] flex justify-center pt-[calc((100vw-850px)/8)]">
        <div className="relative flex w-[calc(60vw+200px)] p-4 text-center">
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
