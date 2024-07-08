import './ProducerShopScreen.css'
import { useParams } from 'react-router-dom';
import { getShop } from '../../../api/backEnd/producer/shop.backend';
import { decodeCookies } from '../../../helpers/decodeToken';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../../components/cards/productCard/productCard';

export const ProducerShopScreen = () => {
    const {id} = useParams()
    console.log(id)
    const cookie =  decodeCookies(document.cookie)
    
    const [shop, setShop] = useState();
    const [product,setProduct]= useState()
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    console.log(shop)

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await getShop(cookie.Id_user)
                if(response){
                    response.json()
                    .then(data=>{
                        console.log(data)
                        if(data.message== 'shop exist'){
                            setShop(data.data.shop)
                            setProduct(data.data.products)
                        }
                    })
                }
            } catch (error) {
                console.log(error)                
            }

        }
        fetch()
    },[cookie.Id_user])
    return (
        <>
        {shop ? <div>
            <section id="ProducerShopMainContainer">
                <div id="producerShopPictureContainer">
                    <img src={Base_URL + shop.cover_picture} id="ProducerShopCoverPicture"/>
                   <img src={Base_URL + shop.profil_picture} id="ProducerShopProfilPicture"/>
                </div>
                <div id="producerShopName">
                    {shop.name}
                </div>
                <div>
                    {shop.description}
                </div>
            </section>
            <section id="profileArticle">
            <div id='ProducerPanelProductsContainer'>
            {product?.map((item,index)=>{
                const mainPicture = item.productImages.find((item)=> item.order == 0)
                return (
                    <Link to={`/product/${item.Id_product}`} key={index}>
                        <ProductCard props={item} key={index} picture={mainPicture} />   
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