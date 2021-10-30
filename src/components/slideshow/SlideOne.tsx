import { styles } from 'components/slideshow/Slideshow'
import Image from 'next/image'

export function SlideOne() {
  return (
    <div css={styles}>
      <div className="content">
        <Image
          priority={true}
          alt="slideshow image"
          src="/slideshow/report.svg"
          width={400}
          height={300}
        />
        <div css={{ textAlign: 'center' }}>
          <h1>Progressive Web App</h1>
          <p>Native like experience</p>
        </div>
      </div>
    </div>
  )
}
