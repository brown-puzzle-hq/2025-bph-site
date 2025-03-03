import { db } from "@/db/index";
import { columns } from "./components/team-table/Columns";
import { TeamTable } from "./components/team-table/TeamTable";

export const fetchCache = "force-no-store";

export default async function Home() {
  const data = await db.query.teams.findMany();

  return (
    // FYI container is important don't be like Alex and spend an hour debugging after removing it
    <div className="container mb-4 md:mb-12">
      <h1 className="mb-2 text-center w-screen">Teams</h1>
      <TeamTable columns={columns} data={data} />
    </div>
  );
}
