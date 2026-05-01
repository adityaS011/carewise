"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, hasFirebaseConfig } from "@/lib/firebase";

type User = { email: string; name: string };

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const displayName = (email: string) => email.split("@")[0].replace(/[._-]/g, " ");

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: "",
      login: async (email, password) => {
        set({ loading: true, error: "" });
        try {
          if (hasFirebaseConfig && auth) {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = result.user;
            set({
              user: {
                email: firebaseUser.email ?? email,
                name: firebaseUser.displayName ?? displayName(email)
              },
              loading: false
            });
            return;
          }

          if (password.length < 6) throw new Error("Password must be 6+ chars.");
          set({ user: { email, name: displayName(email) }, loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Login failed."
          });
        }
      },
      logout: async () => {
        if (hasFirebaseConfig && auth) await signOut(auth);
        set({ user: null, error: "" });
      }
    }),
    { name: "carewise-auth" }
  )
);
