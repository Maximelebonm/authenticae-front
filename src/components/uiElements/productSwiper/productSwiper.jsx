import './productSwiper.css';
import { useState } from 'react';
import PropTypes from 'prop-types'; // Importation de PropTypes

import { configStorage } from '../../../helpers/config';

export const ProductSwiper = (props) => {
    const pictures = props.props;
    const [mainPicture, setMainpicture] = useState(props.props[0].storage);

    return (
        <div id="swiperContainer">
            <img src={configStorage() + '/' + mainPicture} id="productSwiperMain"/>
            <div id='swiperNav'>
            {
                pictures.map((item,index)=>{
                    return (
                        <img key={index} src={configStorage() + '/' + item.storage} onClick={()=>setMainpicture(item.storage)} className="productSwiperSmallItem"/>
                    )
                })
            }
            </div>
        </div>
    )
}

ProductSwiper.propTypes = {
    props: PropTypes.arrayOf(
        PropTypes.shape({
            storage: PropTypes.string.isRequired,
        })
    ).isRequired,
};