import { mockCareData } from "@/data/mockCare";
import { CareTask, Patient, PatientStatus } from "@/types/patient";

export type RiskFilter = "all" | "high" | "medium" | "low";
export type ViewMode = "grid" | "list";
export type PatientDraft = Pick<Patient, "name" | "age" | "condition" | "careTeam">;

export type PatientBaseState = {
  patients: Patient[];
  tasks: CareTask[];
  query: string;
  team: string;
  status: PatientStatus | "all";
  risk: RiskFilter;
  view: ViewMode;
};

type PersistedPatientState = Partial<PatientBaseState>;

export const baseData: PatientBaseState = {
  patients: mockCareData.patients,
  tasks: mockCareData.tasks,
  query: "",
  team: "all",
  status: "all",
  risk: "all",
  view: "list"
};

export const makePatient = (draft: PatientDraft, count: number): Patient => ({
  id: `CW-${1500 + count}`,
  name: draft.name,
  age: draft.age,
  gender: "Not recorded",
  condition: draft.condition,
  risk: 52,
  status: "Review",
  lastVisit: new Date().toISOString().slice(0, 10),
  careTeam: draft.careTeam,
  ward: "Intake",
  vitals: { heartRate: 78, bloodPressure: "122/80", oxygen: 98 },
  notes: "New mock patient added for care coordination review."
});

export const mergeStoredBase = (stored: unknown): PatientBaseState => {
  const value = (stored ?? {}) as PersistedPatientState;
  return {
    ...baseData,
    patients: Array.isArray(value.patients) ? value.patients : baseData.patients,
    tasks: Array.isArray(value.tasks) ? value.tasks : baseData.tasks,
    query: typeof value.query === "string" ? value.query : "",
    team: typeof value.team === "string" ? value.team : "all",
    status: value.status ?? "all",
    risk: value.risk ?? "all",
    view: value.view ?? "list"
  };
};
