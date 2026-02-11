"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CardItem = {
  id: string;
  title: string;
  description: string;
  badges?: string[];
  links?: Array<{ label: string; url: string }>;
};

type CardGridProps = {
  title?: string | null;
  cards: CardItem[];
};

export function CardGrid({ title, cards }: CardGridProps) {
  const reducedMotion = useReducedMotion();

  if (!cards.length) return null;

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold">{title}</h3>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <motion.article
            key={card.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className="overflow-hidden border-border/50 transition-shadow hover:shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{card.title || "無題"}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {card.description || "—"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {card.badges && card.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {card.badges.map((b) => (
                      <Badge key={b} variant="secondary">{b}</Badge>
                    ))}
                  </div>
                )}
                {card.links && card.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {card.links.map((link) => (
                      <Button key={link.url} asChild size="sm" variant="outline">
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
