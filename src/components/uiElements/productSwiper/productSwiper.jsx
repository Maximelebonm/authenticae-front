import './productSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode,Thumbs,EffectFade } from 'swiper/modules';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { InitRequest } from '../../../api/initRequest';

export const ProductSwiper = (props) => {
    const pictures = props.props
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div id="swiperContainer">
            <Swiper
                spaceBetween={0}
                // slidesPerView={1}
                coverflowEffect={{
                    slideShadows : true
                }}
            
                effect={'fade'}
                // navigation={true}
                pagination={{ clickable: true }}
                // centeredSlides={true}
                modules={[FreeMode,Navigation,Thumbs,EffectFade]}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                className="Swiper"
                thumbs={{
                    swiper : thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
            >
            {
                pictures?.map((item,index)=>{
                    return (
                        <SwiperSlide key={index} >
                            <img src={InitRequest() + '/' + item.storage} className="productSwiperMain"/>
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={0}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                direction={'vertical'}
                className="SwiperNav"
            >
             {
                pictures?.map((item,index)=>{
                return <SwiperSlide key={index} className="productSwiperThumb">
                    <img src={InitRequest() + '/' + item.storage}  className="productSwiperThumb"/>
                    </SwiperSlide>
                })
            }
        </Swiper>
        </div>
    )

}