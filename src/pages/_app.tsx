import { NextPage } from 'next'
import Head from 'next/head'
import { AppProps } from 'next/app'
import React from 'react'

export type NextApplicationPage<P = {}, IP = P> = NextPage<P, IP> & {
  desktopSidebar?: <T>(
    defaultMenuItems: JSX.Element | JSX.Element[]
  ) => JSX.Element
  mobileSidebar?: <T>(
    defaultMenuItems: JSX.Element | JSX.Element[]
  ) => JSX.Element
  layout?: (page: NextApplicationPage, props: any) => JSX.Element
}

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps
  }: { Component: NextApplicationPage; pageProps: any } = props

  return (
    <>
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
          content="Next.js PWA application made with metrial-ui"
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
      </Head>
      {Component.layout ? (
        Component.layout(Component, pageProps)
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
