import '../styles/globals.css'
import Father from '../components/utils/Father'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>QrLean</title>
      </Head>
      <Father>
        <Component {...pageProps} />
      </Father>
    </>
  )
}

export default MyApp
