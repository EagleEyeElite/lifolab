'use client'

import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [isMounted, setIsMounted] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex justify-center">
            <div className="flex-[0_0_70%]">
              <div className="shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)] rounded-[1.8rem] text-[4rem] font-semibold flex items-center justify-center h-[19rem] select-none">
                {slides[0] + 1}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] justify-between gap-[1.2rem] mt-[1.8rem]">
          <div className="grid grid-cols-2 gap-[0.6rem] items-center">
            <button className="tap-highlight-color-[rgba(49,49,49,0.5)] dark:tap-highlight-color-[rgba(230,230,230,0.5)] appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer border-0 p-0 m-0 shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)] w-[3.6rem] h-[3.6rem] z-[1] rounded-full text-[rgb(54,49,61)] dark:text-[rgb(222,222,222)] items-center justify-center opacity-50" disabled />
            <button className="tap-highlight-color-[rgba(49,49,49,0.5)] dark:tap-highlight-color-[rgba(230,230,230,0.5)] appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer border-0 p-0 m-0 shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)] w-[3.6rem] h-[3.6rem] z-[1] rounded-full text-[rgb(54,49,61)] dark:text-[rgb(222,222,222)] items-center justify-center" />
          </div>
          <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-[2.6rem] h-[2.6rem] flex items-center justify-center rounded-full after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:flex after:items-center after:content-[''] ${
                  index === 0
                    ? 'after:shadow-[inset_0_0_0_0.2rem_rgb(54,49,61)] dark:after:shadow-[inset_0_0_0_0.2rem_rgb(222,222,222)]' 
                    : 'after:shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:after:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-4">
          {slides.map((index) => (
            <div className="transform-gpu flex-[0_0_70%] min-w-0" key={index}>
              <div className="shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)] rounded-[1.8rem] text-[4rem] font-semibold flex items-center justify-center h-[19rem] select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] justify-between gap-[1.2rem] mt-[1.8rem]">
        <div className="grid grid-cols-2 gap-[0.6rem] items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-[2.6rem] h-[2.6rem] flex items-center justify-center rounded-full after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:flex after:items-center after:content-[''] ${
                index === selectedIndex 
                  ? 'after:shadow-[inset_0_0_0_0.2rem_rgb(54,49,61)] dark:after:shadow-[inset_0_0_0_0.2rem_rgb(222,222,222)]' 
                  : 'after:shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] dark:after:shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
