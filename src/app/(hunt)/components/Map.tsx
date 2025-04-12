"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { Stage, Container, Sprite, useApp } from "@pixi/react";
import { Round, ROUNDS } from "@/hunt.config";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

// Function to check if a sprite image exists
function spriteExists(image_url: string | URL) {
  // TODO: can remove later
  return true;
}

// Record of puzzle positions on the map
const positions: Record<string, [number, number]> = {
  "a-fistful-of-cards": [435, 309],
  "a-fistful-of-cards-ii": [540, 240],
  "a-fistful-of-cards-iii": [480, 650],
  "a-fistful-of-cards-iv": [650, 473],
  "aha-erlebnis": [470, 160],
  "are-you-sure": [490, 880],
  "balloon-animals": [290, 580],
  beads: [490, 230],
  "bluenos-puzzle-box": [653, 305],
  "boring-plot": [720, 365],
  "chain-letters": [400, 700],
  "color-transfer": [580, 560],
  constellation: [560, 390],
  "cutting-room-floor": [560, 490],
  "drop-the": [420, 413],
  "eye-of-the-storm": [760, 500],
  "eye-spy": [655, 705],
  "eye-to-eye": [534, 440],
  "filming-schedule": [440, 360],
  "financial-crimes-3": [691, 600],
  "find-ben": [380, 300],
  "fractal-shanty": [235, 505],
  "fridge-magnets": [517, 420],
  "galileo-was-wrong": [335, 540],
  "genetic-counseling": [620, 652],
  "hand-letters": [460, 730],
  heist: [390, 360],
  "heist-ii": [540, 150],
  "heist-iii": [440, 800],
  "identify-the-piece": [642, 390],
  imagine: [631, 270],
  "common-words": [540, 315],
  "m-guards-n-doors-and-k-choices": [658, 365],
  narcissism: [723, 550],
  barbie: [695, 398],
  "one-guard-screen": [378, 600],
  "opening-sequences": [430, 610],
  peanuts: [382, 445],
  piecemeal: [671, 435],
  "placeholder-i": [670, 480],
  "like-clockwork": [590, 400],
  plagiarism: [335, 460],
  "red-blue": [460, 510],
  "secret-ingredient": [610, 570],
  "six-degrees": [522, 700],
  "international-neighbors": [560, 780],
  "ten-guards-ten-doors": [480, 310],
  "the-compact-disc": [540, 620],
  "the-final-heist": [480, 550],
  "the-guard-and-the-door": [550, 650],
  "the-snack-zone": [636, 330],
  "two-guards-river": [342, 340],
  "two-guards-two-doors": [362, 262],
  "walk-of-fame": [406, 260],
  "watching-between-the-lines": [260, 370],
  "whats-my-ride": [670, 280],
  "youve-got-this-covered": [600, 220],
};

const DraggableMap = ({ children }: { children: React.ReactNode }) => {
  const app = useApp();
  const containerRef = useRef<any>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Set initial position and scale - start with a slight zoom in
    container.x = 0;
    container.y = 0;
    container.scale.set(1.2);
    scale.current = 1.2;

    // Setup event listeners for drag
    const onDragStart = (event: PointerEvent) => {
      const canvas = event.currentTarget as HTMLCanvasElement;
      const bounds = canvas.getBoundingClientRect();

      const mouseX = event.clientX - bounds.left;
      const mouseY = event.clientY - bounds.top;

      if (containerRef.current) {
        isDragging.current = true;
        lastPosition.current = { x: mouseX, y: mouseY };
        containerRef.current.cursor = "grabbing";
      }
    };

    const onDragMove = (event: PointerEvent) => {
      if (isDragging.current) {
        const canvas = event.currentTarget as HTMLCanvasElement;
        const container = containerRef.current;
        const bounds = canvas.getBoundingClientRect();

        const mouseX = event.clientX - bounds.left;
        const mouseY = event.clientY - bounds.top;

        const dx = mouseX - lastPosition.current.x;
        const dy = mouseY - lastPosition.current.y;

        container.x += dx;
        container.y += dy;

        lastPosition.current = { x: mouseX, y: mouseY };
      }
    };

    const onDragEnd = () => {
      isDragging.current = false;
      container.cursor = "grab";
    };

    // Setup wheel zoom
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Calculate zoom direction
      const zoomDirection = event.deltaY < 0 ? 1 : -1;
      const zoomFactor = 0.1;
      const newScale = Math.max(
        0.5,
        Math.min(3, scale.current + zoomDirection * zoomFactor),
      );

      // Get mouse position relative to the stage
      const rect = (app.view as HTMLCanvasElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calculate mouse position relative to container before scaling
      const pointBeforeScale = {
        x: (x - container.x) / scale.current,
        y: (y - container.y) / scale.current,
      };

      // Update scale
      container.scale.set(newScale);
      scale.current = newScale;

      // Calculate the new position to keep mouse in same place
      container.x = x - pointBeforeScale.x * newScale;
      container.y = y - pointBeforeScale.y * newScale;
    };

    // Configure container for interactions
    container.eventMode = "static";
    container.cursor = "grab";
    container.interactive = true;

    // Add event listeners
    // container.on("pointerdown", onDragStart);
    // app.stage.on("pointermove", onDragMove);
    // app.stage.on("pointerup", onDragEnd);
    // app.stage.on("pointerupoutside", onDragEnd);

    // Add wheel listener to the canvas
    const canvasElement = app.view as HTMLCanvasElement;
    canvasElement.addEventListener("wheel", onWheel);

    canvasElement.addEventListener("pointerdown", onDragStart);
    canvasElement.addEventListener("pointermove", onDragMove);
    canvasElement.addEventListener("pointerup", onDragEnd);
    canvasElement.addEventListener("pointerupoutside", onDragEnd);

    return () => {
      // Clean up event listeners
      // container.off("pointerdown", onDragStart);
      // app.stage.off("pointermove", onDragMove);
      // app.stage.off("pointerup", onDragEnd);
      // app.stage.off("pointerupoutside", onDragEnd);
      canvasElement.removeEventListener("wheel", onWheel);
    };
  }, [app]);

  return <Container ref={containerRef}>{children}</Container>;
};

