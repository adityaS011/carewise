"use client";

import { create } from "zustand";

type NotificationState = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  enabled: false,
  setEnabled: (enabled) => set({ enabled })
}));
