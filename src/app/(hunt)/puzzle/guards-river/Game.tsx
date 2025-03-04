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
import { ArrowDown, ArrowUp, Skull, Trophy, Undo2 } from "lucide-react";

export type Item =
  | "guard_1"
  | "guard_2"
  | "door_1"
  | "door_2"
  | "cabbage"
  | "boat"
  | "player";
export type Location = "left" | "right" | "dead";
export type Coordinates = { x: number; y: number };

const SCALE = 0.75;
const WIDTH = 1200;
const HEIGHT = 800;
const HEAVEN: Coordinates = { x: WIDTH / 2, y: HEIGHT * 10 };
const BOATCAPACITY = 2;

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
  const [inBoat, setInBoat] = useState<Item[]>([]);
  const [moves, setMoves] = useState<Item[][]>([]);
  const [deaths, setDeaths] = useState<Item[][]>([]);
  const [result, setResult] = useState<string>("");
  const [cursor, setCursor] = useState<"default" | "pointer" | "not-allowed">(
    "pointer",
  );

  const [wolfGuard, setWolfGuard] = useState<
    "guard_1" | "guard_2" | "uncollapsed"
  >("uncollapsed");
  const [correctDoor, setCorrectDoor] = useState<
    "door_1" | "door_2" | "uncollapsed"
  >("uncollapsed");

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
    cabbage: { x: 1125, y: 375 },
    boat: { x: 650, y: 450 },
    player: { x: 850, y: 375 },
  };

  const onRightBoatOffset: Coordinates = { x: 400, y: -125 };

  const startLocation: Record<Item, Location> = {
    guard_1: "left",
    guard_2: "left",
    door_1: "left",
    door_2: "left",
    cabbage: "left",
    boat: "left",
    player: "left",
  };

  const [locations, setLocations] =
    useState<Record<Item, Location>>(startLocation);

  const getCoordinates = (key: Item) => {
    // If it is in the boat, set to same location as boat
    if (inBoat.includes(key)) {
      if (locations["boat"] === "left") {
        return {
          x: onLeftBoatCoordinates[key].x + 100 * inBoat.indexOf(key),
          y: onLeftBoatCoordinates[key].y,
        };
      } else {
        return {
          x:
            onLeftBoatCoordinates[key].x +
            onRightBoatOffset.x +
            100 * inBoat.indexOf(key),
          y: onLeftBoatCoordinates[key].y + onRightBoatOffset.y,
        };
      }
    } // Otherwise, set to the current location
    else if (locations[key] === "left") {
      return onLeftCoordinates[key];
    } else if (locations[key] === "right") {
      return onRightCoordinates[key];
    } else {
      return HEAVEN;
    }
  };

  const onClickItem = (sprite: any, key: Item) => {
    if (result) {
      return;
    }

    // If they are on the boat, get off the other shore
    if (inBoat.includes(key)) {
      setCursor("default");
      sprite.tint = 0xffffff;
      setInBoat((items) => items.filter((item) => item !== key));
    } // If they are off the boat but on the same shore, get on the boat
    else if (
      locations[key] === locations["boat"] &&
      inBoat.length < BOATCAPACITY
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
    const sourceSide = locations["boat"];

    // Change the location of boat and the moved items
    setLocations((prevLocations) => {
      // Get the new boat and player locations
      const newBoatLocation = sourceSide === "left" ? "right" : "left";
      const newPlayerLocation = newBoatLocation;

      // If they are on the boat, change their location
      const newLocations = Object.fromEntries(
        Object.entries(prevLocations).map(([key, value]) => {
          if (inBoat.includes(key as Item)) {
            return [key, value === "left" ? "right" : "left"];
          }
          return [key, value];
        }),
      ) as Record<Item, Location>;

      return {
        ...newLocations,
        boat: newBoatLocation,
        player: newPlayerLocation,
      };
    });

    // Set moved items in boat to none
    setInBoat([]);

    // Set deaths
    var newDeaths: Item[] = [];
    var newWolfGuard = wolfGuard;
    var newCorrectDoor = correctDoor;
    if (
      newWolfGuard === "uncollapsed"
        ? locations["guard_1"] === sourceSide ||
          locations["guard_2"] === sourceSide
        : locations[newWolfGuard as Item] === sourceSide
    ) {
      if (
        locations["guard_1"] === sourceSide &&
        locations["guard_2"] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard = "guard_1";
          newDeaths.push("guard_2");
        }
      }
      if (
        newCorrectDoor === "uncollapsed"
          ? locations["door_1"] === sourceSide ||
            locations["door_2"] === sourceSide
          : locations[newCorrectDoor as Item] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard =
            locations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor =
            locations["door_1"] === sourceSide ? "door_1" : "door_2";
        }
        newDeaths.push(newCorrectDoor as Item);
      }
    }
    if (
      newWolfGuard === "uncollapsed" &&
      (locations["guard_1"] === sourceSide ||
        locations["guard_2"] === sourceSide) &&
      locations[newCorrectDoor === "door_1" ? "door_2" : "door_1"] ===
        sourceSide
    ) {
      newWolfGuard =
        locations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
    }
    if (
      locations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
      sourceSide
    ) {
      if (
        locations["door_1"] === sourceSide &&
        locations["door_2"] === sourceSide
      ) {
        newCorrectDoor = "door_1";
        newDeaths.push("door_2");
      } else if (locations["door_1"] === sourceSide) {
        if (newCorrectDoor === "door_2") {
          newDeaths.push("door_1");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_1";
        }
      } else if (locations["door_2"] === sourceSide) {
        if (newCorrectDoor === "door_1") {
          newDeaths.push("door_2");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_2";
        }
      }
    }
    if (locations["cabbage"] === sourceSide) {
      if (
        locations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
        sourceSide
      ) {
        newDeaths.push("cabbage");
      }
      if (
        newWolfGuard === "uncollapsed" &&
        (locations["guard_1"] === sourceSide ||
          locations["guard_2"] === sourceSide)
      ) {
        newWolfGuard = Math.random() < 0.5 ? "guard_1" : "guard_2";
        if (
          locations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
        ) {
          newDeaths.push("cabbage");
        }
      }
    }
    setWolfGuard(newWolfGuard);
    setCorrectDoor(newCorrectDoor);

    // Kill the items
    setDeaths((prevDeaths) => [...prevDeaths, newDeaths]);
    setLocations(
      (prevLocations) =>
        Object.fromEntries(
          Object.entries(prevLocations).map(([key, value]) => {
            if (newDeaths.includes(key as Item)) {
              return [key, "dead"];
            }
            return [key, value];
          }),
        ) as Record<Item, Location>,
    );
  };

  const onHover = (sprite: any, key: Item) => {
    if (result) {
      setCursor("not-allowed");
      return;
    }

    if (
      key === "boat" ||
      inBoat.includes(key) ||
      (locations[key] === locations["boat"] && inBoat.length < BOATCAPACITY)
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
    setDeaths([]);
    setResult("");
    setLocations(startLocation);
  };

  const undo = () => {
    if (result) {
      return;
    }

    if (moves.length > 0) {
      const lastMove = moves.pop()!;
      const lastDeaths = deaths.pop()!;
      setInBoat([]);

      // Change the location of boat and the moved items
      setLocations((prevLocations) => {
        // Get the new boat and player locations
        const newBoatLocation = locations["boat"] === "left" ? "right" : "left";
        const newPlayerLocation = newBoatLocation;

        // If they are on the boat, change their location
        const newLocations = Object.fromEntries(
          Object.entries(prevLocations).map(([key, value]) => {
            if (lastMove.includes(key as Item)) {
              return [key, value === "left" ? "right" : "left"];
            }
            if (lastDeaths.includes(key as Item)) {
              return [key, newBoatLocation];
            }
            return [key, value];
          }),
        ) as Record<Item, Location>;

        return {
          ...newLocations,
          boat: newBoatLocation,
          player: newPlayerLocation,
        };
      });
    }
  };

  const handleSubmission = async () => {
    // TODO: use server action to verify moves, submit correct answer to puzzle, and set result
    setResult("Winning");
  };

  return (
    <div>
      <div className="flex space-x-4">
        {/* Moves */}
        <ScrollArea className="h-[600px] min-w-[11rem] rounded-md bg-footer-bg p-4">
          <Table className="w-44">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead
                  className="text-lg font-bold text-main-header"
                  colSpan={2}
                >
                  <div className="flex justify-between">
                    Moves
                    <Undo2
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
                <TableRow className="hover:bg-inherit" key={index}>
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
        <Stage
          width={WIDTH * SCALE}
          height={HEIGHT * SCALE}
          className="rounded-md border-8 border-footer-bg"
          style={{ cursor }}
        >
          <Sprite image={"river.png"} scale={2 * SCALE} />
          <Sprite
            image={"player.png"}
            eventMode="static"
            x={getCoordinates("player").x * SCALE}
            y={getCoordinates("player").y * SCALE}
            scale={0.22 * SCALE}
          />
          <Sprite
            image={"guard.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "guard_1")}
            pointerover={(event) => onHover(event.currentTarget, "guard_1")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="guard_1"
            x={getCoordinates("guard_1").x * SCALE}
            y={getCoordinates("guard_1").y * SCALE}
            scale={0.15 * SCALE}
          />
          <Sprite
            image={"guard.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "guard_2")}
            pointerover={(event) => onHover(event.currentTarget, "guard_2")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="guard_2"
            x={getCoordinates("guard_2").x * SCALE}
            y={getCoordinates("guard_2").y * SCALE}
            scale={0.15 * SCALE}
          />
          <Sprite
            image={"cabbage.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "cabbage")}
            pointerover={(event) => onHover(event.currentTarget, "cabbage")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="cabbage"
            x={getCoordinates("cabbage").x * SCALE}
            y={getCoordinates("cabbage").y * SCALE}
            scale={0.15 * SCALE}
          />
          <Sprite
            image={"door.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "door_1")}
            pointerover={(event) => onHover(event.currentTarget, "door_1")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="door_1"
            x={getCoordinates("door_1").x * SCALE}
            y={getCoordinates("door_1").y * SCALE}
            scale={0.4 * SCALE}
          />
          <Sprite
            image={"door.png"}
            eventMode="dynamic"
            pointerdown={(event) => onClickItem(event.currentTarget, "door_2")}
            pointerover={(event) => onHover(event.currentTarget, "door_2")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            key="door_2"
            x={getCoordinates("door_2").x * SCALE}
            y={getCoordinates("door_2").y * SCALE}
            scale={0.4 * SCALE}
          />
          <Sprite
            image={"boat.png"}
            eventMode="static"
            pointerdown={(event) => onClickBoat(event.currentTarget)}
            pointerover={(event) => onHover(event.currentTarget, "boat")}
            pointerout={(event) => onHoverOut(event.currentTarget)}
            x={getCoordinates("boat").x * SCALE}
            y={getCoordinates("boat").y * SCALE}
            scale={1.5 * SCALE}
            hitArea={new Rectangle(20, 50, 260, 80)}
          />
        </Stage>
        {/* Deaths */}
        <ScrollArea className="h-[600px] min-w-[11rem] rounded-md bg-footer-bg p-4">
          <Table className="w-44">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead
                  className="text-lg font-bold text-main-header"
                  colSpan={2}
                >
                  Deaths
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deaths.map((round, index) => (
                <TableRow className="hover:bg-inherit" key={index}>
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
      </div>
      <div className="flex justify-center space-x-4 py-4">
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
  );
}
