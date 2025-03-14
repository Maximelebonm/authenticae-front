import './productCard.css';
import logo from '../../../assets/logos/logo_authenticae_blanc.png';
import { configStorage } from '../../../helpers/config';

export const ProductCard = ({props,picture})=>{
    const {name,price} = props

    return (
        

        <div className="productCardContainer">
         <img className='homeProductPictures' src={picture?.storage ? configStorage() +  '/' + picture.storage : logo}/>
            <h3>
                {name}
            </h3>
 
        </div>
    )
}