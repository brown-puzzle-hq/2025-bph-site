import fs from "fs";
import path from "path";
import { auth } from "~/server/auth/auth";
import { NextResponse } from "next/server";
import { canViewPuzzle } from "~/app/(hunt)/puzzle/actions";

export async function GET() {
  // Authentication
  const session = await auth();
  const viewStatus = await canViewPuzzle("heist", session);
  if (viewStatus !== "success") {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "(hunt)",
    "puzzle",
    "heist-ii",
    "heist-ii.html",
  );

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": "inline; filename=heist.html",
      },
    });
  } catch (error) {
    console.error("Error loading file.");
    return new NextResponse("Error");
  }
}
