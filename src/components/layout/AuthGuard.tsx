"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { initAuth, ready, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const isLogin = (pathname ?? "") === "/login";

  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!mounted || !ready) return;
    if (!user && !isLogin) router.replace("/login");
    if (user && isLogin) router.replace("/");
  }, [isLogin, mounted, ready, router, user]);

  if (!mounted || !ready || (!user && !isLogin)) return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#080b14', color: '#06b6d4', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
      CareWise
    </main>
  );
  return children;
}
