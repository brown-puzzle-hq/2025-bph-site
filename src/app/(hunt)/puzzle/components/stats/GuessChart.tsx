"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type GuessChartItem = {
  guess: string;
  count: number;
};

type GuessCharProps = {
  data: GuessChartItem[];
  puzzleAnswer: string;
};

export default function GuessChart({ data, puzzleAnswer }: GuessCharProps) {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Count",
          color: "#CBC3E3",
        },
      }}
      className="min-h-[400px]"
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 20,
        }}
      >
        <CartesianGrid
          horizontal={false}
          vertical={true}
          strokeDasharray="3 3"
        />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#faf7fd" }}
        />
        <YAxis
          dataKey="guess"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={80}
          tick={({ payload, x, y, textAnchor }) => {
            const text = payload.value as string;
            const maxLineLength = 15; // <-- max characters per line
            const lines = [];

            for (let i = 0; i < text.length; i += maxLineLength)
              lines.push(text.slice(i, i + maxLineLength));

            // Highlight the correct guess
            if (payload.value === puzzleAnswer) {
              const padding = 20;
              const boxWidth =
                Math.min(puzzleAnswer.length, maxLineLength) * 9 + padding;
              const boxHeight = 24 * lines.length;
              const boxX = x - boxWidth + padding / 2;
              const boxY = y - boxHeight / 2;

              const textX = x - padding / 2;

              return (
                <g>
                  {/* Background rectangle */}
                  <rect
                    x={boxX - padding / 2}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    fill="#CBC3E3"
                  />
                  {/* White text */}
                  <text
                    x={x}
                    y={y}
                    fill="#452c63"
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    {lines.map((line, index) => (
                      <tspan
                        key={index}
                        x={textX}
                        dy={index === 0 ? "0" : "1.2em"} // move next lines down
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            }

            // Normal case
            return (
              <text
                x={x}
                y={y}
                fill="#CBC3E3"
                textAnchor={textAnchor}
                dominantBaseline="central"
                fontSize={14}
              >
                {lines.map((line, index) => (
                  <tspan
                    key={index}
                    x={x}
                    dy={index === 0 ? "0" : "1.2em"} // move next lines down
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            );
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="count"
          fill="#CBC3E3"
          barSize={100}
          label={({ x, y, width, height, value }) => {
            const padding = 10;
            return (
              <text
                x={x + width - padding} // inside the right side of the bar
                y={y + height / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#452c63"
                fontSize={18}
                fontWeight="bold"
              >
                {value}
              </text>
            );
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}
