"use client";
import { useState } from "react";
import "@pixi/events";
import { Stage, Sprite } from "@pixi/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RIVER from "./river.png";
import PLAYER from "./player.png";
import GUARD from "./guard.png";
import CABBAGE from "./cabbage.png";
import DOOR from "./door.png";
import BOAT from "./boat.png";

export type Item =
  | "guard_1"
  | "guard_2"
  | "door_1"
  | "door_2"
  | "cabbage"
  | "boat"
  | "player";
export type Location = "left" | "right" | "dead";
type Coordinates = { x: number; y: number };

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
  const [collapses, setCollapses] = useState<Item[][]>([]);
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
    setCursor("default");
    sprite.tint = 0xffffff;

    // Set the moved items in the boat
    setMoves((prevMoves) => [...prevMoves, inBoat]);

    if (inBoat.includes("cabbage")) {
      setLocations((prevLocations) => {
        const newLocations = Object.fromEntries(
          Object.entries(prevLocations).map(([key, value]) => {
            if (inBoat.includes(key as Item)) {
              return [key, "dead"];
            }
            return [key, value];
          }),
        ) as Record<Item, Location>;
        return {
          ...newLocations,
          boat: "dead",
          player: "dead",
        };
      });
      setDeaths((prevDeaths) => [...prevDeaths, [...inBoat, "boat"]]);
      setResult("Cabbage");
      setInBoat([]);
      return;
    }

    const sourceSide = locations["boat"];

    // Change the location of boat and the moved items
    var newLocations: Record<Item, Location>;
    // Get the new boat and player locations
    const newBoatLocation = sourceSide === "left" ? "right" : "left";
    const newPlayerLocation = newBoatLocation;

    // If they are on the boat, change their location
    newLocations = Object.fromEntries(
      Object.entries(locations).map(([key, value]) => {
        if (inBoat.includes(key as Item)) {
          return [key, value === "left" ? "right" : "left"];
        }
        return [key, value];
      }),
    ) as Record<Item, Location>;

    newLocations = {
      ...newLocations,
      boat: newBoatLocation,
      player: newPlayerLocation,
    };

    // Set moved items in boat to none
    setInBoat([]);

    // Set deaths
    var newDeaths: Item[] = [];
    var newCollapses: Item[] = [];
    var newWolfGuard = wolfGuard;
    var newCorrectDoor = correctDoor;
    if (
      newWolfGuard === "uncollapsed"
        ? newLocations["guard_1"] === sourceSide ||
          newLocations["guard_2"] === sourceSide
        : newLocations[newWolfGuard] === sourceSide
    ) {
      if (
        newLocations["guard_1"] === sourceSide &&
        newLocations["guard_2"] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard = "guard_1";
          newCollapses.push(newWolfGuard);
        }
        newDeaths.push(newWolfGuard === "guard_1" ? "guard_2" : "guard_1");
      }
      if (
        newCorrectDoor === "uncollapsed"
          ? newLocations["door_1"] === sourceSide ||
            newLocations["door_2"] === sourceSide
          : newLocations[newCorrectDoor] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard =
            newLocations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
          newCollapses.push(newWolfGuard);
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor =
            newLocations["door_1"] === sourceSide ? "door_1" : "door_2";
          newCollapses.push(newCorrectDoor);
        }
        newDeaths.push(newCorrectDoor);
      }
    }
    if (
      newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
      sourceSide
    ) {
      if (
        newLocations["door_1"] === sourceSide &&
        newLocations["door_2"] === sourceSide
      ) {
        newCorrectDoor = "door_1";
        newCollapses.push(newCorrectDoor);
        newDeaths.push("door_2");
      } else if (newLocations["door_1"] === sourceSide) {
        if (newCorrectDoor === "door_2") {
          newDeaths.push("door_1");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_1";
          newCollapses.push(newCorrectDoor);
        }
      } else if (newLocations["door_2"] === sourceSide) {
        if (newCorrectDoor === "door_1") {
          newDeaths.push("door_2");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_2";
          newCollapses.push(newCorrectDoor);
        }
      }
    }
    if (newLocations["cabbage"] === sourceSide) {
      if (
        newWolfGuard !== "uncollapsed" &&
        newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
      ) {
        newDeaths.push("cabbage");
      }
      if (
        newWolfGuard === "uncollapsed" &&
        (newLocations["guard_1"] === sourceSide ||
          newLocations["guard_2"] === sourceSide)
      ) {
        newWolfGuard = Math.random() < 0.5 ? "guard_1" : "guard_2";
        newCollapses.push(newWolfGuard);
        if (
          newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
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
    setCollapses((prevCollapses) => [...prevCollapses, newCollapses]);

    setLocations(
      Object.fromEntries(
        Object.entries(newLocations).map(([key, value]) => {
          if (newDeaths.includes(key as Item)) {
            return [key, "dead"];
          }
          return [key, value];
        }),
      ) as Record<Item, Location>,
    );
  };

  const onHover = (sprite: any, key: Item) => {
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
    setWolfGuard("uncollapsed");
    setCorrectDoor("uncollapsed");
    setLocations(startLocation);
  };

  const undo = () => {
    if (result === "Cabbage") {
      setResult("");
    } else if (result) {
      setResult("");
      setLocations((prevLocations) => {
        return { ...prevLocations, player: prevLocations["boat"] };
      });
      return;
    }

    if (moves.length > 0) {
      const lastMove = moves.pop()!;
      const lastDeaths = deaths.pop()!;
      const lastCollapses = collapses.pop()!;
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

        if (
          lastCollapses.includes("guard_1" as Item) ||
          lastCollapses.includes("guard_2" as Item)
        ) {
          setWolfGuard("uncollapsed");
        }
        if (
          lastCollapses.includes("door_1" as Item) ||
          lastCollapses.includes("door_2" as Item)
        ) {
          setCorrectDoor("uncollapsed");
        }

        return {
          ...newLocations,
          boat: newBoatLocation,
          player: newPlayerLocation,
        };
      });
    }
  };

  const handleSubmission = async () => {};

  return (
    <div>
      <Stage
        width={WIDTH * SCALE}
        height={HEIGHT * SCALE}
        className="rounded-md border-8 border-footer-bg"
        style={{ cursor }}
      ></Stage>
    </div>
  );
}
