"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import { Round, ROUNDS } from "@/hunt.config";

// Sprite cache for better performance
const spriteCache: Record<string, any> = {};

// Puzzle positions - unchanged
const positions: Record<string, L.LatLngExpression> = {
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
  "barbie": [695, 398],
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

// Type definitions
type Puzzle = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
};

type PuzzleList = Puzzle[];

// Direct Leaflet marker implementation to ensure markers appear
function PuzzleMarkers({
  puzzles,
  solvedPuzzleIds,
}: {
  puzzles: PuzzleList;
  solvedPuzzleIds: Set<string>;
}) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  // Clear any existing markers
  useEffect(() => {
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => {
          if (marker) {
            marker.remove();
          }
        });
        markersRef.current = [];
      }
    };
  }, []);

  // Add markers to the map
  useEffect(() => {
    // Clean up previous markers first
    markersRef.current.forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    markersRef.current = [];

    // Create new markers
    puzzles.forEach(puzzle => {
      const pos = positions[puzzle.id];
      if (!pos) return;

      try {
        // Determine icon URL based on puzzle status
        const iconUrl = solvedPuzzleIds.has(puzzle.id)
          ? `/map/sprites-outlined/${puzzle.id}.png`
          : `/map/sprites-outlined/${puzzle.id}.png`
        // : `/map/sprites-outlined/puzzle.svg`;

        // Create icon
        const icon = new L.Icon({
          iconUrl,
          iconSize: [100, 100],
          iconAnchor: [50, 100],
        });

        // Create and add marker
        const marker = L.marker(pos, { icon })
          .addTo(map)
          .bindTooltip(puzzle.name)
          .on('click', () => {
            window.open(`puzzle/${puzzle.id}`, "_blank");
          });

        // Store for cleanup
        markersRef.current.push(marker);
      } catch (error) {
        console.error(`Error creating marker for puzzle ${puzzle.id}:`, error);
      }
    });
  }, [map, puzzles, solvedPuzzleIds]);

  return null;
}

// Try WebGL markers using useEffect-based approach
function WebGLMarkers({
  puzzles,
  solvedPuzzleIds,
  enabled = false,  // Disabled by default until we debug issues
}: {
  puzzles: PuzzleList;
  solvedPuzzleIds: Set<string>;
  enabled?: boolean;
}) {
  const map = useMap();
  const pixiContainerRef = useRef<any>(null);
  const pixiLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !window.L || !(window.L as any).pixiOverlay) {
      console.log('PixiOverlay not available or disabled');
      return;
    }

    // If we have Leaflet and Pixi, try to set up the WebGL renderer
    try {
      // Use global PIXI from Leaflet.PixiOverlay
      const PIXI = (window as any).PIXI;
      if (!PIXI) {
        console.error('PIXI not found in window object');
        return;
      }

      // Create a new PIXI Application for rendering
      const pixiContainer = new PIXI.Container();
      pixiContainerRef.current = pixiContainer;

      // Create and add the PixiOverlay
      const pixiLayer = (L as any).pixiOverlay(function (utils: any) {
        const zoom = map.getZoom();
        const container = utils.getContainer();
        const renderer = utils.getRenderer();
        const project = utils.latLngToLayerPoint;

        // Clear previous sprites
        container.children.length = 0;

        // Add sprites for each puzzle
        puzzles.forEach((puzzle) => {
          const pos = positions[puzzle.id];
          if (!pos) return;

          // Project the position to pixel coordinates
          const point = project(pos);

          // Create sprite
          const isSolved = solvedPuzzleIds.has(puzzle.id);
          const sprite = new PIXI.Sprite(
            PIXI.Texture.from(isSolved
              ? `/map/sprites-outlined/${puzzle.id}.png`
              : `/map/sprites-outlined/${puzzle.id}.png`
              // : `/map/sprites-outlined/puzzle.svg`
            )
          );

          // Position and scale sprite
          sprite.x = point.x;
          sprite.y = point.y;
          sprite.anchor.set(0.5, 1.0);
          sprite.scale.set(0.5 + (zoom / 10));

          container.addChild(sprite);
        });

        renderer.render(container);
      });

      pixiLayerRef.current = pixiLayer;
      pixiLayer.addTo(map);

    } catch (error) {
      console.error('Error setting up PixiOverlay:', error);
    }

    // Cleanup on unmount
    return () => {
      if (pixiLayerRef.current) {
        try {
          map.removeLayer(pixiLayerRef.current);
        } catch (e) {
          console.error('Error removing PixiLayer:', e);
        }
      }
      pixiLayerRef.current = null;
      pixiContainerRef.current = null;
    };
  }, [map, puzzles, solvedPuzzleIds, enabled]);

  return null;
}

export default function Map({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
}: {
  availablePuzzles: PuzzleList;
  solvedPuzzles: { puzzleId: string }[];
  availableRounds: Round[];
}) {
  const bounds = new LatLngBounds([0, 0], [1000, 1000]);

  // Memoize for better performance
  const solvedPuzzleIds = useMemo(
    () => new Set(solvedPuzzles.map(sp => sp.puzzleId)),
    [solvedPuzzles]
  );

  // Memoize layouts
  const availableRoundNames = availableRounds.map(({ name }) => name);
  const layouts = useMemo(
    () => ROUNDS.reduce(
      (acc, { name }) => {
        acc[name] = availableRoundNames.includes(name)
          ? `/${name}.png`
          : `/${name}Gray.png`;
        return acc;
      },
      {} as Record<string, string>
    ),
    [availableRoundNames]
  );

  return (
    <MapContainer
      center={[500, 500]}
      zoom={2}
      minZoom={-1.25}
      maxZoom={3.5}
      maxBounds={bounds}
      crs={L.CRS.Simple}
      preferCanvas={true}
      scrollWheelZoom={true}
      markerZoomAnimation={false}
      zoomAnimation={false}
      fadeAnimation={false}
      attributionControl={false}
      style={{ background: "white", zIndex: 10 }}
      className="h-[calc(100vh-56px-32px)] w-screen focus:outline-none"
    >
      {/* Background map layers */}
      <ImageOverlay url="/map/Layout.png" bounds={bounds} />
      <ImageOverlay url={layouts.Drama!} bounds={bounds} />
      <ImageOverlay url={layouts.Reality!} bounds={bounds} />
      <ImageOverlay url={layouts.Comedy!} bounds={bounds} />
      <ImageOverlay url={layouts.Adventure!} bounds={bounds} />

      {/* Use standard Leaflet markers first to guarantee they appear */}
      <PuzzleMarkers
        puzzles={availablePuzzles}
        solvedPuzzleIds={solvedPuzzleIds}
      />

      {/* Keep the WebGL implementation but disable it for now */}
      <WebGLMarkers
        puzzles={availablePuzzles}
        solvedPuzzleIds={solvedPuzzleIds}
        enabled={false}
      />
    </MapContainer>
  );
}
