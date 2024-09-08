import './productSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode,Thumbs,EffectFade } from 'swiper/modules';
import { useState,useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { configStorage } from '../../../helpers/config';

export const ProductSwiper = (props) => {
    const pictures = props.props
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mobile,setMobile] = useState()

    useEffect(()=>{
        const handleResize = () => {
            console.log('pass');
            if (window.innerWidth <= 840) {
                setMobile(true);
            } else {
                setMobile(false); // Optionnel, si vous souhaitez réinitialiser la valeur pour les largeurs supérieures à 780px
            }
        };

        // Appeler handleResize une première fois pour vérifier la largeur initiale
        handleResize();

        // Ajouter l'écouteur d'événement lors du montage
        window.addEventListener('resize', handleResize);

        // Nettoyer l'écouteur d'événement lors du démontage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);

    return (
        <div id="swiperContainer">
            <Swiper
                spaceBetween={0}
                coverflowEffect={{
                    slideShadows : true
                }}    
                effect={'fade'}
                pagination={{ clickable: true }}
                modules={[FreeMode,Navigation,Thumbs,EffectFade]}
                className="Swiper"
                thumbs={{
                    swiper : thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
            >
            {
                pictures?.map((item,index)=>{
                    return (
                        <SwiperSlide key={index} >
                            <img src={configStorage() + '/' + item.storage} className="productSwiperMain"/>
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
                direction={mobile == false ? 'vertical' : 'horizontal'}
                className="SwiperNav"
            >
             {
                pictures?.map((item,index)=>{
                return <SwiperSlide key={index} className="productSwiperThumb">
                    <img src={configStorage() + '/' + item.storage}  className="productSwiperThumb"/>
                    </SwiperSlide>
                })
            }
        </Swiper>
        </div>
    )

}