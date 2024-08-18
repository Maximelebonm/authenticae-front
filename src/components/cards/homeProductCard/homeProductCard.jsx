import './homeProductCard.css'
import logo from '../../../assets/logos/logo_authenticae_blanc.png';
export const HomeProductCards = ({props,picture}) => {
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    console.log(picture)
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
                <img className={picture?.storage ?'homeProductPictures' : 'homeProductPicturesd'} src={ picture?.storage ? Base_URL+ picture.storage : logo}/>
            </div>
        </div>
    )
}