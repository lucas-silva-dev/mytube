import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ImageProps = {
  id: string;
  images: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }[]
}

interface CarouselProps {
  images: ImageProps[]
}

export function Carousel({ images }: CarouselProps) {

  return (
    <>
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {
          images.map(image => (
            <SwiperSlide key={image.id}>
              <img src={image.images[0].url} alt={image.id}/>
            </SwiperSlide>
            )
          )
        }
      </Swiper>

    </>

  )
}
