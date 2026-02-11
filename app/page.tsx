import { headers } from "next/headers";
import { ChatLayout } from "@/app/components/layout/chat-layout";

export default async function Home() {
  const headersList = await headers();
  const city = decodeURIComponent(headersList.get("x-visitor-city") ?? "World");
  const country = headersList.get("x-visitor-country") ?? "Global";

  return <ChatLayout city={city} country={country} />;
}
