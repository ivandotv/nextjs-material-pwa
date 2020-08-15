import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
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
        <title>App Name</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
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
