import Link from 'next/link'
import Head from 'next/head'
import useStyles from 'styles/landing-page-style'

export default function Index() {
  const classes = useStyles()

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={classes.pageWrap}>
        <h1>Next.js Material PWA</h1>
        <div className={classes.bannerWrapper}>
          <img src="landing-page.svg" />
        </div>
        <Link href="/app">
          <a className={classes.btn}>Launch Application</a>
        </Link>
      </div>
    </>
  )
}
