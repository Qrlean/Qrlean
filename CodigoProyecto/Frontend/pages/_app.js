import React from 'react';
import '../styles/globals.css';
import Father from '../components/utils/Father';
import Head from 'next/head';
import store from '../store';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>QrLean</title>
                </Head>
                <Father>
                    <Component {...pageProps} />
                </Father>
            </Provider>
        </>
    );
}

export default MyApp;
