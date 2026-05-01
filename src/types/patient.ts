export type PatientStatus = "Stable" | "Critical" | "Recovering" | "Review";
export type TaskStatus = "Open" | "In Progress" | "Done";

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  risk: number;
  status: PatientStatus;
  lastVisit: string;
  careTeam: string;
  ward: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    oxygen: number;
  };
  notes: string;
};

export type CareTask = {
  id: string;
  patientId: string;
  title: string;
  owner: string;
  due: string;
  status: TaskStatus;
  priority: "Low" | "Medium" | "High";
};

export type CareTeam = {
  name: string;
  capacity: number;
  activeCases: number;
};
