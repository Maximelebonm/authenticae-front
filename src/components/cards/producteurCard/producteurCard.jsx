import './producteurCard.css';
import { Heart } from 'lucide-react';
import doudou from '../../../assets/test/doudou.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ProducteurCard = ({props}) => {
    const {profile,description,name,profil_picture,Id_shop} = props;
    console.log(props)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    
    return (
        <Link to={'/shop/'+ Id_shop}>
            <div className='producteurCardContainer'>
                <div className='producteurCardPicturesContainer'>
                    <img className='producteurCardPictures' src={Base_URL+ profil_picture}/>
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