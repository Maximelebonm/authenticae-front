import './homeScreen.css';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getAllProduct } from '../../api/backEnd/producer/product.backend';
import { HomeProductCards } from './../../components/cards/homeProductCard/homeProductCard';

export const HomeScreen = () => {

    const [product,setProduct] = useState()
    useEffect(()=>{
        const fetchproduct = async() =>{
            const response = await getAllProduct()
            console.log(response)
            const products = response.json()
            .then(data =>{
                if(data.message == 'products geted')
                    setProduct(data.data)
            })
        }
        fetchproduct()
    },[])
   //const MainPicture = product?.productImages.find((item)=> item.order == 0)
console.log(product)
return (
    <div id='homeScreenContainer'>
        <section>

        </section>
        <section id="homeScreenProducts">
            {product?.map((item,index)=>{
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