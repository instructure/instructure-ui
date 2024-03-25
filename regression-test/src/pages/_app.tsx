import Head from 'next/head'
import type { AppProps } from 'next/app'
import { InstUISettingsProvider } from '@instructure/emotion'
import { generateInstanceCounterMap } from '@instructure/ui-react-utils'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* This is the important step */}
      <InstUISettingsProvider instanceCounterMap={generateInstanceCounterMap()}>
        <Component {...pageProps}></Component>
      </InstUISettingsProvider>
    </>
  )
}
