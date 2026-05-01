import type { Metadata } from 'next';
import { AuthGuard } from '@/components/layout/AuthGuard';
import { Providers } from '@/theme/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareWise Healthcare SaaS',
  description: 'B2B healthcare SaaS demo with auth, analytics, patients, and notifications.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
