"use client";
import { useEffect, useState } from "react";

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
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-purple-950">
      {/* Absolute background with stars */}
      <img
        src="/home/4.png"
        alt="stars background"
        className="absolute inset-0 w-full h-auto"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
        }}
      />

      {/* Back cityscape */}
      <img
        src="/home/3.png"
        alt="back cityscape"
        className="absolute inset-0 w-full h-auto"
        style={{
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      />

      {/* Middle cityscape with lamps */}
      <img
        src="/home/2.png"
        alt="middle cityscape with lamps"
        className="absolute inset-0 w-full h-auto"
        style={{
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      />

      {/* Front theater building */}
      <img
        src="/home/1.png"
        alt="front theater building"
        className="absolute inset-0 w-full h-auto"
        style={{
          transform: `translateY(${scrollY * -1}px)`,
        }}
      />
    </div>
  );
}