import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/app/lib/data/resume-data";

type ContactCardProps = {
  profile: ResumeData["profile"];
};

export function ContactCard({ profile }: ContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p>
          <span className="font-medium">Email:</span> {profile.contact.email}
        </p>
        <p>
          <span className="font-medium">Website:</span> {profile.contact.website}
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
          <Button asChild size="sm">
            <a href={`mailto:${profile.contact.email}`}>Email Me</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
