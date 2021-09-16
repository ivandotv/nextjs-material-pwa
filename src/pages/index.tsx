import Link from 'next/link'
import useStyles from 'styles/landing-page-style'
import Image from 'next/image'

export default function Index() {
  const classes = useStyles()

  return (
    <>
      <div className={classes.pageWrap}>
        <h1>Next.js Material PWA</h1>
        <div className={classes.bannerWrapper}>
          <Image alt="" src="landing-page.svg" />
        </div>
        <Link href="/app">
          <a className={classes.btn}>Launch Application</a>
        </Link>
      </div>
    </>
  )
}
