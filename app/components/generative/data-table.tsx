"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataTableProps = {
  title?: string | null;
  columns: string[];
  rows: (string | number)[][];
};

export function DataTable({ title, columns, rows }: DataTableProps) {
  const reducedMotion = useReducedMotion();

  if (!columns.length || !rows.length) {
    return null;
  }

  return (
    <Card className="border-border/50">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="overflow-x-auto">
        <motion.table
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full min-w-[240px] border-collapse text-sm"
        >
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="border-b border-border bg-muted/50 px-4 py-2.5 text-left font-medium text-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-border/60 last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                {columns.map((_, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-2.5 text-muted-foreground tabular-nums"
                  >
                    {row[cellIdx] != null ? String(row[cellIdx]) : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </motion.table>
      </CardContent>
    </Card>
  );
}
