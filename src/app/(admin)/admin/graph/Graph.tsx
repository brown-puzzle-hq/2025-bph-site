"use client";
import { useRef, useState, useMemo } from "react";
import ForceGraph from "react-force-graph-2d";
import { LinkObject, NodeObject } from "react-force-graph-2d";
import { PUZZLE_UNLOCK_MAP, ROUNDS } from "~/hunt.config";
import { CaseUpper, Waypoints, ScanSearch } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);

  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);
  const [hoverLinks, setHoverLinks] = useState(new Set<LinkObject>());
  const [clickNode, setClickNode] = useState<NodeObject | null>(null);
  const [clickHighlightNodes, setClickHighlightNodes] = useState(
    new Set<NodeObject>(),
  );
  const [clickLinks, setClickLinks] = useState(new Set<LinkObject>());

  const [showWords, setShowWords] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleNodeHover = (node: NodeObject | null) => {
    setHoverNode(node || null);
    const hoverLinks = new Set<LinkObject>();
    node?.links?.forEach((link: any) => hoverLinks.add(link));
    setHoverLinks(hoverLinks);
  };

  const handleNodeClick = (node: NodeObject | null) => {
    if (!node) {
      setClickNode(null);
      return;
    }
    setClickNode(node);
    setClickHighlightNodes(
      (prev) => new Set([...prev, ...[node], ...node.neighbors]),
    );
    setClickLinks((prev) => new Set([...prev, ...node.links]));
  };

  const handleNodeRender = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    // If showWords is OFF
    if (!showWords) {
      // Check if needs to be highlighted
      if (clickHighlightNodes.has(node)) {
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

      // Show words anyway on hover or click
      if (node === hoverNode || clickHighlightNodes.has(node)) {
        const label = node.name as string;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textWidth = ctx.measureText(label).width;
        const padding = 6;
        const textHeight = fontSize + padding * 2;
        const radius = 6;

        const x = node.x!;
        const y = node.y! - textHeight - 5;

        ctx.fillStyle = "rgba(50, 50, 50, 0.7)";
        ctx.beginPath();
        ctx.moveTo(x - textWidth / 2 - padding + radius, y); // Top-left
        ctx.lineTo(x + textWidth / 2 + padding - radius, y); // Top-right
        ctx.quadraticCurveTo(
          x + textWidth / 2 + padding,
          y,
          x + textWidth / 2 + padding,
          y + radius,
        );
        ctx.lineTo(x + textWidth / 2 + padding, y + textHeight - radius); // Bottom-right
        ctx.quadraticCurveTo(
          x + textWidth / 2 + padding,
          y + textHeight,
          x + textWidth / 2 + padding - radius,
          y + textHeight,
        );
        ctx.lineTo(x - textWidth / 2 - padding + radius, y + textHeight); // Bottom-left
        ctx.quadraticCurveTo(
          x - textWidth / 2 - padding,
          y + textHeight,
          x - textWidth / 2 - padding,
          y + textHeight - radius,
        );
        ctx.lineTo(x - textWidth / 2 - padding, y + radius); // Top-left
        ctx.quadraticCurveTo(
          x - textWidth / 2 - padding,
          y,
          x - textWidth / 2 - padding + radius,
          y,
        );
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(label, x, y + textHeight / 2);
      }
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
  };

  const handleSearch = () => {
    if (searchQuery === "") return;
    // Finds node by full id, then tries substring match
    const node =
      data.nodes.find((node) => node.id === searchQuery) ||
      data.nodes.find((node) => node.name.includes(searchQuery)) ||
      null;

    if (node && fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
    }
    handleNodeClick(node);
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
        d3VelocityDecay={0.2}
        // Visuals
        nodeRelSize={NODE_R}
        nodeLabel={() => ""} // Remove tooltip
        nodeAutoColorBy="round"
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        // Prevent moving after dragging
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        // Highlight nodes and links on hover or click
        onNodeHover={handleNodeHover}
        onNodeDrag={handleNodeHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => {
          setClickNode(null);
          setClickHighlightNodes(new Set());
          setClickLinks(new Set());
        }}
        // Draw nodes and links
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={handleNodeRender}
        linkWidth={(link) =>
          hoverLinks.has(link) || clickLinks.has(link) ? 5 : 1
        }
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          hoverLinks.has(link) || clickLinks.has(link) ? 4 : 0
        }
      />

      {/* Search */}
      <div className="absolute left-10 top-0 flex items-center space-x-2 rounded bg-white">
        <Input
          type="text"
          placeholder="Search by puzzle ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          Search
        </Button>
      </div>

      {/* Words and nodes toggle */}
      <button
        className="absolute left-10 top-12 rounded bg-orange-500 px-3 py-2 text-white hover:opacity-70"
        onClick={() => setShowWords((prev) => !prev)}
      >
        {showWords ? (
          <Waypoints className="size-5" />
        ) : (
          <CaseUpper className="size-5" />
        )}
      </button>

      {/* Zoom to Fit Button */}
      <button
        className="absolute left-24 top-12 rounded bg-emerald-600 px-3 py-2 text-white"
        onClick={() => fgRef.current?.zoomToFit(500)}
      >
        <ScanSearch className="size-5" />
      </button>
    </div>
  );
}
