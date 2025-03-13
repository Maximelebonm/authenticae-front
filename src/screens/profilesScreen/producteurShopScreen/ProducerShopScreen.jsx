import './ProducerShopScreen.css'
import { useParams } from 'react-router-dom';
import { getShopByIdAPI } from '../../../api/backEnd/producer/shop.backend';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { configStorage } from '../../../helpers/config';
import { HomeProductCards } from '../../../components/cards/homeProductCard/homeProductCard';

export const ProducerShopScreen = () => {
    const {id} = useParams()
    const [shop, setShop] = useState();
    const [product,setProduct]= useState()

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await getShopByIdAPI(id)
                if(response){
                    response.json()
                    .then(data=>{
                        if(data.message== 'shop exist'){
                            setShop(data.data)
                            setProduct(data.data.products)
                        }
                    })
                }
            } catch (error) {
                console.log(error)                
            }

        }
        fetch()
    },[id])
    
    return (
        <>
        {shop ? <div>
            <section id="ProducerShopMainContainer">
                <div id="producerShopPictureContainer">
                    <img src={configStorage()+ '/' + shop.cover_picture} id="ProducerShopCoverPicture"/>
                   <img src={configStorage()+ '/' + shop.profil_picture} id="ProducerShopProfilPicture"/>
                </div>
                <div id="producerShopName">
                    {shop.name}
                </div>
                <div>
                    {shop.description}
                </div>
            </section>
            <section id="profileArticle">
                <div id='ProducerShopProductsContainer'>
                {product?.map((item,index)=>{
                    return (
                        <Link to={`/product/${item.Id_product}`} key={index}>
                            <HomeProductCards info={item} picture={item.productImages[0]} />   
                        </Link>
                    )
                })}
                </div>
            </section>
            <section>
                {/* contacter le vendeur */}
            </section>
            <section>
                {/* commentaire acheteur */}
            </section>
        </div> : 
        <div>
            Une erreur est survenu
        </div>}
        </>
    )
}