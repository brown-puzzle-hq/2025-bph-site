"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import ForceGraph from "react-force-graph-2d";
import { LinkObject, NodeObject } from "react-force-graph-2d";
import { PUZZLE_UNLOCK_MAP, ROUNDS } from "~/hunt.config";

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);

  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);
  const [hoverHighlightNodes, setHoverHighlightNodes] = useState(
    new Set<NodeObject>(),
  );
  const [hoverLinks, setHoverLinks] = useState(new Set<LinkObject>());

  const [clickNode, setClickNode] = useState<NodeObject | null>(null);
  const [clickHighlightNodes, setClickHighlightNodes] = useState(
    new Set<NodeObject>(),
  );
  const [clickLinks, setClickLinks] = useState(new Set<LinkObject>());

  const [showWords, setShowWords] = useState(true);

  const handleNodeHover = (node: NodeObject | null) => {
    const hoverHighlightNodes = new Set<NodeObject>();
    const hoverLinks = new Set<LinkObject>();

    if (node) {
      hoverHighlightNodes.add(node);
      node.neighbors?.forEach((neighbor: any) =>
        hoverHighlightNodes.add(neighbor),
      );
      node.links?.forEach((link: any) => hoverLinks.add(link));
    }

    setHoverNode(node || null);
    setHoverHighlightNodes(hoverHighlightNodes);
    setHoverLinks(hoverLinks);
  };

  const nodes = useMemo(() => {
    return Object.keys(PUZZLE_UNLOCK_MAP).map((puzzle) => ({
      id: puzzle,
      name: puzzle,
      round: ROUNDS.find((round) => round.puzzles.includes(puzzle)),
      neighbors: [],
      links: [],
    })) as NodeObject[];
  }, []);

  const links = useMemo(() => {
    return Object.entries(PUZZLE_UNLOCK_MAP).flatMap(([puzzle, adjPuzzles]) =>
      adjPuzzles.map((adjPuzzle) => ({
        source: puzzle,
        target: adjPuzzle,
      })),
    ) as LinkObject[];
  }, []);

  const data = useMemo(() => {
    const gData = { nodes, links };

    // Cross-link nodes
    gData.links.forEach((link: LinkObject) => {
      const a = gData.nodes.find((n) => n.id === link.source);
      const b = gData.nodes.find((n) => n.id === link.target);
      if (!a || !b) return;

      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    return gData;
  }, [nodes, links]);

  const handleNodeClick = (node: NodeObject | null) => {
    const clickHighlightNodes = new Set<NodeObject>();
    const clickLinks = new Set<LinkObject>();

    if (node) {
      clickHighlightNodes.add(node);
      node.neighbors?.forEach((neighbor: any) =>
        clickHighlightNodes.add(neighbor),
      );
      node.links?.forEach((link: any) => clickLinks.add(link));
    }

    setClickNode(node || null);
    setClickHighlightNodes(clickHighlightNodes);
    setClickLinks(clickLinks);
  };

  return (
    <div className="relative h-screen w-full">
      <ForceGraph
        ref={fgRef}
        graphData={data}
        width={800}
        height={600}
        cooldownTicks={50}
        autoPauseRedraw={false}
        // Visuals
        nodeRelSize={NODE_R}
        nodeAutoColorBy="round"
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        // Highlight nodes and links on hover or click
        onNodeHover={handleNodeHover}
        onNodeDrag={handleNodeHover}
        onNodeClick={handleNodeClick}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // If showWords is OFF
          if (!showWords) {
            // Check if needs to be highlighted
            if (
              hoverHighlightNodes.has(node) ||
              clickHighlightNodes.has(node)
            ) {
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
              ctx.fillStyle =
                node === hoverNode || node == clickNode ? "red" : "orange";
              ctx.fill();
            }

            // Default circle
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, NODE_R, 0, 2 * Math.PI, false);
            ctx.fill();
            return;
          }

          // If showWords is ON, draw text
          const label = node.name as string;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x!, node.y!);
        }}
        linkWidth={(link) =>
          hoverLinks.has(link) || clickLinks.has(link) ? 5 : 1
        }
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          hoverLinks.has(link) || clickLinks.has(link) ? 4 : 0
        }
      />

      {/* Hide Words Button */}
      <button
        className="absolute left-4 top-4 rounded bg-gray-700 px-3 py-2 text-white"
        onClick={() => setShowWords((prev) => !prev)}
      >
        {showWords ? "Hide Words" : "Show Words"}
      </button>

      {/* Zoom to Fit Button */}
      <button
        className="absolute right-4 top-4 rounded bg-blue-500 px-3 py-2 text-white"
        onClick={() => fgRef.current?.zoomToFit(500)}
      >
        Zoom to Fit
      </button>
    </div>
  );
}
