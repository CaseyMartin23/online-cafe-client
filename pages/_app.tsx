import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../comps/layout";
import { AuthProvider } from "../authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
