'use client';

/**
 * GlobalStyles — App-wide CSS Reset & Base Styles
 *
 * Injected once via styled-components `createGlobalStyle` in the root layout.
 * Resets and normalizes browser defaults so MUI and custom components start
 * from a consistent baseline.
 *
 * What it does:
 *   - Universal box-sizing: border-box (no surprise width overflows)
 *   - Body: deep dark background, Inter font, antialiasing
 *   - Links: inherit color, fade on hover (no blue underlines)
 *   - Buttons: inherit font, no border/bg — MUI handles button appearance
 *   - Inputs/selects: inherit font, no browser outline (MUI OutlinedInput handles focus)
 *   - :focus-visible: brand-cyan outline only for keyboard nav (not mouse clicks)
 *   - Custom scrollbar: slim 5px track, subtle white-alpha thumb for dark theme
 *
 * Note: MUI's CssBaseline also normalizes styles. GlobalStyles goes further for
 * elements outside MUI's scope (native selects, scrollbars, focus rings).
 */
import { createGlobalStyle } from 'styled-components';
import { tokens } from './tokens';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { height: 100%; }

  body {
    background: ${tokens.colors.bg.page};
    color: ${tokens.colors.text.primary};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }

  a { color: inherit; text-decoration: none; transition: opacity 150ms; }
  a:hover { opacity: 0.8; }

  button {
    font: inherit;
    border: 0;
    cursor: pointer;
    background: none;
    transition: ${tokens.transition};
  }

  button:disabled { cursor: not-allowed; opacity: 0.5; }

  input, select, textarea {
    font: inherit;
    border: 0;
    outline: none;
    background: none;
  }

  :focus-visible {
    outline: 2px solid ${tokens.colors.brand};
    outline-offset: 2px;
    border-radius: ${tokens.radius.sm};
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
`;
