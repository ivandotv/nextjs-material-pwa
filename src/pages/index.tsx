import Link from 'next/link'
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
        <h1>Next.js Material PWA</h1>
        <div className="banner-wrapper">
          <img src="landing-page.svg" />
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
              font-size: 2.5rem;
              margin-bottom: 0;
              text-align: center;
            }
            .banner-wrapper {
              width: 100%;
              max-width: 500px;
            }
            .banner-wrapper img {
              width: 100%;
              height: auto;
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
