import React from 'react';
import '../styles/globals.css';
import Father from '../components/utils/Father';
import Head from 'next/head';
import store from '../store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>QrLean</title>
                </Head>
                <ToastContainer />
                <Father>
                    <Component {...pageProps} />
                </Father>
            </Provider>
        </>
    );
}

export default MyApp;
