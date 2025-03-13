import './homeProductCard.css'
import logo from '../../../assets/logos/logo_authenticae_blanc.png';
import { configStorage } from '../../../helpers/config';
import PropTypes from 'prop-types';

export const HomeProductCards = (props) => {
    const {name,price} = props.info;
    const picture = props.picture;

    return (
        <div className='homeProductCardsContainer'>
        <div className='homeProductTextHover'>
            <div className='homeProductName'>
                {name}
            </div>
            <div className='homeProductPrice'>
                {price} euros
            </div>

        </div>
            <div className={picture.storage ?'homeProductPicturesContainer' : 'homeProductPicturesContainerd'}>
                <img className={picture.storage ?'homeProductPictures' : 'homeProductPicturesd'} src={ picture.storage ? configStorage() +  '/' + picture.storage : logo}/>
            </div>
        </div>
    )
}

HomeProductCards.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired, // 'name' doit être une chaîne de caractères et est requis
        price: PropTypes.number.isRequired, // 'price' doit être un nombre et est requis
    }).isRequired, // 'info' est requis
    picture: PropTypes.shape({
        storage: PropTypes.string, // 'storage' doit être une chaîne de caractères
    }), // 'picture' n'est pas requis mais peut être fourni
};