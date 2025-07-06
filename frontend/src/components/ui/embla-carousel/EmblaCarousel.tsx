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
import Image from 'next/image'

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

type PropType = {
  slides: GalleryImage[]
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
            <div className="flex-[0_0_auto]">
              <div className="shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] rounded-[1.8rem] overflow-hidden h-[19rem] select-none w-[25rem]">
                {slides[0] && (
                  <Image
                    src={slides[0].src}
                    alt={slides[0].alt}
                    width={slides[0].width || 800}
                    height={slides[0].height || 600}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] justify-between gap-[1.2rem] mt-[1.8rem]">
          <div className="grid grid-cols-2 gap-[0.6rem] items-center">
            <button className="tap-highlight-color-[rgba(49,49,49,0.5)] appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer border-0 p-0 m-0 shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] w-[3.6rem] h-[3.6rem] z-[1] rounded-full text-[rgb(54,49,61)] items-center justify-center opacity-50" disabled />
            <button className="tap-highlight-color-[rgba(49,49,49,0.5)] appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer border-0 p-0 m-0 shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] w-[3.6rem] h-[3.6rem] z-[1] rounded-full text-[rgb(54,49,61)] items-center justify-center" />
          </div>
          <div className="flex flex-wrap justify-end items-center -mr-[0.6rem]">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-[2.6rem] h-[2.6rem] flex items-center justify-center rounded-full after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:flex after:items-center after:content-[''] ${
                  index === 0
                    ? 'after:shadow-[inset_0_0_0_0.2rem_rgb(54,49,61)]' 
                    : 'after:shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)]'
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
          {slides.map((image, index) => {
            const aspectRatio = image.width && image.height ? image.width / image.height : 1
            const slideWidth = Math.min(Math.max(aspectRatio * 19, 15), 40) // Between 15rem and 40rem based on aspect ratio
            
            return (
              <div 
                className="transform-gpu min-w-0" 
                key={index}
                style={{ flexBasis: `${slideWidth}rem` }}
              >
                <div className="shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)] rounded-[1.8rem] overflow-hidden h-[19rem] select-none">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width || 800}
                    height={image.height || 600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )
          })}
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
                  ? 'after:shadow-[inset_0_0_0_0.2rem_rgb(54,49,61)]' 
                  : 'after:shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
