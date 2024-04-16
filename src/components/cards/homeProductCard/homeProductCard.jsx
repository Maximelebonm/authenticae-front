import './homeProductCard.css'
import doudou from '../../../assets/test/doudou.jpg';
import { Heart } from 'lucide-react';

export const HomeProductCards = ({props}) => {
    const {name} = props
    return (
        <div className='homeProductCardsContainer'>
        <div className='homeProductTextHover'>
            <div className='homeProductName'>
                {name}
            </div>
            <div className='homeProductFav'>
                    <Heart strokeWidth={2}/>
            </div>
            <div className='homeProductPrice'>
                300€ / unité
            </div>

        </div>
            <div className='homeProductPicturesContainer'>
                <img className='homeProductPictures' src={doudou}/>
            </div>
        </div>
    )
}