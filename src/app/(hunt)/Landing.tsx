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
    <div className="relative h-full w-screen overflow-hidden bg-purple-950">
      {/* absolute background with stars */}
      <div
        className="absolute inset-0 h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(/home/4.png)`,
          transform: `translateY(${scrollY * -0.1}px)`,
        }}
      />

      {/* Back cityscape */}
      <div
        className="absolute inset-0 h-screen w-full bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(/home/3.png)`,
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      />

      {/* Middle cityscape with lamps */}
      <div
        className="absolute inset-0 h-screen w-full bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(/home/2.png)`,
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      />

      {/* Front theater building */}
      <div
        className="absolute inset-0 h-screen w-full bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(/home/1.png)`,
          transform: `translateY(${scrollY * -1}px)`,
        }}
      />
    </div>
  );
}
