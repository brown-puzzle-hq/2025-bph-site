"use client";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import { Stage, Container, Graphics, useTick, Text } from "@pixi/react";
import { CirclePause, CirclePlay } from "lucide-react";

const WIDTH = 900;
const HEIGHT = 600;
const TTL = 100;

const EventComponent = ({
  running,
  rate,
}: {
  running: boolean;
  rate: number;
}) => {
  const [guards, setGuards] = useState<
    {
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      letter: string;
      ttl: number;
    }[]
  >([]);
  const elapsedTime = useRef(0);
  const guardId = useRef(0);

  const drawWall = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x000000);
    g.drawRect(-25, 0, 50, HEIGHT);
    g.endFill();
  }, []);

  const drawDoor = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x5a3a1a);
    g.drawRect(-25, -25, 50, 50);
    g.endFill();
  }, []);

  // Movement tick function
  useTick((delta) => {
    if (!running) return;

    elapsedTime.current += (delta / 60) * rate;

    if (elapsedTime.current >= 10) {
      console.log("New guard spawned!");
      elapsedTime.current = 0;
      setGuards((prev) => [
        ...prev,
        {
          id: guardId.current++,
          x: -20,
          y: Math.random() < 0.5 ? HEIGHT / 3 : (HEIGHT * 2) / 3,
          dx: 2,
          dy: 0,
          letter: "G",
          ttl: TTL,
        },
      ]);
    }

    // Move guards
    setGuards((prev) =>
      prev
        .map((guard) => {
          if (guard.x < (WIDTH * 3) / 4) {
            return { ...guard, x: guard.x + guard.dx, y: guard.y + guard.dy };
          } else {
            return { ...guard, x: (WIDTH * 3) / 4, ttl: guard.ttl - 1 };
          }
        })
        .filter((guard) => guard.ttl > 0),
    );
  });

  return (
    <Container>
      <Graphics draw={drawWall} x={WIDTH / 4} y={0} />
      <Graphics draw={drawWall} x={(WIDTH * 3) / 4} y={0} />
      <Graphics draw={drawDoor} x={WIDTH / 4} y={HEIGHT / 3} />
      <Graphics draw={drawDoor} x={WIDTH / 4} y={(HEIGHT * 2) / 3} />
      {guards.map((guard) => (
        <Container x={guard.x} y={guard.y}>
          <Graphics
            key={guard.id}
            draw={(g) => {
              g.clear();
              g.beginFill(guard.ttl == TTL ? 0xcce0ff : 0xffff00);
              g.drawCircle(0, 0, 20);
              g.endFill();
              g.lineStyle(2, 0x000000);
              g.drawCircle(0, 0, 20);
            }}
            alpha={guard.ttl / TTL}
          />
          {guard.ttl != TTL && <Text text={guard.letter} anchor={0.5} />}
        </Container>
      ))}
    </Container>
  );
};

export default function Game() {
  const [width, setWidth] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);

  if (width === null) return null;

  // TODO: determine cutoff
  if (width < 960) {
    return (
      <div className="max-w-3xl text-center">
        Note: this puzzle must be done on a computer
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-screen overflow-auto">
        {/* TODO: should the scroll behavior be more subtle and kick in later? */}
        <div className="flex justify-center" style={{ width: width }}>
          <Stage
            width={WIDTH}
            height={HEIGHT}
            className="rounded-md border-8 border-footer-bg"
            options={{ backgroundColor: 0xffffff }}
          >
            <EventComponent running={running} rate={rate} />
          </Stage>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setRunning(!running)}
          className="hover:opacity-85 focus:outline-none"
        >
          {running ? (
            <CirclePause className="size-16 rounded-md" />
          ) : (
            <CirclePlay className="size-16 rounded-md" />
          )}
        </button>
        <input
          type="range"
          className="w-48 [&::-webkit-slider-runnable-track]:rounded-xl [&::-webkit-slider-runnable-track]:bg-footer-bg"
          defaultValue={1}
          min={1}
          max={10}
          step={1}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <p className="w-9 font-mono text-xl">
          {rate}
          <span className="text-lg">x</span>
        </p>
      </div>
    </div>
  );
}
