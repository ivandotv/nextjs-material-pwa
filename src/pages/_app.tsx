import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'lib/server/createEmotionCache'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}
export type NextApplicationPage<P = {}, IP = P> = NextPage<P, IP> & {
  desktopSidebar?: (
    defaultMenuItems: JSX.Element | JSX.Element[]
  ) => JSX.Element
  mobileSidebar?: (defaultMenuItems: JSX.Element | JSX.Element[]) => JSX.Element
  layout?: (page: NextApplicationPage, props: any) => JSX.Element
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache
  }: {
    Component: NextApplicationPage
    pageProps: any
    emotionCache?: EmotionCache
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Next.js PWA application made with material-ui"
          key="description"
        />
        <meta
          name="keywords"
          content="pwa,nextjs,material,design"
          key="keywords"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Next.js PWA APP" />
      </Head>
      {Component.layout ? (
        Component.layout(Component, pageProps)
      ) : (
        <Component {...pageProps} />
      )}
    </CacheProvider>
  )
}
