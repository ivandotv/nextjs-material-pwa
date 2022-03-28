import { Slideshow, SlideOne, SlideTwo, SlideThree } from 'components/slideshow'
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
