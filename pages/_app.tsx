import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app';
import {RecoilRoot} from 'recoil';
import Layout from '../components/layout';

const defaultAccount: string = `0x${"0".repeat(40)}`;
const defaultPageIndex: number = 0;

export default function App({ Component, pageProps }: AppProps) {
  const [account, setAccount] = React.useState(defaultAccount);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentPageIndex, setPageIndex] = React.useState(defaultPageIndex);
  const [message, setMessage] = React.useState("");

  const setaccount = (value: string) => setAccount(value);
  const setIsAuthentication = (value: boolean) => setIsAuthenticated(value);
  const setpageIndex = (value: number) => setPageIndex(value);
  const setmessage = (value: string) => setMessage(value);

  return (
    <React.Fragment>
      <Layout setaccount={setaccount} setMessage={setmessage} setPageIndex={setPageIndex} setIsAuthentication={setIsAuthentication} >
        <Component 
          {...pageProps} 
          setpageIndex={setpageIndex} 
          currentPageIndex={currentPageIndex}
          setmessage={setmessage}
          message={message}
        />
      </Layout>
    </React.Fragment>
  );
}
