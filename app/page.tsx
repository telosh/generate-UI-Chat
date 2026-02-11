import { headers } from "next/headers";
import { HeroSection } from "@/app/components/hero/hero-section";
import { ChatContainer } from "@/app/components/chat/chat-container";

export default async function Home() {
  const headersList = await headers();
  const city = decodeURIComponent(headersList.get("x-visitor-city") ?? "World");
  const country = headersList.get("x-visitor-country") ?? "Global";

  return (
    <main id="main-content" className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="space-y-6">
        <HeroSection city={city} country={country} />
        <ChatContainer />
        <p className="text-xs text-muted-foreground">
          Built with Next.js App Router, AI SDK streaming, and Vercel-native edge features.
        </p>
      </div>
    </main>
  );
}
