import Link from 'next/link'
// @ts-ignore
import Banner from '../svg/landing-page.svg'
import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="page-wrap">
        <h1>NEXT.JS PWA</h1>
        <div className="banner-wrapper">
          <Banner />
        </div>
        <Link href="/app">
          <a className="launch-app">Launch Application</a>
        </Link>
        <style jsx>
          {`
            .page-wrap {
              display: flex;
              flex-flow: column;
              align-items: center;
            }
            h1 {
              font-size: 2rem;
              margin-bottom: 0;
            }
            .banner-wrapper {
              width: 100%;
              max-width: 500px;
            }
            .launch-app {
              background-color: blue;
              border-radius: 10px;
              color: #fff;
              padding: 20px;
              text-decoration: none;
            }
          `}
        </style>
        <style jsx global>
          {`
            body {
              font-family: 'Open Sans', sans-serif;
            }
          `}
        </style>
      </div>
    </>
  )
}
