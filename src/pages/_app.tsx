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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
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
