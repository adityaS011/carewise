'use client';

/**
 * Providers — Root Client Provider Stack
 *
 * Wraps the entire app with all required context providers in the correct order.
 * Order matters — each layer depends on the one outside it.
 *
 * Provider stack (outermost → innermost):
 *   1. StyledComponentsRegistry  — collects styled-components CSS for SSR injection
 *                                   (must be outermost so it captures all styled output)
 *   2. StyledEngineProvider injectFirst
 *                                — makes MUI inject its CSS before styled-components,
 *                                   so our styled-components rules win specificity battles
 *   3. ThemeProvider             — provides our custom MUI dark theme to all MUI components
 *   4. CssBaseline               — MUI's own CSS reset (normalizes margins, font, etc.)
 *   5. {children}                — the actual page/layout tree
 *
 * Usage: place in app/layout.tsx around the root <body> children.
 * Never add per-page providers here — keep feature state in Zustand stores instead.
 */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import { muiTheme } from './muiTheme';
import { StyledComponentsRegistry } from './StyledRegistry';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </StyledComponentsRegistry>
  );
}
