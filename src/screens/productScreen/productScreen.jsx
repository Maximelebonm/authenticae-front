import { useEffect } from "react"
import { getProduct } from "../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import './productScreen.css'
import { ProductSwiper } from "../../components/uiElements/productSwiper/productSwiper";

export const ProductScreen = () => {
    const {id} = useParams()
    const [product,setProduct]= useState();
    const [imgDisplay, setImgDisplay] = useState();
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    const [price,setPrice] = useState()


    useEffect(()=> {
        const fetch = async()=>{
            const response = await getProduct(id)
            if(response){
                console.log(response)
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data)
                        if(data.data.product.pictures){
                            setImgDisplay(data.data.product.pictures.split(','))
                            setProduct(data.data);
                            setPrice(data.data.product.price)
                            // setOptions(data.data.option)
                            // setPersonalization(data.data.personalization)
                        }
                        else{
                            console.log('else')
                            setImgDisplay(data.data.pictures)
                            setProduct(data.data);
                            // setOptions(data.data.option);
                            // setPersonalization(data.data.personalization);
                        }
                    }
                })
            }
        }
        fetch()
    },[]);

    console.log(product)

    return (
        <>
        {product?.product && 
        <div className='productContainer'>
            <ProductSwiper props={imgDisplay}/>
            { product.option &&   
            <div className="productInfoContainer">
            <h2>
                {price}€
            </h2>   
            <h2>
                {product?.product.name}
            </h2> 
            <p>
                {product?.product.description}
            </p>
                {product.option.map((item,index)=>{
                    console.log(item)
                   return(
                    <div key={index}>
                    <div> {item.name} </div>
                        <select className='productOption'>
                            <option value="none">Selectionner une option</option>
                            {item.subOptions.map((subItem,subIndex)=>{
                                return <option key={subIndex} value={subItem.detail + '(' + subItem.price + '€ )'} > {subItem.detail + ' (+ ' + subItem.price + '€)'}</option>
                            })}
                        </select>
               
                   </div>
                   )
                })}
                {product.personalization.map((item,index)=>{
                    console.log(item)
                   return(
                    <div key={index}>
                        <h4>{item.name}</h4>
                        <h6>{item.detail}</h6>
                        <textarea></textarea>
                   </div>
                   )
                })}
            </div>                 
        }
        </div>
        }

        </>
    )
}