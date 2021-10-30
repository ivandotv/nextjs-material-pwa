import { Slideshow } from 'components/slideshow/Slideshow'
import { Global } from '@emotion/react'

export default function Index2() {
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
      <Slideshow />
    </>
  )
}
