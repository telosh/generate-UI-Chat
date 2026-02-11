"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type LineChartProps = {
  title?: string | null;
  items: Array<{
    name: string;
    value: number;
    subtitle?: string;
  }>;
};

export function LineChartComponent({ title, items }: LineChartProps) {
  if (!items.length) return null;

  const data = items.map((item) => ({
    name: item.name,
    value: item.value,
    fill: "var(--color-value)",
  }));

  const chartConfig = {
    value: {
      label: "値",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-border/50">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={{ fill: "var(--color-value)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
