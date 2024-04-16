import { useEffect } from "react"
import { getProduct } from "../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";

export const ProductScreen = () => {
    const {id} = useParams()
    const [product,setProduct]= useState()
    useEffect(()=> {
        const fetch = async()=>{
            const response = await getProduct(id)
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data.message)
                        setProduct(data.data)

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

            {product.name}
        </h2>
        </div>
        }

        </>
    )
}