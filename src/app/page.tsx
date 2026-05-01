import { AppShell } from "@/components/layout/AppShell";
import { HomeCommand } from "@/components/home/HomeCommand";
import { DemoDataBar } from "@/components/layout/DemoDataBar";

export default function HomePage() {
  return (
    <AppShell>
      <DemoDataBar />
      <HomeCommand />
    </AppShell>
  );
}
