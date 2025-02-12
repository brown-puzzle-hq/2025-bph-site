import { HintWithRelations } from "~/app/(admin)/admin/hints/components/hint-table/Columns";

export interface HintEmailTemplateProps {
  hint: HintWithRelations;
  response: string;
}

export const HintEmailTemplate: React.FC<Readonly<HintEmailTemplateProps>> = ({
  hint,
  response,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      color: "#333 !important",
    }}
  >
    <p style={{ marginTop: "0" }}>Hi {hint.team.displayName},</p>

    <p>
      Your hint request for <strong>{hint.puzzle.name}</strong> has been
      answered.
    </p>

    <p>
      <strong>Request:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #ccc",
        background: "#f9f9f9",
      }}
    >
      {hint.request}
    </blockquote>

    <p>
      <strong>Response:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #4caf50",
        background: "#f1f8e9",
      }}
    >
      {response}
    </blockquote>

    <p>
      You can view it at{" "}
      <a
        href={`https://www.brownpuzzlehunt.com/puzzle/${hint.puzzleId}/hint`}
        style={{ color: "#1a73e8", textDecoration: "none", fontWeight: "bold" }}
      >
        https://www.brownpuzzlehunt.com/puzzle/{hint.puzzleId}/hint
      </a>
      .
    </p>

    <p style={{ marginBottom: "0" }}>
      Happy hunting,
      <br />
      Puzzle HQ
    </p>
  </div>
);
