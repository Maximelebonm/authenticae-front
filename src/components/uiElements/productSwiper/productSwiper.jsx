import './productSwiper.css';
import { Swiper, SwiperSlide,useSwiper  } from 'swiper/react';
import { Navigation, Pagination, FreeMode,Thumbs,EffectFade } from 'swiper/modules';
import { useState,useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const ProductSwiper = (props) => {
    const swiper = useSwiper();
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    const pictures = props.props
    console.log(pictures)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div id="swiperContainer">
            <Swiper
                spaceBetween={10}
                // slidesPerView={1}
                coverflowEffect={{
                    slideShadows : true
                }}
                loop={true}
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
                        <SwiperSlide>
                            <img src={Base_URL + item} className="productSwiperMain"/>
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                direction={'vertical'}
                loop={true}
                className="SwiperNav"
            >
             {
                pictures?.map((item,index)=>{
                return <SwiperSlide key={index} className="productSwiperThumb">
                    <img src={Base_URL + item}  className="productSwiperThumb"/>
                </SwiperSlide>
                })
            }
        </Swiper>
        </div>
    )

}