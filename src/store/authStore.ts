"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  Unsubscribe
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, hasFirebaseConfig } from "@/lib/firebase";

type User = { email: string; name: string };

type AuthState = {
  user: User | null;
  ready: boolean;
  loading: boolean;
  error: string;
  initAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const displayName = (email: string) => email.split("@")[0].replace(/[._-]/g, " ");
const toUser = (email: string, name?: string | null): User => ({
  email,
  name: name || displayName(email)
});

let unsubscribe: Unsubscribe | undefined;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      ready: false,
      loading: false,
      error: "",
      initAuth: () => {
        if (!hasFirebaseConfig || !auth || unsubscribe) {
          set({ ready: true });
          return;
        }
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          set({
            ready: true,
            user: firebaseUser?.email
              ? toUser(firebaseUser.email, firebaseUser.displayName)
              : null
          });
        });
      },
      login: async (email, password) => {
        set({ loading: true, error: "" });
        try {
          if (hasFirebaseConfig && auth) {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = result.user;
            set({
              user: toUser(firebaseUser.email ?? email, firebaseUser.displayName),
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
      signup: async (name, email, password) => {
        set({ loading: true, error: "" });
        try {
          if (hasFirebaseConfig && auth) {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            set({ user: toUser(email, name), loading: false });
            return;
          }

          if (password.length < 6) throw new Error("Password must be 6+ chars.");
          set({ user: { email, name: name || displayName(email) }, loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Signup failed."
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
