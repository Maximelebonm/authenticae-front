import { useEffect, useState } from 'react';
import './productCard.css';
import logo from '../../../assets/logos/logo_authenticae_blanc.png';

export const ProductCard = ({props})=>{
    const {name,price,pictures} = props
    const [picturesSplited,setPicturessplited] = useState() 
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=>{
        if(pictures){
            if(pictures.split(',').length > 0){
                console.log( pictures.split(',').length)
                setPicturessplited(pictures.split(','))
            }
            else{
                setPicturessplited(pictures)
            }

        }

    },[])
    return (
        

        <div className="productCardContainer">
         <img className='homeProductPictures' src={picturesSplited ? Base_URL+picturesSplited[0] : logo}/>
            <h3>
                {name}
            </h3>
 
        </div>
    )
}