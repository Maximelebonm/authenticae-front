import './homeScreen.css';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getAllProduct } from '../../api/backEnd/producer/product.backend';
import { HomeProductCards } from './../../components/cards/homeProductCard/homeProductCard';
import { InputFloatLabel } from '../../components/uiElements/inputFloatLabel/inputFloatLabel';
import { Search } from 'lucide-react';
export const HomeScreen = () => {

    
    const [product,setProduct] = useState();
    const [productSearch, setProductSearch] = useState();
    const [refresh,setRefresh] = useState();
    useEffect(()=>{
        const fetchproduct = async() =>{
            const response = await getAllProduct()
            response.json()
            .then(data =>{
                if(data.message == 'products geted')
                    setProduct(data.data)
                setProductSearch(data.data)
            })
        }
        fetchproduct()
    },[refresh])
    
    const handleChange =(e)=> {
        if(e.target.value === ''){
            setRefresh(!refresh)
        }
        const new_list = product.filter((item)=> item.name.includes(e.target.value))
        setProductSearch(new_list)
    }

return (
    <div id='homeScreenContainer'>
        <InputFloatLabel type='text' onchange={handleChange} placeholder='Exemple : doudou' labelName={<div id='homeSeachInput'><Search size={16}/>Recherche</div>}/>
        <section>
            
        </section>
        <section id="homeScreenProducts">
            {productSearch?.map((item,index)=>{
                console.log(productSearch)
                   const mainPicture = item.productImages[0]
                return(
                    <Link to={`/product/${item.Id_product}`}  key={index}>
                        <HomeProductCards props={item} picture={mainPicture} />
                    </Link>
                )
            })}
        </section>
        </div>
    )
}