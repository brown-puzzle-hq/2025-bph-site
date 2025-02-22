"use client";
import { useState } from "react";
import { queryDatabase } from "./actions";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";

export default function Page() {
  const [query, setQuery] = useState("SELECT * FROM bph_site_team;");
  const [result, setResult] = useState<any>(null);

  async function executeQuery() {
    try {
      const res = await queryDatabase(query);
      setResult(res);
    } catch (error) {
      console.error("SQL Execution Error:", error);
      setResult({ error: "Failed to execute query." });
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">SQL Query Executor</h1>
      <p className="mb-4 text-gray-600">
        Enter an SQL query below and execute it against the database.
      </p>

      {/* SQL Query Input Box */}
      <pre>
        <AutosizeTextarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border bg-gray-50 p-2 text-gray-800"
          rows={4}
          placeholder="Write your SQL query here..."
        />
      </pre>

      {/* Execute Button */}
      <Button
        onClick={executeQuery}
        className="mt-3 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-500"
      >
        Execute SQL
      </Button>

      {result && (
        <div className="mt-8 w-full rounded border">
          <Tabs defaultValue="emails">
            <TabsList className="mt-2 bg-inherit">
              <TabsTrigger
                value="emails"
                className="rounded-lg data-[state=active]:bg-inherit data-[state=active]:text-inherit data-[state=active]:underline data-[state=active]:decoration-blue-500 data-[state=active]:decoration-2 data-[state=active]:shadow-none"
              >
                Emails
              </TabsTrigger>
              <TabsTrigger
                value="raw"
                className="rounded-lg data-[state=active]:bg-inherit data-[state=active]:text-inherit data-[state=active]:underline data-[state=active]:decoration-blue-500 data-[state=active]:decoration-2 data-[state=active]:shadow-none"
              >
                Raw SQL
              </TabsTrigger>
            </TabsList>

            {/* Raw SQL*/}
            <TabsContent value="raw" className="w-full">
              <div className="bg-gray-100 p-4">
                <pre className="text-wrap text-sm text-gray-800">{result}</pre>
              </div>
            </TabsContent>

            {/* Display Emails Result */}
            <TabsContent value="emails" className="w-screen">
              <pre className="text-wrap text-sm text-gray-800">
                <div className="p-4">
                  {JSON.parse(result)?.rows?.[0]?.members
                    ? JSON.parse(result).rows.map((row: any) =>
                        JSON.parse(row.members).map(
                          ([name, email]: [string, string]) => `${email}\n`,
                        ),
                      )
                    : "No emails found."}
                </div>
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
