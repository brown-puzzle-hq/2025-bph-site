"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import ForceGraph from "react-force-graph-2d";
import { LinkObject, NodeObject } from "react-force-graph-2d";
import { PUZZLE_UNLOCK_MAP, ROUNDS } from "~/hunt.config";

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);

  const [highlightNodes, setHighlightNodes] = useState(new Set<NodeObject>());
  const [highlightLinks, setHighlightLinks] = useState(new Set<LinkObject>());
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);
  const [showWords, setShowWords] = useState(true);

  const handleNodeHover = (node: NodeObject | null) => {
    const newHighlightNodes = new Set<NodeObject>();
    const newHighlightLinks = new Set<LinkObject>();

    if (node) {
      newHighlightNodes.add(node);
      node.neighbors?.forEach((neighbor: any) =>
        newHighlightNodes.add(neighbor),
      );
      node.links?.forEach((link: any) => newHighlightLinks.add(link));
    }

    setHoverNode(node || null);
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
  };

  const handleLinkHover = (link: LinkObject | null) => {
    const newHighlightNodes = new Set<NodeObject>();
    const newHighlightLinks = new Set<LinkObject>();

    if (link) {
      newHighlightLinks.add(link);
      newHighlightNodes.add(link.source as NodeObject);
      newHighlightNodes.add(link.target as NodeObject);
    }

    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
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

  // Auto-zoom to fit the graph
  // useEffect(() => {
  //   if (fgRef.current) {
  //     setTimeout(() => {
  //       fgRef.current.zoomToFit(500);
  //     }, 300);
  //   }
  // }, []);

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
        // Highlight nodes and links on hover
        onNodeHover={handleNodeHover}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          // If showWords is OFF
          if (!showWords) {
            // Check if needs to be highlighted
            if (highlightNodes.has(node)) {
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
              ctx.fillStyle = node === hoverNode ? "red" : "orange";
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
        onLinkHover={handleLinkHover}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 4 : 0
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
