import './cartValidationScreen.css'
import { useState, useEffect } from "react"
import { useOrder } from '../orderContext';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { configStorage } from '../../../helpers/config';

export const CartValidationScreen = () => {
    const { orderDetails, setOrderDetails } = useOrder();
 
    const navigate = useNavigate()

    const handlePaiment = ()=> {
        const isObjectNotEmpty = (obj) => {
            return obj && Object.keys(obj).length > 0;
        }
        if (isObjectNotEmpty(orderDetails.address_billing) && isObjectNotEmpty(orderDetails.address_delivery)) {
            localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            navigate('/paiement');
        } else {
            toast.error("Sélectionnez une adresse de livraison et de facturation", { autoClose: 3000 });
        }
    }

    

    
    return (
        <div className="cartValidationContainer">
        <h1> Résumé de votre commande </h1>
        <h2> Produits </h2>
            {orderDetails?.cart && orderDetails?.cart?.cartProduct.map((item, index) => (
                <div key={index} className="cartValidationItem">
                    <img src={configStorage() + '/' + item.product.productImages[0].storage} />
                    <div className="cartValidationItemDetails">
                        <h2>{item.product.name}</h2>
                        <p>Quantité: {item.quantity}</p>
                 
                    </div>
                    <div className="cartValidationItemDetails">
                        <h4>Options</h4>
                        {item.cartproductoptions.map((option, indexOption) => (
                            <div key={indexOption}>
                            <p>{option.productoption.name} : {option.subOption.detail} </p>
                            <p>
                                prix : {option.price} €
                            </p>
                            </div>
                        ))}
                    </div>
                    <p>Prix : {item.product.price} €</p>
                </div>
            ))}
            <div id='deliveryContainer'>
                <div>
                    <h2> Mode de livraison </h2>
                    <p>{orderDetails?.livraisonMode}</p>
                </div>
                <div>
                    <h2> Prix </h2>
                    <p> {orderDetails?.livraisonPrice} €</p>
                </div>
            </div>
            <div id='totalPrice'>
                <h2> Prix total </h2>
                <p>{orderDetails?.cart?.price} €</p>
            </div>
            <button onClick={()=> {handlePaiment()}} >Passez au paiement</button>
            <button onClick={()=> navigate('/cart')} >Modifier </button> 
        </div>
    )
}