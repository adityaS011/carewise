import { AppShell } from "@/components/layout/AppShell";
import { PatientDetailClient } from "@/components/patients/PatientDetailClient";

type PatientDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function PatientDetailPage({ params }: PatientDetailProps) {
  const { id } = await params;

  return (
    <AppShell>
      <PatientDetailClient id={decodeURIComponent(id)} />
    </AppShell>
  );
}
