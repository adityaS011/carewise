'use client';

import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@/components/ui';
import { tokens } from '@/theme/tokens';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const wrapSx = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minHeight: '60vh',
  justifyContent: 'center',
  p: 6,
  textAlign: 'center',
} as const;

const titleSx = { color: tokens.colors.text.primary, fontSize: '1.1rem', fontWeight: 600 } as const;
const bodySx = { color: tokens.colors.text.muted, fontSize: '0.85rem', maxWidth: 480 } as const;

export default function RouteError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('CareWise route error:', error);
  }, [error]);

  return (
    <Box sx={wrapSx}>
      <Box sx={titleSx}>Something went wrong</Box>
      <Box sx={bodySx}>
        We hit an unexpected error rendering this view. Try again, and if it keeps happening, reload the page.
      </Box>
      <Button onClick={reset} variant="primary" size="sm">Try again</Button>
    </Box>
  );
}