export default function Map({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
}: {
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
  availableRounds: Round[];
}) {
  const [hoveredPuzzle, setHoveredPuzzle] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Map width and height
  const WIDTH = 1000;
  const HEIGHT = 1000;

  // Get available round names - moved outside of render to avoid recalculations every render
  const availableRoundNames = availableRounds.map(({ name }) => name);

  // Create mapping of round name to image path - moved outside of render
  const layouts = ROUNDS.reduce(
    (acc, { name }) => {
      acc[name] = availableRoundNames.includes(name)
        ? `${name}.png`
        : `${name}Gray.png`;
      return acc;
    },
    {} as Record<string, string>,
  );

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Memoize event handlers to prevent recreating on each render
  const handleMarkerClick = useCallback((puzzleId: string) => {
    window.open(`puzzle/${puzzleId}`, "_blank");
  }, []);

  const handleMarkerHover = useCallback((puzzleName: string) => {
    setHoveredPuzzle(puzzleName);
  }, []);

  const handleMarkerLeave = useCallback(() => {
    setHoveredPuzzle(null);
  }, []);

  // Memoize the zoom button handlers
  const handleZoomIn = useCallback(() => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: -100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  }, []);

  return (
    <div className="relative h-[calc(100vh-56px-32px)] w-screen overflow-hidden focus:outline-none">
      <Stage
        width={WIDTH}
        height={HEIGHT}
        options={{
          backgroundColor: 0xffffff,
          resolution: window.devicePixelRatio || 1,
          antialias: true,
          eventMode: "static",
        }}
        className="overflow-hidden"
      >
        <DraggableMap>
          {/* Background layout images with lower z-index */}
          <Container zIndex={0}>
            <Sprite
              image="/map/Layout.png"
              width={WIDTH}
              height={HEIGHT}
              x={0}
              y={0}
            />

            {Object.entries(layouts).map(([name, path]) => (
              <Sprite
                key={name}
                image={`/${path}`} // TODO: move into map folder
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
              />
            ))}
          </Container>

          {/* Puzzle markers with higher z-index */}
          <Container zIndex={1}>
            {availablePuzzles.map((puzzle) => {
              const position = positions[puzzle.id] ?? [180, 500];
              const isSolved = solvedPuzzles.some(
                (sp) => sp.puzzleId === puzzle.id,
              );
              const spriteUrl = spriteExists(
                `map/sprites-outlined/${puzzle.id}.png`,
              )
                ? `/map/sprites-outlined/${puzzle.id}.png`
                : isSolved
                  ? `/map/sprites-outlined/bookmark-check.svg`
                  : `/map/sprites/done/puzzle.svg`;

              return (
                <Container
                  key={puzzle.id}
                  x={position[0]}
                  y={position[1]}
                  eventMode="static"
                  cursor="pointer"
                  pointerdown={(e) => {
                    e.stopPropagation();
                    handleMarkerClick(puzzle.id);
                  }}
                  pointerover={() => handleMarkerHover(puzzle.name)}
                  pointerout={handleMarkerLeave}
                >
                  <Sprite
                    image={spriteUrl}
                    anchor={0.5}
                    scale={isSolved ? 0.15 : 0.12}
                    alpha={isSolved ? 0.8 : 1}
                  />
                </Container>
              );
            })}
          </Container>
        </DraggableMap>
      </Stage>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
          aria-label="Zoom In"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
          aria-label="Zoom Out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>

      {/* Tooltip for hovered puzzle */}
      {hoveredPuzzle && (
        <div
          className="pointer-events-none absolute z-50 rounded bg-black px-2 py-1 text-white"
          style={{
            left: `${Math.min(window.innerWidth - 100, mousePosition.x + 10)}px`,
            top: `${Math.min(window.innerHeight - 50, mousePosition.y + 10)}px`,
          }}
        >
          {hoveredPuzzle}
        </div>
      )}

      {/* Help text */}
      <div className="absolute bottom-4 left-4 z-50 rounded-md bg-white bg-opacity-75 p-2 text-sm">
        <p>Drag to pan. Scroll to zoom.</p>
      </div>
    </div>
  );
}
