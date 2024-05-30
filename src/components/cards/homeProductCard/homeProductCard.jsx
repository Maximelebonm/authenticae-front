import './homeProductCard.css'
import logo from '../../../assets/logos/logo_authenticae_blanc.png';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
export const HomeProductCards = ({props,picture}) => {
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK

    const {name,price} = props

    return (
        <div className='homeProductCardsContainer'>
        <div className='homeProductTextHover'>
            <div className='homeProductName'>
                {name}
            </div>
            {/* <div className='homeProductFav'>
                    <Heart strokeWidth={2}/>
            </div> */}
            <div className='homeProductPrice'>
                {price} euros
            </div>

        </div>
            <div className='homeProductPicturesContainer'>
                <img className='homeProductPictures' src={ picture?.storage ? Base_URL+ picture.storage : logo}/>
            </div>
        </div>
    )
}