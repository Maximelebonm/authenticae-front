import './producteurCard.css';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InitRequest } from '../../../api/initRequest';

export const ProducteurCard = ({props}) => {
    const {profile,description,name,profil_picture,Id_shop} = props;
    
    return (
        <Link to={'/shop/'+ Id_shop}>
            <div className='producteurCardContainer'>
                <div className='producteurCardPicturesContainer'>
                    <img className='producteurCardPictures' src={InitRequest() + '/' +profil_picture}/>
                </div>
                <div className='producteurCardTextHover'>
                    <div className='producteurCardFav'>
                            <Heart strokeWidth={2}/>
                    </div>
                    <div className='producteurCardName'>
                    <h3>
                        {name}
                    </h3>
                    </div>
                    <div className='description'>
                        {description}
                    </div>
                </div>
            </div>
        </Link>
    )
}