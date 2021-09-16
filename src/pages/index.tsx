import Link from 'next/link'
import useStyles from 'styles/landing-page-style'

export default function Index() {
  const classes = useStyles()

  return (
    <>
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
