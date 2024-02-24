import './producteurCard.css';
import { Heart } from 'lucide-react';
import doudou from '../../../assets/test/doudou.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ProducteurCard = (props) => {
    const profile = props.profile;

    return (
        <Link to={'/producteurs/'+ profile}>
            <div className='producteurCardContainer'>
                <div className='producteurCardPicturesContainer'>
                    <img className='producteurCardPictures' src={doudou}/>
                </div>
                <div className='producteurCardTextHover'>
                    <div className='producteurCardFav'>
                            <Heart strokeWidth={2}/>
                    </div>
                    <div className='producteurCardName'>
                    <h3>
                        Dou'crochet {profile}
                    </h3>
                    </div>
                    <div className='description'>
                        fabrication de doudou en crochet
                    </div>
                </div>
            </div>
        </Link>
    )
}