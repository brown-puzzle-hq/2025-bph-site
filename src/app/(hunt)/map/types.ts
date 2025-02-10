export type PuzzleSection = {
  i: number; // Row index
  j: number; // Column index
  url: string; // Image URL
};

export type PuzzleBlock = PuzzleSection & {
  puzzleId: string;
};

export type PuzzleSectionMap = Record<number, PuzzleSection[]>;
export type PuzzleBlockMap = Record<number, PuzzleBlock[]>;

export const numberToPuzzlePieces: Record<number, PuzzleSection[]> = {
  1: [{ i: 8, j: 3, url: "/map/WhitePawn.png" }],
  4: [{ i: 7, j: 1, url: "/map/BlackPawn.png" }],
  15: [
    { i: 7, j: 1, url: "/map/BlackPawn.png" },
    { i: 5, j: 4, url: "/map/Mushroom.png" }, // 5-2
  ],
  17: [{ i: 7, j: 1, url: "/map/BlackPawn.png" }],
  13: [{ i: 5, j: 4, url: "/map/Mushroom.png" }], // 2-6
  19: [{ i: 5, j: 4, url: "/map/Mushroom.png" }],
  16: [{ i: 3, j: 7, url: "/map/Mushroom.png" }],
  18: [{ i: 3, j: 7, url: "/map/Mushroom.png" }],
  22: [{ i: 3, j: 7, url: "/map/Mushroom.png" }],
};

export const numberToPuzzleBlock: Record<number, PuzzleSection> = {
  0: { i: 9, j: 0, url: "/map/block-9-0.png" },
  1: { i: 9, j: 3, url: "/map/block-9-3.png" },
  2: { i: 7, j: 0, url: "/map/block-7-0.png" },
  3: { i: 8, j: 5, url: "/map/block-8-5.png" },
  4: { i: 4, j: 0, url: "/map/block-4-0.png" },
  5: { i: 8, j: 7, url: "/map/block-8-7.png" },
  6: { i: 2, j: 0, url: "/map/block-2-0.png" },
  7: { i: 9, j: 9, url: "/map/block-9-9.png" },
  8: { i: 0, j: 1, url: "/map/block-0-1.png" },
  9: { i: 7, j: 6, url: "/map/block-7-6.png" },
  10: { i: 0, j: 5, url: "/map/block-0-5.png" },
  11: { i: 6, j: 8, url: "/map/block-6-8.png" },
  12: { i: 1, j: 3, url: "/map/block-1-3.png" },
  13: { i: 6, j: 4, url: "/map/block-6-4.png" },
  14: { i: 3, j: 4, url: "/map/block-3-4.png" },
  15: { i: 6, j: 2, url: "/map/block-6-2.png" },
  16: { i: 5, j: 6, url: "/map/block-5-6.png" },
  17: { i: 3, j: 1, url: "/map/block-3-1.png" },
  18: { i: 2, j: 8, url: "/map/block-2-8.png" },
  19: { i: 4, j: 3, url: "/map/block-4-3.png" },
  20: { i: 4, j: 9, url: "/map/block-4-9.png" },
  21: { i: 1, j: 7, url: "/map/block-1-7.png" },
  22: { i: 3, j: 5, url: "/map/block-3-5.png" },
  23: { i: 0, j: 9, url: "/map/block-0-9.png" },
};

export const numberToPuzzleIcon: Record<number, PuzzleSection> = {
  0: { i: 9, j: 0, url: "/map/block-9-0.png" },
  1: { i: 9, j: 3, url: "/map/PuzzlePiece.png" },
  2: { i: 7, j: 0, url: "/map/PuzzlePiece.png" },
  3: { i: 8, j: 5, url: "/map/PuzzlePiece.png" },
  4: { i: 4, j: 0, url: "/map/PuzzlePiece.png" },
  5: { i: 8, j: 7, url: "/map/PuzzlePiece.png" },
  6: { i: 2, j: 0, url: "/map/PuzzlePiece.png" },
  7: { i: 9, j: 9, url: "/map/PuzzlePiece.png" },
  8: { i: 0, j: 1, url: "/map/PuzzlePiece.png" },
  9: { i: 7, j: 6, url: "/map/PuzzlePiece.png" },
  10: { i: 0, j: 5, url: "/map/PuzzlePiece.png" },
  11: { i: 6, j: 8, url: "/map/PuzzlePiece.png" },
  12: { i: 1, j: 3, url: "/map/EyeTest.png" },
  13: { i: 6, j: 4, url: "/map/FireCorn.png" },
  14: { i: 3, j: 4, url: "/map/PuzzlePiece.png" },
  15: { i: 6, j: 2, url: "/map/PuzzlePiece.png" },
  16: { i: 5, j: 6, url: "/map/PuzzlePiece.png" },
  17: { i: 3, j: 1, url: "/map/PuzzlePiece.png" },
  18: { i: 2, j: 8, url: "/map/PuzzlePiece.png" },
  19: { i: 4, j: 3, url: "/map/PuzzlePiece.png" },
  20: { i: 4, j: 9, url: "/map/Crown.png" },
  21: { i: 1, j: 7, url: "/map/PuzzlePiece.png" },
  22: { i: 3, j: 5, url: "/map/PuzzlePiece.png" },
  23: { i: 0, j: 9, url: "/map/Gate.png" },
};

