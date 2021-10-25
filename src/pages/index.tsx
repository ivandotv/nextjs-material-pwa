import { Global } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <Global
        styles={{
          body: {
            fontFamily: 'system-ui, sans-serif',
            margin: 0
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
        <h1 css={{ fontSize: '3rem' }}>Next.js Material PWA</h1>
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
        <Link href="/app">
          <a
            css={{
              marginTop: 14,
              padding: 14,
              backgroundColor: 'blue',
              borderRadius: 6,
              color: '#fff',
              fontSize: '1.2rem',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Launch Application
          </a>
        </Link>
      </div>
    </>
  )
}
