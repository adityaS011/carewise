import { CareTask, CareTeam, Patient } from "@/types/patient";

export const mockCareData: {
  patients: Patient[];
  tasks: CareTask[];
  teams: CareTeam[];
} = {
  patients: [
    {
      id: "CW-1042",
      name: "Aarav Mehta",
      age: 58,
      gender: "Male",
      condition: "Type 2 Diabetes",
      risk: 72,
      status: "Review",
      lastVisit: "2026-04-26",
      careTeam: "Endocrinology",
      ward: "Remote Care",
      vitals: { heartRate: 84, bloodPressure: "132/86", oxygen: 97 },
      notes: "Glucose trend increased after medication change."
    },
    {
      id: "CW-1188",
      name: "Nisha Rao",
      age: 46,
      gender: "Female",
      condition: "Hypertension",
      risk: 38,
      status: "Stable",
      lastVisit: "2026-04-24",
      careTeam: "Cardiology",
      ward: "Outpatient",
      vitals: { heartRate: 76, bloodPressure: "124/82", oxygen: 99 },
      notes: "Responding well to revised care plan."
    },
    {
      id: "CW-1225",
      name: "Kabir Sethi",
      age: 67,
      gender: "Male",
      condition: "COPD",
      risk: 88,
      status: "Critical",
      lastVisit: "2026-04-27",
      careTeam: "Pulmonology",
      ward: "ICU Stepdown",
      vitals: { heartRate: 96, bloodPressure: "118/78", oxygen: 91 },
      notes: "Oxygen saturation dipped twice in last 24 hours."
    },
    {
      id: "CW-1391",
      name: "Maya Iyer",
      age: 34,
      gender: "Female",
      condition: "Post-op Recovery",
      risk: 25,
      status: "Recovering",
      lastVisit: "2026-04-25",
      careTeam: "Surgery",
      ward: "General",
      vitals: { heartRate: 72, bloodPressure: "116/74", oxygen: 98 },
      notes: "Pain score reduced and mobility improved."
    },
    {
      id: "CW-1450",
      name: "Dev Kapoor",
      age: 52,
      gender: "Male",
      condition: "Heart Failure",
      risk: 80,
      status: "Review",
      lastVisit: "2026-04-28",
      careTeam: "Cardiology",
      ward: "Remote Care",
      vitals: { heartRate: 90, bloodPressure: "140/88", oxygen: 95 },
      notes: "Weight gain indicates fluid retention risk."
    }
  ],
  tasks: [
    { id: "T-9001", patientId: "CW-1225", title: "Review oxygen trend", owner: "Pulmonology", due: "Today", status: "Open", priority: "High" },
    { id: "T-9002", patientId: "CW-1450", title: "Confirm diuretic adherence", owner: "Cardiology", due: "Today", status: "In Progress", priority: "High" },
    { id: "T-9003", patientId: "CW-1042", title: "Schedule glucose coaching", owner: "Endocrinology", due: "Tomorrow", status: "Open", priority: "Medium" }
  ],
  teams: [
    { name: "Cardiology", capacity: 86, activeCases: 128 },
    { name: "Pulmonology", capacity: 92, activeCases: 74 },
    { name: "Endocrinology", capacity: 68, activeCases: 96 },
    { name: "Surgery", capacity: 54, activeCases: 41 }
  ]
};
