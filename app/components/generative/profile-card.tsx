"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProfileCardProps = {
  name: string;
  role?: string | null;
  summary?: string | null;
  links?: Array<{ label: string; url: string }>;
};

export function ProfileCard({ name, role, summary, links }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {summary && <p>{summary}</p>}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
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
  );
}
