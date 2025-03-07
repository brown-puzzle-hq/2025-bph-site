"use client";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Stage, Container, Graphics } from "@pixi/react";
import { CirclePause, CirclePlay } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const WIDTH = 900;
const HEIGHT = 600;

export default function Game() {
  const [width, setWidth] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(1);

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

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);

  if (width === null) return null;

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
            <Container x={0} y={0}>
              <Graphics draw={drawWall} x={WIDTH / 4} y={0} />
              <Graphics draw={drawWall} x={(WIDTH * 3) / 4} y={0} />
              <Graphics draw={drawDoor} x={WIDTH / 4} y={HEIGHT / 3} />
              <Graphics draw={drawDoor} x={WIDTH / 4} y={(HEIGHT * 2) / 3} />

              {/* Guard */}
              <Graphics
                draw={(g) => {
                  g.clear();
                  g.beginFill(0xcce0ff); // Light blue
                  g.drawCircle(0, 0, 20);
                  g.endFill();
                  g.lineStyle(2, 0x000000);
                  g.drawCircle(0, 0, 20);
                }}
                x={WIDTH / 8}
                y={HEIGHT / 3}
              />
            </Container>
          </Stage>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <button
          onClick={() => setRunning(!running)}
          className="hover:opacity-85"
        >
          {running ? (
            <CirclePause className="size-16 rounded-md" />
          ) : (
            <CirclePlay className="size-16 rounded-md" />
          )}
        </button>
        <Slider
          className="w-48"
          defaultValue={[1]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setRate(value[0]!)}
        />
        <p className="text-xl w-9 font-mono">{rate}<span className="text-lg">x</span></p>
      </div>
    </div>
  );
}
