import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {RecoilRoot} from 'recoil';
import Layout from '../components/layout';
// import { MoralisProvider } from 'react-moralis';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <MoralisProvider
    //   appId={String(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID)}
    //   serverUrl={String(process.env.NEXT_PUBLIC_MORALIS_SERVER_URL)}
    // >
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    // </MoralisProvider>
  );
}
