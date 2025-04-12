"use client";

import { useState, useEffect, useRef } from "react";
import { Stage, Container, Sprite, useApp } from "@pixi/react";
import { Round, ROUNDS } from "@/hunt.config";
import { ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import "@pixi/events";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

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

const DraggableMap = React.forwardRef<any, { children: React.ReactNode; initialX?: number; initialY?: number }>(
  ({ children, initialX = 0, initialY = 0 }, ref) => {
    const app = useApp();
    const containerRef = useRef<any>(null);
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });
    const scale = useRef(2);

    // Forward the containerRef to the parent component through the ref
    useEffect(() => {
      if (ref && containerRef.current) {
        if (typeof ref === "function") {
          ref(containerRef.current);
        } else {
          ref.current = containerRef.current;
        }
      }
    }, [ref, containerRef.current]);

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // Initialize position with provided coordinates
      container.x = initialX;
      container.y = initialY;
      container.scale.set(2);
      scale.current = 2;

      const onDragStart = (event: PointerEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (container) {
          isDragging.current = true;
          lastPosition.current = { x: mouseX, y: mouseY };
        }
      };

      const onDragMove = (event: PointerEvent) => {
        if (isDragging.current) {
          const container = containerRef.current;

          const mouseX = event.clientX;
          const mouseY = event.clientY;

          const dx = mouseX - lastPosition.current.x;
          const dy = mouseY - lastPosition.current.y;

          container.x += dx;
          container.y += dy;

          lastPosition.current = { x: mouseX, y: mouseY };
        }
      };

      const onDragEnd = () => {
        isDragging.current = false;
      };

      // Setup wheel zoom
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();

        // Calculate zoom direction
        const zoomDirection = event.deltaY < 0 ? 1 : -1;
        const zoomFactor = 0.05;
        const newScale = Math.max(
          1.5,
          Math.min(5, scale.current + zoomDirection * zoomFactor),
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

      // Add event listeners
      const canvasElement = app.view as HTMLCanvasElement;
      canvasElement.addEventListener("wheel", onWheel);
      canvasElement.addEventListener("pointerdown", onDragStart);
      canvasElement.addEventListener("pointermove", onDragMove);
      canvasElement.addEventListener("pointerup", onDragEnd);
      canvasElement.addEventListener("pointerout", onDragEnd);

      return () => {
        // Clean up event listeners
        canvasElement.removeEventListener("wheel", onWheel);
        canvasElement.removeEventListener("pointerdown", onDragStart);
        canvasElement.removeEventListener("pointermove", onDragMove);
        canvasElement.removeEventListener("pointerup", onDragEnd);
        canvasElement.removeEventListener("pointerout", onDragEnd);
      };
    }, [app, initialX, initialY]);

    return <Container ref={containerRef}>{children}</Container>;
  },
);

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
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [cleanClick, setCleanClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof availablePuzzles>(
    [],
  );
  const pixiContainerRef = useRef<any>(null);

  // Map width and height (needed for proportions of map assets)
  const WIDTH = 1000;
  const HEIGHT = 1000;

  // Calculate initial map position based on available puzzles
  const calculateCentroid = () => {
    if (availablePuzzles.length === 0) return { x: 0, y: 0 };
    
    let sumX = 0;
    let sumY = 0;
    let count = 0;
    
    availablePuzzles.forEach(puzzle => {
      const position = positions[puzzle.id];
      if (position) {
        sumX += position[0];
        sumY += position[1];
        count++;
      }
    });
    
    if (count === 0) return { x: 0, y: 0 };
    
    // Calculate the center of available puzzles
    const centerX = sumX / count;
    const centerY = sumY / count;
    
    // Return offset needed to center this point on the screen
    return {
      x: stageSize.width / 2 - centerX * 2, // Scale of 2 is applied to container
      y: stageSize.height / 2 - centerY * 2
    };
  };

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

  // Update stage size when container size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initial size
    updateSize();

    // Update on resize
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCleanClick(false);
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredPuzzles = availablePuzzles.filter(
      (puzzle) =>
        puzzle.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        puzzle.id.toLowerCase().includes(lowerCaseSearchTerm),
    );

    setSearchResults(filteredPuzzles);
  }, [searchTerm, availablePuzzles]);

  // Function to focus on a puzzle
  const focusOnPuzzle = (puzzleId: string) => {
    if (!pixiContainerRef.current) return;

    const position = positions[puzzleId];
    if (!position) return;

    const [x, y] = position;
    const container = pixiContainerRef.current;

    // Center the puzzle on screen
    const scale = container.scale.x;
    container.x = stageSize.width / 2 - x * scale;
    container.y = stageSize.height / 2 - y * scale;

    // Clear search after focusing
    setSearchTerm("");
  };

  const handleZoomIn = () => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: -100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  };

  const handleZoomOut = () => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-56px-32px)] w-screen overflow-hidden"
    >
      {/* Search bar */}
      <div className="absolute left-2 top-2 z-10 w-64">
        <div className="relative">
          <div className="flex h-10 items-center rounded-md bg-main-bg shadow-md">
            <input
              type="text"
              placeholder="Search puzzles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-1 w-full rounded-md border-0 bg-transparent p-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mr-2.5 text-white/70 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute mt-1 max-h-60 w-full space-y-2 overflow-auto rounded-md bg-main-bg/90 p-2 shadow-lg">
              {searchResults.map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => focusOnPuzzle(puzzle.id)}
                  className="ml-1 flex w-full items-center text-left text-sm text-white hover:text-opacity-80"
                >
                  <span className="truncate">{puzzle.name}</span>
                  {solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id) && (
                    <span className="ml-auto mr-1 text-xs text-green-400">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {stageSize.width > 0 && stageSize.height > 0 && (
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          options={{
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
          }}
        >
          <DraggableMap 
            ref={pixiContainerRef}
            initialX={calculateCentroid().x}
            initialY={calculateCentroid().y}
          >
            <Container>
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

            <Container>
              {availablePuzzles.map((puzzle) => {
                const position = positions[puzzle.id] ?? [180, 500];
                const isSolved = solvedPuzzles.some(
                  (sp) => sp.puzzleId === puzzle.id,
                );
                const spriteUrl = `map/sprites-outlined/${puzzle.id}.png`;

                // TODO: style solved sprites differently? Alpha?
                return (
                  <Sprite
                    key={puzzle.id}
                    image={spriteUrl}
                    x={position[0]}
                    y={position[1]}
                    interactive
                    cursor="pointer"
                    anchor={0.5}
                    scale={0.075}
                    pointerdown={() => {
                      setCleanClick(true);
                    }}
                    pointerup={() => {
                      if (cleanClick) {
                        setCleanClick(false);
                        window.open(`puzzle/${puzzle.id}`, "_blank");
                      }
                    }}
                    pointerover={() => setHoveredPuzzle(puzzle.name)}
                    pointerout={() => setHoveredPuzzle(null)}
                  />
                );
              })}
            </Container>
          </DraggableMap>
        </Stage>
      )}
      {/* Zoom controls */}
      <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="rounded-md bg-main-bg p-2 shadow-md hover:bg-[#554370]"
        >
          <ZoomIn />
        </button>
        <button
          onClick={handleZoomOut}
          className="rounded-md bg-main-bg p-2 shadow-md hover:bg-[#554370]"
        >
          <ZoomOut />
        </button>
      </div>
      {/* Tooltip for hovered puzzle */}
      {hoveredPuzzle && (
        <div
          className="pointer-events-none absolute z-10 rounded bg-black/80 px-2 py-1 text-sm text-white"
          style={{
            left: `${Math.min(window.innerWidth - 100, mousePosition.x + 2)}px`,
            top: `${Math.min(window.innerHeight - 50, mousePosition.y - 28 - 56)}px`,
          }}
        >
          {hoveredPuzzle}
        </div>
      )}
    </div>
  );
}
