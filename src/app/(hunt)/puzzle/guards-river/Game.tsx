"use client";
import { useState } from "react";
import "@pixi/events";
import { Stage, Sprite } from "@pixi/react";
import { Rectangle } from "@pixi/math";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Skull, Trophy, Undo } from "lucide-react";

export type Item =
  | "guard_1"
  | "guard_2"
  | "door_1"
  | "door_2"
  | "cabbage"
  | "boat"
  | "player";
export type Location = "left" | "right";
export type Coordinates = { x: number; y: number };
export type Position = {
  location: Location;
  coordinates: Coordinates;
};

function clean(round: string[]) {
  if (round.length) {
    return round
      .map((item) => {
        const index = item.indexOf("_");
        const start = index !== -1 ? item.slice(0, index) : item;
        return start.charAt(0).toUpperCase() + start.slice(1);
      })
      .join(" + ");
  } else {
    return "None";
  }
}

export default function Game() {
  const scale = 0.75;
  // TODO: set sizing
  const width = 1200;
  const height = 800;

  const boatCapacity = 2;
  const [inBoat, setInBoat] = useState<Item[]>([]);
  const [moves, setMoves] = useState<Item[][]>([]);
  const [result, setResult] = useState<string>("");
  const [cursor, setCursor] = useState<"default" | "pointer" | "not-allowed">(
    "pointer",
  );

  // TODO: a lot of these coordinates can probably be defined relative to each other
  // i.e. to get from onleftboat to onrightboat, just define an offset?

  const onLeftCoordinates: Record<Item, Coordinates> = {
    guard_1: { x: 50, y: 500 },
    guard_2: { x: 150, y: 450 },
    door_1: { x: 250, y: 425 },
    door_2: { x: 350, y: 450 },
    cabbage: { x: 450, y: 550 },
    boat: { x: 250, y: 575 },
    player: { x: 450, y: 500 },
  };

  const onLeftBoatCoordinates: Record<Item, Coordinates> = {
    guard_1: { x: 325, y: 525 },
    guard_2: { x: 325, y: 525 },
    door_1: { x: 325, y: 525 },
    door_2: { x: 325, y: 525 },
    cabbage: { x: 325, y: 625 },
    boat: { x: 0, y: 0 }, // This is not used
    player: { x: 0, y: 0 }, // This is not used
  };

  const onRightCoordinates: Record<Item, Coordinates> = {
    guard_1: { x: 775, y: 250 },
    guard_2: { x: 875, y: 200 },
    door_1: { x: 975, y: 175 },
    door_2: { x: 1075, y: 200 },
    cabbage: { x: 1175, y: 300 },
    boat: { x: 650, y: 450 },
    player: { x: 850, y: 375 },
  };

  const onRightBoatCoordinates: Record<Item, Coordinates> = {
    guard_1: { x: 725, y: 400 },
    guard_2: { x: 725, y: 400 },
    door_1: { x: 725, y: 400 },
    door_2: { x: 725, y: 400 },
    cabbage: { x: 725, y: 500 },
    boat: { x: 0, y: 0 }, // This is not used
    player: { x: 0, y: 0 }, // This is not used
  };

  const startPosition: Record<Item, Position> = {
    guard_1: { location: "left", coordinates: onLeftCoordinates["guard_1"] },
    guard_2: { location: "left", coordinates: onLeftCoordinates["guard_2"] },
    door_1: { location: "left", coordinates: onLeftCoordinates["door_1"] },
    door_2: { location: "left", coordinates: onLeftCoordinates["door_2"] },
    cabbage: { location: "left", coordinates: onLeftCoordinates["cabbage"] },
    boat: { location: "left", coordinates: onLeftCoordinates["boat"] },
    player: { location: "left", coordinates: onLeftCoordinates["player"] },
  };

  const [positions, setPositions] =
    useState<Record<Item, Position>>(startPosition);

  const getPosition = (key: Item) => {
    // If it is in the boat, set to same location as boat
    if (inBoat.includes(key)) {
      if (positions["boat"]!.location === "left") {
        return {
          x: onLeftBoatCoordinates[key].x + 100 * inBoat.indexOf(key),
          y: onLeftBoatCoordinates[key].y,
        };
      } else {
        return {
          x: onRightBoatCoordinates[key].x + 100 * inBoat.indexOf(key),
          y: onRightBoatCoordinates[key].y,
        };
      }
    } // Otherwise, set to the current location
    else if (positions[key]!.location === "left") {
      return onLeftCoordinates[key];
    } else {
      return onRightCoordinates[key];
    }
  };

  const onClickItem = (sprite: any, key: Item) => {
    if (result) {
      return;
    }

    const itemPosition = positions[key]!;
    const boatPosition = positions["boat"]!;

    // If they are on the boat, get off the other shore
    if (inBoat.includes(key)) {
      setCursor("default");
      sprite.tint = 0xffffff;
      setInBoat((items) => items.filter((item) => item !== key));
    } // If they are off the boat but on the same shore, get on the boat
    else if (
      itemPosition.location === boatPosition.location &&
      inBoat.length < boatCapacity
    ) {
      setCursor("default");
      sprite.tint = 0xffffff;
      setInBoat((items) => [...items, key]);
    }
  };

  const onClickBoat = (sprite: any) => {
    if (result) {
      return;
    }

    setCursor("default");
    sprite.tint = 0xffffff;

    // Set the moved items in the boat
    setMoves((prevMoves) => [...prevMoves, inBoat]);

    // Change the position of boat and the moved items
    setPositions((prevPositions) => {
      // Get the new boat position
      const newBoatPosition: Position =
        positions["boat"]!.location === "left"
          ? { location: "right", coordinates: onRightCoordinates["boat"] }
          : { location: "left", coordinates: onLeftCoordinates["boat"] };

      // Get the new player position
      const newPlayerPosition: Position =
        positions["player"]!.location === "left"
          ? { location: "right", coordinates: onRightCoordinates["player"] }
          : { location: "left", coordinates: onLeftCoordinates["player"] };

      // If they are on the boat, change their location
      const newPositions = Object.fromEntries(
        Object.entries(prevPositions).map(([key, value]) => {
          if (inBoat.includes(key as Item)) {
            const newLocation = value.location === "left" ? "right" : "left";
            return [key as Item, { ...value, location: newLocation }];
          }
          return [key as Item, value];
        }),
      ) as Record<Item, Position>;

      return {
        ...newPositions,
        boat: newBoatPosition,
        player: newPlayerPosition,
      };
    });

    // Set moved items in boat to none
    setInBoat([]);
  };

  const onHover = (sprite: any, key: Item) => {
    if (result) {
      setCursor("not-allowed");
      return;
    }

    const itemPosition = positions[key]!;
    const boatPosition = positions["boat"]!;

    if (
      key === "boat" ||
      inBoat.includes(key) ||
      (itemPosition.location === boatPosition.location &&
        inBoat.length < boatCapacity)
    ) {
      setCursor("pointer");
      sprite.tint = 0xcbd5e1;
    } else {
      setCursor("not-allowed");
    }
  };

  const onHoverOut = (sprite: any) => {
    setCursor("default");
    sprite.tint = 0xffffff;
  };

  const handleRestart = () => {
    setInBoat([]);
    setMoves([]);
    setResult("");
    setPositions(startPosition);
  };

  const undo = () => {
    if (result) {
      return;
    }

    if (moves.length > 0) {
      const lastMove = moves.pop()!;
      setInBoat([]);

      // Change the position of boat and the moved items
      setPositions((prevPositions) => {
        // Get the new boat location
        const newBoatPosition: Position =
          positions["boat"]!.location === "left"
            ? { location: "right", coordinates: onRightCoordinates["boat"] }
            : { location: "left", coordinates: onLeftCoordinates["boat"] };

        const newPlayerPosition: Position =
          positions["player"]!.location === "left"
            ? { location: "right", coordinates: onRightCoordinates["player"] }
            : { location: "left", coordinates: onLeftCoordinates["player"] };

        // If they are on the boat, change their location
        const newPositions = Object.fromEntries(
          Object.entries(prevPositions).map(([key, value]) => {
            if (lastMove.includes(key as Item)) {
              const newLocation = value.location === "left" ? "right" : "left";
              return [key as Item, { ...value, location: newLocation }];
            }
            return [key as Item, value];
          }),
        ) as Record<Item, Position>;

        return {
          ...newPositions,
          boat: newBoatPosition,
          player: newPlayerPosition,
        };
      });
    }
  };

  const handleSubmission = async () => {
    // TODO: use server action to verify moves, submit correct answer to puzzle, and set result
    setResult("Winning");
  };

  return (
    <div className="flex space-x-4">
      {/* Moves */}
      <ScrollArea className="h-[520] min-w-[11rem] rounded-md p-4">
        <Table className="w-[225px]">
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead
                className="text-lg font-bold text-main-text"
                colSpan={2}
              >
                <div className="flex justify-between">
                  Moves
                  <Undo
                    className={
                      !moves.length || !!result
                        ? "cursor-not-allowed rounded-md opacity-50"
                        : "cursor-pointer rounded-md hover:opacity-75"
                    }
                    onClick={undo}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {moves.map((round, index) => (
              <TableRow
                className="hover:bg-inherit"
                key={index}
              >
                <TableCell className="w-0 font-bold">
                  {index % 2 ? (
                    <ArrowDown className="h-4" />
                  ) : (
                    <ArrowUp className="h-4" />
                  )}
                </TableCell>
                <TableCell className="font-bold">{clean(round)}</TableCell>
              </TableRow>
            ))}
            {result && (
              <TableRow>
                <TableCell className="font-bold">
                  {result === "Winning" ? (
                    <Trophy className="h-4" />
                  ) : (
                    <Skull className="h-4" />
                  )}
                </TableCell>
                <TableCell className="font-bold">{result}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {/* Game */}
      <div>
        <Stage
          width={width * scale}
          height={height * scale}
          className="rounded-md border-8"
          style={{ cursor }}
        >
          <Sprite image={"river.png"} scale={2 * scale} />
          <Sprite
            image={"player.png"}
            eventMode="static"
            x={getPosition("player").x * scale}
            y={getPosition("player").y * scale}
            scale={0.22 * scale}
          />
          <Sprite
            image={"guard.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "guard_1")}
            pointerover={(event) => onHover(event.currentTarget, "guard_1")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="guard_1"
            x={getPosition("guard_1").x * scale}
            y={getPosition("guard_1").y * scale}
            scale={0.15 * scale}
          />
          <Sprite
            image={"guard.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "guard_2")}
            pointerover={(event) => onHover(event.currentTarget, "guard_2")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="guard_2"
            x={getPosition("guard_2").x * scale}
            y={getPosition("guard_2").y * scale}
            scale={0.15 * scale}
          />
          <Sprite
            image={"cabbage.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "cabbage")}
            pointerover={(event) => onHover(event.currentTarget, "cabbage")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="cabbage"
            x={getPosition("cabbage").x * scale}
            y={getPosition("cabbage").y * scale}
            scale={0.15 * scale}
          />
          <Sprite
            image={"door.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "door_1")}
            pointerover={(event) => onHover(event.currentTarget, "door_1")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="door_1"
            x={getPosition("door_1").x * scale}
            y={getPosition("door_1").y * scale}
            scale={0.4 * scale}
          />
          <Sprite
            image={"door.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "door_2")}
            pointerover={(event) => onHover(event.currentTarget, "door_2")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="door_2"
            x={getPosition("door_2").x * scale}
            y={getPosition("door_2").y * scale}
            scale={0.4 * scale}
          />
          <Sprite
            image={"boat.png"}
            eventMode="static"
            pointerdown={(event) => onClickBoat(event.currentTarget)}
            pointerover={(event) => onHover(event.currentTarget, "boat")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            x={getPosition("boat").x * scale}
            y={getPosition("boat").y * scale}
            scale={1.5 * scale}
            hitArea={new Rectangle(20, 50, 260, 80)}
          />
        </Stage>
        <div className="flex space-x-4 py-4">
          <Button
            className="font-bold"
            disabled={!moves.length || !!result}
            onClick={handleSubmission}
          >
            Enter Door
          </Button>
          <Button
            className="font-bold text-secondary-accent"
            disabled={!moves.length}
            variant="outline"
            onClick={handleRestart}
          >
            Restart
          </Button>
        </div>
      </div>
    </div>
  );
}
