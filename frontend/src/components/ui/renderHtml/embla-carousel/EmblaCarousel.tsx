'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'
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
  const [emblaRef, emblaApi] = useEmblaCarousel(options)



  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

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

      <div className="flex justify-between items-center mt-[1.8rem]">
        <div className="grid grid-cols-2 gap-[0.6rem] items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  )
}

export default EmblaCarousel
