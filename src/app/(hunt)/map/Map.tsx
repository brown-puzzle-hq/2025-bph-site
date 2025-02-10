"use client";
import "@pixi/events";
import { Stage, Container, Sprite } from "@pixi/react";
import { useMemo } from "react";
import { PuzzleBlock, PuzzleSection } from "./types";

export default function Map({
  puzzleIcons,
  puzzleBlocks,
  puzzleSections,
}: {
  puzzleIcons: PuzzleBlock[];
  puzzleBlocks: PuzzleBlock[];
  puzzleSections: PuzzleSection[];
}) {
  console.log("puzzleBlocks");
  console.log(puzzleBlocks);
  console.log("puzzleSections");
  console.log(puzzleSections);

  const scale = window.innerWidth / 1000;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const blockSize = 100 * scale;
  const backgroundUrl = "map/Map-Layout.jpeg";

  window.addEventListener("resize", () => { //not working??
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
  });

  // Initialize sprites
  const terrainSprites = useMemo(() => {
    const puzzleBlockSprites = puzzleBlocks.map(({ i, j, url, puzzleId }) => (
      <Sprite
        key={`${i}-${j}-block`}
        image={url}
        x={j * blockSize}
        y={i * blockSize}
        scale={scale}
        eventMode="dynamic"
      />
    ));

    const puzzleSectionSprites = puzzleSections.map(({ i, j, url }) => (
      <Sprite
        key={`${i}-${j}-section`}
        image={url}
        x={j * blockSize}
        y={i * blockSize}
        scale={scale}
        eventMode="dynamic"
      />
    ));
    return [...puzzleBlockSprites, ...puzzleSectionSprites];
  }, [puzzleBlocks, puzzleSections]);

  const iconSprites = useMemo(() => {
    const puzzleIconSprites = puzzleIcons.map(({ i, j, url, puzzleId }) => (
      <Sprite
        key={`${i}-${j}-icon`}
        image={url}
        x={j * blockSize}
        y={i * blockSize}
        scale={scale}
        eventMode="dynamic"
        pointerdown={() => onClick(`/puzzle/${puzzleId}`)} // Handle click event
        pointerover={(event) => onHover(event.currentTarget)} // Handle hover event
        pointerout={(event) => onHoverOut(event.currentTarget)}
      />
    ));
    return puzzleIconSprites;
  }, [puzzleIcons]);

  const onClick = (link: string) => {
    window.open(link, "_blank");
  };

  const onHover = (sprite: any) => {
    sprite.tint = 0xe72264; // Change the tint color on hover
    // sprite.scale.set(1.2); // Scale up the sprite on hover
  };

  const onHoverOut = (sprite: any) => {
    sprite.tint = 0xffffff; // Reset tint color
    // sprite.scale.set(1); // Reset scale
  };

  return (
    <Stage width={width} height={height} className="rounded-md border-8 border-slate-800">
      <Sprite image={backgroundUrl}></Sprite>
      <Container>{terrainSprites}</Container>
      <Container>{iconSprites}</Container>
    </Stage>
  );
}