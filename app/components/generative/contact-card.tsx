import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/app/lib/data/resume-data";
import { copy } from "@/app/lib/ui/copy";

type ContactCardProps = {
  profile: ResumeData["profile"];
};

export function ContactCard({ profile }: ContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.contact.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p>
          <span className="font-medium">{copy.contact.email}:</span>{" "}
          {profile.contact.email}
        </p>
        <p>
          <span className="font-medium">{copy.contact.website}:</span>{" "}
          {profile.contact.website}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
          {profile.contact.x && (
            <Button asChild size="sm" variant="outline">
              <a href={profile.contact.x} target="_blank" rel="noreferrer">
                X
              </a>
            </Button>
          )}
          <Button asChild size="sm">
            <a href={`mailto:${profile.contact.email}`}>
              {copy.contact.emailMe}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
