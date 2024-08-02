import { useEffect } from 'react'
import { ProducteurCard } from '../../components/cards/producteurCard/producteurCard'
import './ProducerListScreen.css'
import { getAllShop} from '../../api/backEnd/producer/shop.backend'
import { useState } from 'react';
import { InputFloatLabel } from '../../components/uiElements/inputFloatLabel/inputFloatLabel';
import { Search } from 'lucide-react';

export const ProducerListScreen = () => {
    const [shop,setShop] = useState();
    const [searchShop,setsearchShop] = useState();
    const [refresh,setRefresh] = useState();
    useEffect(()=>{
        (async() =>{
            const response = await getAllShop()
            response.json()
            .then(data =>{
                console.log(data)
                setShop(data.data)
                setsearchShop(data.data)
            })
        })();
    },[refresh])

    const handleChange =(e)=> {
        if(e.target.value === ''){
            setRefresh(!refresh)
        }
        const new_list = shop.filter((item)=> item.name.includes(e.target.value))
        setsearchShop(new_list)
    }

    return (
        <div id='producteursScreenContainer'>
        <section>
        <InputFloatLabel type='text' onchange={handleChange} placeholder="Exemple : dou'crochet" labelName={<div id='homeSeachInput'><Search size={16}/>Recherche</div>}/>
        </section>
            <section id="producteursScreenProducts">
            {
                searchShop?.map((item,index)=>{
                return (
                    <ProducteurCard props={item} key={index} />
                )
            })
        }
            </section>
        </div>
    )
}