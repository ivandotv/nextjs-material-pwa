import { Global } from '@emotion/react'
import { cookies } from 'lib/shared/config'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export default function Index() {
  const router = useRouter()
  const handleAppLaunch = (e: React.MouseEvent) => {
    if (!Cookies.get(cookies.slideshowShown.name) || e.ctrlKey) {
      Cookies.set(cookies.slideshowShown.name, '1')
      router.push('/onboarding')
    } else {
      router.push('/app')
    }
  }

  return (
    <>
      <Global
        styles={{
          body: {
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
            color: '#4c4a4a'
          },
          '@media (prefers-color-scheme: dark)': {
            body: {
              backgroundColor: '#212121',
              color: '#fff'
            }
          }
        }}
      />
      <div
        css={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <h1 css={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: 0 }}>
          Next.js Material PWA
        </h1>
        <div
          css={{
            maxWidth: '300px',
            '& img': {
              width: '100%',
              height: 'auto'
            }
          }}
        >
          <Image alt="" src="/landing-page.svg" width={400} height={300} />
        </div>
        <div
          css={{
            maxWidth: 400,
            fontSize: '0.8rem',
            padding: '0 12px'
          }}
        >
          <p>
            When you launch the app for the first time, there will be a simple
            onboarding slideshow, that will only be shown once.
          </p>
          <p>
            If you like to see the onboarding again, hold down the{' '}
            <strong>ctrl/command</strong> when launching the app.
          </p>
        </div>
        <a
          onClick={handleAppLaunch}
          css={{
            marginTop: 14,
            padding: 12,
            backgroundColor: 'blue',
            borderRadius: 8,
            color: '#fff',
            fontSize: '1rem',
            textDecoration: 'none',
            textAlign: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          Launch Application
        </a>
      </div>
    </>
  )
}
