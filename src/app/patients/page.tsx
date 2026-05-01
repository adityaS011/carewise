import { AppShell } from "@/components/layout/AppShell";
import { DemoDataBar } from "@/components/layout/DemoDataBar";
import { PatientsCommand } from "@/components/patients/PatientsCommand";

export default function PatientsPage() {
  return (
    <AppShell>
      <DemoDataBar />
      <PatientsCommand />
    </AppShell>
  );
}
