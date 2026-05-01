"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const isLogin = (pathname ?? "") === "/login";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!user && !isLogin) router.replace("/login");
    if (user && isLogin) router.replace("/home");
  }, [isLogin, mounted, router, user]);

  if (!mounted || (!user && !isLogin)) return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#080b14', color: '#06b6d4', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
      CareWise
    </main>
  );
  return children;
}
