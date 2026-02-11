type GreetingProps = {
  city: string;
  country: string;
};

export function Greeting({ city, country }: GreetingProps) {
  const cityLabel = city || "World";
  const countryLabel = country || "Global";

  return (
    <p className="text-sm text-muted-foreground">
      Hello from {cityLabel}, {countryLabel}. Let&apos;s explore this portfolio.
    </p>
  );
}
