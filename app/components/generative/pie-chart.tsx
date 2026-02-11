"use client";

import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type PieChartProps = {
  title?: string | null;
  items: Array<{
    name: string;
    value: number;
    subtitle?: string;
  }>;
};

export function PieChartComponent({ title, items }: PieChartProps) {
  if (!items.length) return null;

  const data = items.map((item, i) => ({
    name: item.name,
    value: item.value,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  const chartConfig = Object.fromEntries(
    items.map((item, i) => [
      item.name,
      {
        label: item.name,
        color: CHART_COLORS[i % CHART_COLORS.length],
      },
    ])
  ) satisfies ChartConfig;

  return (
    <Card className="overflow-hidden border-border/50">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <PieChart accessibilityLayer margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* 凡例 */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border/40 pt-4">
          {data.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: entry.fill }}
                aria-hidden
              />
              <span>{entry.name}</span>
              <span className="font-mono tabular-nums text-foreground">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
