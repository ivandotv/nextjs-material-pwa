import { css } from '@emotion/react'
import { Pagination } from 'components/slideshow/Pagination'
import { SlideOne } from 'components/slideshow/SlideOne'
import { SlideThree } from 'components/slideshow/SlideThree'
import { SlideTwo } from 'components/slideshow/SlideTwo'
import Head from 'next/head'
import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import { AppBtn } from './AppBtn'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const backgroundColors = ['blue', 'red', 'green']

export const styles = css`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  color: #fff;
  position: relative;
  .content {
    margin-top: -32px;
  }
`

export function Slideshow() {
  const [index, setIndex] = useState(0)
  const highestIndex = 2 //no api to get this  programmatically

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          key="theme-color"
          content={backgroundColors[index]}
        />
      </Head>
      <div
        css={{
          backgroundColor: backgroundColors[index],
          transition: 'background-color 1s ease-out'
        }}
      >
        {/* @ts-ignore - typings error */}
        <BindKeyboardSwipeableViews
          index={index}
          enableMouseEvents
          onChangeIndex={(i) => setIndex(i)}
        >
          <SlideOne />
          <SlideTwo />
          <SlideThree />
        </BindKeyboardSwipeableViews>
        <div
          css={{
            position: 'absolute',
            width: '100%',
            bottom: 20,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <AppBtn text={index === highestIndex ? `Let's go` : 'Skip'} />
          <Pagination
            dots={3}
            index={index}
            onChangeIndex={(i) => setIndex(i)}
          />
        </div>
      </div>
    </>
  )
}
