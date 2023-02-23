import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleAnalytics gaMeasurementId="UA-55876683-2" trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
