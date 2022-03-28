import { Slideshow } from 'components/slideshow/Slideshow'
import { SlideOne } from 'components/slideshow/SlideOne'
import { SlideThree } from 'components/slideshow/SlideThree'
import { SlideTwo } from 'components/slideshow/SlideTwo'
import { Global } from '@emotion/react'

export default function Onboarding() {
  return (
    <>
      <Global
        styles={{
          body: {
            fontFamily: 'system-ui, sans-serif',
            margin: 0
          }
        }}
      />
      <Slideshow
        slides={[
          <SlideOne key="1" />,
          <SlideTwo key="2" />,
          <SlideThree key="3" />
        ]}
      />
    </>
  )
}
