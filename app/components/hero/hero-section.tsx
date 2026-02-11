import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/app/lib/data/resume-data";
import { Greeting } from "@/app/components/hero/greeting";
import { ThemeToggle } from "@/app/components/theme-toggle";

type HeroSectionProps = {
  city: string;
  country: string;
};

export function HeroSection({ city, country }: HeroSectionProps) {
  const { profile } = resumeData;

  return (
    <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="secondary">{profile.role}</Badge>
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {profile.name}
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground">
        {profile.summary}
      </p>
      <Greeting city={city} country={country} />
    </section>
  );
}
