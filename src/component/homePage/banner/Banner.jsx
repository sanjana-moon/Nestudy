'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide1 from './Slide-1';
import Slide2 from './Slide-2';
import Slide3 from './Slide-3';
import Slide4 from './Slide-4';
import Slide5 from './Slide-5';
import Slide6 from './Slide-6';
import Slide7 from './Slides-7';

const Banner = () => {
    return (
        <div className='h-[80vh] text-center flex items-center justify-center'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Slide1/></SwiperSlide>
                <SwiperSlide><Slide2/></SwiperSlide>
                <SwiperSlide><Slide3/></SwiperSlide>
                <SwiperSlide><Slide4/></SwiperSlide>
                <SwiperSlide><Slide5/></SwiperSlide>
                <SwiperSlide><Slide6/></SwiperSlide>
                <SwiperSlide><Slide7/></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;