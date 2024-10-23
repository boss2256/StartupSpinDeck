// pages/_app.tsx

import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
// Import your global styles if you have any
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
