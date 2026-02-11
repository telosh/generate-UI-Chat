import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/app/lib/data/resume-data";
import { copy } from "@/app/lib/ui/copy";

export function GithubRepos({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.githubRepos.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{project.title}</p>
              <p className="text-xs text-muted-foreground">{project.techStack.join(", ")}</p>
            </div>
            <Button asChild size="sm" variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                {copy.githubRepos.open}
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
