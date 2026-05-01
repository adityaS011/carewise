import { AppShell } from "@/components/layout/AppShell";
import { DashboardCommand } from "@/components/dashboard/DashboardCommand";
import { DemoDataBar } from "@/components/layout/DemoDataBar";

export default function DashboardPage() {
  return (
    <AppShell>
      <DemoDataBar />
      <DashboardCommand />
    </AppShell>
  );
}
