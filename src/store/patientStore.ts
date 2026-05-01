"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseData, makePatient, mergeStoredBase, PatientBaseState, PatientDraft } from "@/lib/patientStoreHelpers";
import { Patient, PatientStatus, TaskStatus } from "@/types/patient";

type PatientState = PatientBaseState & {
  selectedPatientId: string;
  setQuery: (query: string) => void;
  setTeam: (team: string) => void;
  setStatus: (status: PatientStatus | "all") => void;
  setRisk: (risk: PatientBaseState["risk"]) => void;
  setView: (view: PatientBaseState["view"]) => void;
  selectPatient: (id: string) => void;
  closePatient: () => void;
  addPatient: (draft: PatientDraft) => void;
  updateStatus: (id: string, status: PatientStatus) => void;
  addTask: (patientId: string, title: string) => void;
  updateTask: (id: string, status: TaskStatus) => void;
  clearFilters: () => void;
  resetDemo: () => void;
  getPatient: (id: string) => Patient | undefined;
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      ...baseData,
      selectedPatientId: "",
      setQuery: (query) => set({ query }),
      setTeam: (team) => set({ team }),
      setStatus: (status) => set({ status }),
      setRisk: (risk) => set({ risk }),
      setView: (view) => set({ view }),
      selectPatient: (id) => set({ selectedPatientId: id }),
      closePatient: () => set({ selectedPatientId: "" }),
      addPatient: (draft) => set((state) => ({
        patients: [makePatient(draft, state.patients.length), ...(state.patients ?? [])]
      })),
      updateStatus: (id, status) => set((state) => ({
        patients: (state.patients ?? []).map((p) => p.id === id ? { ...p, status } : p)
      })),
      addTask: (patientId, title) => set((state) => ({
        tasks: [
          {
            id: `T-${9100 + (state.tasks ?? []).length}`,
            patientId,
            title,
            owner: get().getPatient(patientId)?.careTeam ?? "Care Ops",
            due: "Today",
            status: "Open",
            priority: "Medium"
          },
          ...(state.tasks ?? [])
        ]
      })),
      updateTask: (id, status) => set((state) => ({
        tasks: (state.tasks ?? []).map((t) => t.id === id ? { ...t, status } : t)
      })),
      clearFilters: () => set({ query: '', team: 'all', status: 'all', risk: 'all' }),
      resetDemo: () => set(baseData),
      getPatient: (id) => (get().patients ?? []).find((p) => p.id === id)
    }),
    {
      name: "carewise-mock-data",
      merge: (stored, current) => ({ ...current, ...mergeStoredBase(stored) }),
      partialize: (state) => ({
        patients: state.patients,
        tasks: state.tasks,
        query: state.query,
        team: state.team,
        status: state.status,
        risk: state.risk,
        view: state.view
      })
    }
  )
);
