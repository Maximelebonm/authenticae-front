import { useEffect, useState } from "react";
import './cartScreen.css'
import { decodeCookies } from "../../helpers/decodeToken";
import { getUserById } from "../../api/backEnd/user.backend";
import { getCartApi,deleteCartApi } from "../../api/backEnd/buyProcess/cart.backend";
import { Trash2  } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

export const CartScreen = ()=> {
    const [cart,setCart] = useState();
    const [products,setProducts] = useState();
    const [reload,setReload] = useState(false)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;

    useEffect(()=>{
        const cookies = document.cookie.split(';')
                let authCookie = null
                console.log(cookies)
                for (let cookie of cookies) {
                    if (cookie.startsWith('auth=')) {
                        authCookie = cookie.substring('auth='.length);
                        break;
                    }
                }
                const cookie = decodeCookies(authCookie);
                const fetch =async()=>{
                    const resp = await getUserById(cookie.Id_user)
                    resp.json()
                    .then(async(data)=>{
                        setCart(data.carts[0])
                        const respProd = await getCartApi(data.carts[0].Id_cart)
                        respProd.json()
                        .then((data)=> {
                            console.log(data)
                            setProducts(data.data)
                        })
                    })
                }
                fetch()
                setCart(cookie)  
    },[reload])

    const deleteProduct = (product)=> {
        const idcartProduct = {id : product.Id_cart_product, price : product.price};
        const idPersonalization = product.cartproductpersonalizations.map(element => ({id : element.Id_cart_product_personalization}))
        const idsOptions = product.cartproductoptions.map(element => ({id : element.Id_cart_product_option}));

        const fetchApi = async () => {
            const resp = await deleteCartApi(idcartProduct,idPersonalization,idsOptions)
            resp.json()
            .then((data)=>{
                if(data.message === 'product deleted'){
                    console.log(data.message)
                    toast.success('Produit supprimé du panier',{autoClose : 2000})
                    setReload(!reload)
                }
            })
            }
            fetchApi()
    }

    console.log(products?.cartProduct)

    return (
        <div className='cartScreenContainer'>
        <ToastContainer/>
        <div className='cartContainer'>
            <div className='cartProductsContainer'>
                {products?.cartProduct.map((productItem,productIndex)=> {
                    return (
                        <div key={productIndex} className='cartProductContainer'>
                        <div className='cartProductTitle'>
                        <img src={Base_URL + productItem.product?.productImages[0].storage} className='cartProductImage'/>
                        <h2>{productItem.product?.name}</h2>
                        <h2> prix total produit {productItem.price}€ </h2>
                        </div>
                            {(productItem.cartproductoptions.length > 0 || productItem?.cartproductpersonalizations.length > 0) && <div className='cartProductDetail'> 
                            <h4 className='cartProductDetailTitle'> 
                                Detail :
                            </h4>
                            <h4 className='cartProductDetailTitle'> 
                                prix du produit : {productItem.product.price} € x {productItem.quantity}
                            </h4>
                            <h4 className='cartProductDetailTitle'> 
                                quantité : {productItem.quantity}
                            </h4>
                            {productItem?.cartproductoptions?.map((OptionItem,optionIndex)=>{
                                return (
                                    <div key={optionIndex} className='cartProductOption'>
                                        {OptionItem.productoption.name} : {OptionItem.subOption.detail} {OptionItem.price} € x {productItem.quantity}
                                    </div>
                                )
                            })}
                            {productItem?.cartproductpersonalizations?.map((personalizationItem,optionIndex)=>{
                                return (
                                    <div key={optionIndex} className='cartProductOption'>
                                        prix personalisation : {personalizationItem.price} €<br/>
                                        votre texte : {personalizationItem.consumer_text}
                                    </div>
                                )
                            })}
                            </div>}
                            <button type='button' onClick={()=>{deleteProduct(productItem)}}><Trash2/> </button>
                        </div>
                    )
                })}
            </div>
                <h2>
                    prix total : {cart?.price} €
                </h2>
            </div>
            <button> Passer la commande </button>
        </div>
    )
}