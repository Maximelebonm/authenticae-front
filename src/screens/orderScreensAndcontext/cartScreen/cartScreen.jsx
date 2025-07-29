import { useEffect, useState } from "react";
import './cartScreen.css'
import { decodeCookies } from "../../../helpers/decodeToken";
import { getUserById } from "../../../api/backEnd/user.backend";
import { getCartApi,deleteCartApi } from "../../../api/backEnd/buyProcess/cart.backend";
import { Trash2  } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useOrder } from '../orderContext';
import { configStorage } from "../../../helpers/config";
import { useAuthContext } from './../../authContext';
import { toastSuccess } from "../../../helpers/toast.helper";

export const CartScreen = ()=> {
    const [cart,setCart] = useState();
    const [products,setProducts] = useState();
    const [reload,setReload] = useState(false)
    const navigate = useNavigate()
    const { orderDetails, setOrderDetails } = useOrder();
    const { userDetails } = useAuthContext()

    useEffect(()=>{
        if(localStorage.getItem('orderDetails')){
            localStorage.removeItem('orderDetails');
            setOrderDetails({
                    cart : {},
                    user : {},
                    address_delivery : {},
                    userChoicePaymentMethod: {}
                })
        }
                const fetch =async()=>{
                    const resp = await getUserById(userDetails.Id_user)
                    resp.json()
                    .then(async(dataUser)=>{
                        if(dataUser.carts.length === 0){
                            document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        }
                        else {
                            setCart(dataUser.carts[0])
                            const respProd = await getCartApi(dataUser.carts[0].Id_cart)
                            respProd.json()
                            .then((dataCart)=> {
                                setProducts(dataCart.data)
                                setOrderDetails({ cart : dataCart.data, user : dataUser})
                            })
                        }
                    })
                }
                fetch()
    },[reload])

    const handleOrder = ()=> {
           localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        navigate('/livraison')
    }

    const deleteProduct = (product)=> {
        const idcartProduct = {id : product.Id_cart_product, price : product.price};
        const idPersonalization = product.cartproductpersonalizations.map(element => ({id : element.Id_cart_product_personalization}))
        const idsOptions = product.cartproductoptions.map(element => ({id : element.Id_cart_product_option}));

        const fetchApi = async () => {
            const resp = await deleteCartApi(idcartProduct,idPersonalization,idsOptions)
            resp.json()
            .then((data)=>{
                if(data.message === 'product deleted'){
                    toastSuccess('Produit supprimé du panier')
                    setReload(!reload)
                }
            })
            }
            fetchApi()
    }

    return (
        <div className='cartScreenContainer'>
        <ToastContainer/>
        {products == null ? <div> Pas de produit dans le panier</div>
        : 
        <div className='cartContainer'>
            <div className='cartProductsContainer'>
                {products?.cartProduct.map((productItem,productIndex)=> {
                    return (
                        <div key={productIndex} className='cartProductContainer'>
                        <div className='cartProductTitle'>
                        <img src={configStorage() + '/' + productItem.product?.productImages[0].storage} className='cartProductImage'/>
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
            <button onClick={handleOrder}> Passer la commande </button>
            </div>
        }
        </div>
    )
}