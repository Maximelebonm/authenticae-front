import './homeProductCard.css'
import logo from '../../../assets/logos/logo_authenticae_blanc.png';
import { InitRequest } from '../../../api/initRequest';
export const HomeProductCards = ({props,picture}) => {
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
            <div className={picture?.storage ?'homeProductPicturesContainer' : 'homeProductPicturesContainerd'}>
                <img className={picture?.storage ?'homeProductPictures' : 'homeProductPicturesd'} src={ picture?.storage ? InitRequest() +  '/' + picture.storage : logo}/>
            </div>
        </div>
    )
}