export const numberToPuzzleSections: PuzzleSectionMap = {
  0: [{ i: 8, j: 0, url: "/map/block-8-0.png" }],
  1: [
    { i: 9, j: 0, url: "/map/block-9-0.png" }, //backwards
    { i: 8, j: 3, url: "/map/block-8-3.png" },
    { i: 8, j: 0, url: "/map/block-8-0.png" }, //backwards
  ],
  2: [
    { i: 5, j: 0, url: "/map/block-5-0.png" },
    { i: 9, j: 0, url: "/map/block-9-0.png" }, //backwards
    { i: 8, j: 0, url: "/map/block-8-0.png" }, //backwards
  ],
  3: [
    { i: 8, j: 5, url: "/map/block-8-5.png" },
    // { i: 8, j: 3, url: "/map/block-8-6.png" }, //backwards
  ],
  4: [
    { i: 3, j: 0, url: "/map/block-3-0.png" },
    { i: 4, j: 1, url: "/map/block-4-1.png" },
    { i: 5, j: 0, url: "/map/block-5-0.png" }, //backwards
  ],
  5: [
    { i: 6, j: 5, url: "/map/block-6-5.png" },
    { i: 8, j: 5, url: "/map/block-8-6.png" }, //backwards
  ],
  6: [
    { i: 1, j: 0, url: "/map/block-1-0.png" },
    { i: 1, j: 1, url: "/map/block-1-1.png" },
    { i: 3, j: 0, url: "/map/block-3-0.png" }, //backwards
  ],
  7: [
    /* doesn't unlock anything */
    { i: 8, j: 5, url: "/map/block-8-5.png" }, //backwards REDUNDANT
  ],
  8: [
    { i: 0, j: 0, url: "/map/block-0-0.png" },
    { i: 0, j: 2, url: "/map/block-0-2.png" },
    { i: 1, j: 1, url: "/map/block-1-1.png" }, //backwards
  ],
  9: [
    { i: 7, j: 2, url: "/map/block-7-2.png" },
    // { i: 7, j: 2, url: "/map/block-6-5.png" }, //backwards
  ],
  10: [
    { i: 0, j: 6, url: "/map/block-0-0.png" },
    { i: 0, j: 2, url: "/map/block-0-0.png" }, //backwards
  ],
  11: [
    { i: 3, j: 7, url: "/map/block-3-7.png" },
    { i: 6, j: 5, url: "/map/block-6-5.png" }, //backwards
  ],
  12: [
    { i: 2, j: 2, url: "/map/block-2-2.png" },
    { i: 0, j: 2, url: "/map/block-0-2.png" }, //backwards
  ],
  13: [
    { i: 5, j: 2, url: "/map/block-5-2.png" },
    // { i: 7, j: 2, url: "/map/block-5-2.png" }, //backwards
    { i: 6, j: 5, url: "/map/block-6-5.png" }, //backwards
  ],
  14: [
    { i: 4, j: 4, url: "/map/block-4-4.png" },
    { i: 2, j: 2, url: "/map/block-2-2.png" }, //backwards
  ],
  15: [
    { i: 4, j: 1, url: "/map/block-4-1.png" },
    { i: 5, j: 2, url: "/map/block-5-2.png" }, //backwards
    { i: 7, j: 2, url: "/map/block-7-2.png" }, //backwards
  ],
  16: [
    { i: 2, j: 6, url: "/map/block-2-6.png" },
    { i: 4, j: 4, url: "/map/block-4-4.png" }, //backwards
  ],
  17: [
    { i: 2, j: 2, url: "/map/block-2-2.png" },
    { i: 4, j: 1, url: "/map/block-4-1.png" }, //backwards
  ],
  18: [
    { i: 3, j: 7, url: "/map/block-3-7.png" },
    { i: 2, j: 6, url: "/map/block-2-6.png" }, //backwards
  ],
  19: [
    { i: 2, j: 2, url: "/map/block-2-2.png" }, //could also be backwards?
    { i: 5, j: 2, url: "/map/block-5-2.png" }, //backwards
  ],
  20: [
    { i: 1, j: 8, url: "/map/block-1-8.png" },
    { i: 3, j: 7, url: "/map/block-3-7.png" }, //backwards
  ],
  21: [
    { i: 1, j: 6, url: "/map/block-1-6.png" },
    { i: 1, j: 8, url: "/map/block-1-8.png" }, //could be backwards
    { i: 0, j: 6, url: "/map/block-0-6.png" }, //could backwards
  ],
  22: [
    { i: 2, j: 6, url: "/map/block-2-6.png" },
    { i: 0, j: 2, url: "/map/block-0-2.png" },
  ],
  23: [
    { i: 0, j: 6, url: "/map/block-0-6.png" }, //REDUNDANT
  ],
};
