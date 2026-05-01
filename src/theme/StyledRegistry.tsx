'use client';

/**
 * StyledComponentsRegistry — SSR Style Injection for Next.js App Router
 *
 * Problem: styled-components generates CSS at render time, but Next.js 13+
 * App Router renders on the server before the browser executes JS. Without
 * special handling, styled-components styles arrive after HTML, causing a
 * flash of unstyled content (FOUC) on first load.
 *
 * Solution: `useServerInsertedHTML` lets us inject a `<style>` tag into
 * the server-rendered HTML stream before it's sent to the browser.
 *   1. `ServerStyleSheet` collects all styled-components CSS during SSR render.
 *   2. `useServerInsertedHTML` fires once per request, flushing the collected
 *      styles into the `<head>` of the HTML response.
 *   3. On the client, styled-components takes over normally (no sheet needed).
 *
 * Usage: wrap your root layout (app/layout.tsx) children with this component,
 * inside any server-side providers but before the MUI ThemeProvider.
 *
 * Reference: https://nextjs.org/docs/app/building-your-application/styling/css-in-js
 */
import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={sheet.instance}>
      {children as React.ReactElement}
    </StyleSheetManager>
  );
}
