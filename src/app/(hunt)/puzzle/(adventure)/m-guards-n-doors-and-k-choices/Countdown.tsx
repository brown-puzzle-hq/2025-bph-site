"use client";

import { Clock } from "lucide-react";
import React, { useState, useEffect, MouseEventHandler } from "react";

export function Countdown({
  targetDate,
  callBack,
}: {
  targetDate: Date;
  callBack: MouseEventHandler;
}) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { minutes: 0, seconds: 0 };
    }

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0)
    return (
      <button
        onClick={callBack}
        className="text w-fit rounded-md bg-orange-900 px-3 py-1.5 font-semibold hover:opacity-80"
      >
        Retry
      </button>
    );

  return (
    <div className="flex space-x-2">
      <Clock />
      <p className="font-mono">
        {String(timeRemaining.minutes).padStart(2, "0")}:
        {String(timeRemaining.seconds).padStart(2, "0")}
      </p>
    </div>
  );
}

export default Countdown;
