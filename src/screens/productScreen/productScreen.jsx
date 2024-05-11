import { useEffect } from "react"
import { getProduct } from "../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import './productScreen.css'

export const ProductScreen = () => {
    const {id} = useParams()
    const [product,setProduct]= useState();
    const [imgDisplay, setImgDisplay] = useState();
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=> {
        const fetch = async()=>{
            const response = await getProduct(id)
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data.message)
                        setProduct(data.data)
                        setImgDisplay(data.data.pictures.split(','))
                    }
                })
            }
        }
        fetch()
    },[]);

    return (
        <>
        {product && 
        <div>
        <h2>

            {product?.name}
        </h2>
        { 
            product?.pictures && imgDisplay.map((item,index)=>{
                return <img src={product?.pictures &&  Base_URL+item} key={index} className='productScreenImage'/>
            })
        }
        <p>
            {product?.description}
        </p>
        </div>
        }

        </>
    )
}