"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
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

type AreaChartProps = {
  title?: string | null;
  items: Array<{
    name: string;
    value: number;
    subtitle?: string;
  }>;
};

export function AreaChartComponent({ title, items }: AreaChartProps) {
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
          <AreaChart
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
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              fill="var(--color-value)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
