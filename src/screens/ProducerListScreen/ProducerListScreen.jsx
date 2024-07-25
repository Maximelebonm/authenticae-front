import { useEffect } from 'react'
import { ProducteurCard } from '../../components/cards/producteurCard/producteurCard'
import './ProducerListScreen.css'
import { getAllShop} from '../../api/backEnd/producer/shop.backend'
import { useState } from 'react'

export const ProducerListScreen = () => {
    const [shop,setShop] = useState()
    useEffect(()=>{
        (async() =>{
            const response = await getAllShop()
            response.json()
            .then(data =>{
                console.log(data)
                setShop(data.data)
            })
        })();
    },[])
console.log(shop)
    return (
        <div id='producteursScreenContainer'>
        <section>
            <h1>
                Ici une barre de recherche
            </h1>
        </section>
            <section id="producteursScreenProducts">
            {
            shop?.map((item,index)=>{
                return (
                    <ProducteurCard props={item} key={index} />
                )
            })
        }
            </section>
        </div>
    )
}