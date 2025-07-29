import { useState,useEffect } from "react"
import { cancelProductionApi, cancelProductWithPurcentApi, cancelSendProductApi, getOrderApi, inProductionApi, sendProductApi } from "../../../../api/backEnd/buyProcess/order.backend";
import { useAuthContext } from "../../../authContext";
import './OrderScreen.css'
import Logo from '../../../../assets/logos/logo_authenticae_blanc.png';
import { toast, ToastContainer } from "react-toastify";
import { Check } from 'lucide-react';
import { InitRequest } from "../../../../api/initRequest";
import { configStorage } from "../../../../helpers/config";
import { createLabelMrApi } from "../../../../api/backEnd/buyProcess/mr.backend";

export const OrderScreen =()=> {
    const { userDetails } = useAuthContext();
    const [order, setOrder] = useState(null)
    const [reload, setReload] = useState(false)
    const [errorMail,setErrorMail] = useState(false)
    const base_URL = import.meta.env.VITE_BASE_URL_BACK

    const fetchmr = async()=>{
        const resp = await getMrApi()
        resp.json()
        .then((data)=>{
            console.log(data)
        })
    }

    useEffect(()=>{
        (async ()=>{
            try {
                if(userDetails?.Id_user){
                    console.log('order : ', userDetails)
                    const response = await getOrderApi(userDetails?.Id_user)
                    response.json()
                        .then(data=>{
                            if(data.message== 'order finded'){
                                console.log(data)
                                setOrder(data.data)
                            }
                        })
                }
            } catch (error) {
                console.log(error)                
            }
        })()
    },[userDetails,reload])

    // prise en charge du produit
    const handleProduction = async(idOrderProduct,userEmail,userName,productName)=>{
        try {

            const resp = await inProductionApi(idOrderProduct,userEmail,userName,productName)
            resp.json()
            .then((data)=>{
                if(data.message === 'produit pris en charge'){
                    toast.success('produit pris en charge', {autoClose : 3000})
                    setReload(!reload)
                } else {
                    toast.error('pris en charge mais mail non envoyé, faire une demande au support', {autoClose : 10000})
                    setReload(!reload)
                    // setErrorMail(true)
                }
            })
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }

    // annulation de la prise en charge du produit
    const cancelProduction = async(idOrderProduct,userEmail,userName,productName)=> {
        try {
    
            const resp = await cancelProductionApi(idOrderProduct,userEmail,userName,productName)
            resp.json()
            .then((data)=>{
                if(data.message === 'prise en charge annulé'){
                    toast.success('prise en charge annulé', {autoClose : 3000})
                    setReload(!reload)
                } else {
                    toast.error('prise en charge annulé mais mail non envoyé, faire une demande au support', {autoClose : 10000})
                    setReload(!reload)
                    // setErrorMail(true)
                }
            })
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }

    // creation d'une étiquette
    const handleLabel = async(location,locationName,user,numberFacture,idOrderProduct)=> {
        try {
            const resp = await createLabelMrApi(location, locationName, user, numberFacture, idOrderProduct)
            resp.json()
            .then((data)=>{
                if(data.message === 'label created'){
                    toast.success('étiquette créée', {autoClose : 3000})
                    setReload(!reload)
                }})
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }

    // envoie du produit
    const handleProductSend = async(id,mail,idPayment,stripeId,price,userName,productName,productAccount,idOrder)=> {
        try {
            const resp = await sendProductApi(id,mail,idPayment,stripeId,price,userName,productName,productAccount,idOrder)
            resp.json()
            .then((data)=>{
                if(data.message === 'produit envoyé'){
                    toast.success('produit envoyé', {autoClose : 3000})
                    setReload(!reload)
                } else {
                    toast.error('produit envoyé mais mail non envoyé, faire une demande au support', {autoClose : 10000})
                    setReload(!reload)
                    // setErrorMail(true)
                }
            })
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }

    const cancelProductSend = async(id,mail)=> {
        try {
            console.log(id, mail)
            const resp = await cancelSendProductApi(id,mail)
            resp.json()
            .then((data)=>{
                if(data.message === 'envoie annulé'){
                    toast.success('envoie annulé', {autoClose : 3000})
                    setReload(!reload)


                } 
            
                else {
                    toast.error('envoi annulé mais mail non envoyé, faire une demande au support', {autoClose : 10000})
                    setReload(!reload)
                }
            })
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }
    console.log(order)

    const handleSubmit = (e,idOrderProduct,idPayement,refund,productPrice,Id_order,productaccount)=> {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const percent = formData.get("percent");

        const fetch = async()=>{
            const resp = await cancelProductWithPurcentApi(idOrderProduct,percent,idPayement,refund,productPrice,Id_order,productaccount)
            if(resp.message == "remboursement effectué"){
                toast.success('le produit à bien été remboursé')
                setReload(!reload)
            }
            else {
                toast.error('une erreur est survenue')
                setReload(!reload)
            }
        }
        fetch()
    }

    const ReturnSendButton = ({state,idOrder,idOrderProduct,userEmail,paymentid,stripe,price,userName,productName,productAccount})=> {
     if( state ==='labelised'){
            // envoi du produit
            return <button onClick={()=>{handleProductSend(idOrderProduct,userEmail,paymentid,stripe,price,userName,productName,productAccount,idOrder)}}>Envoyé</button>
        }
        else if (state === 'canceled'){
            return <div>Produit annulé</div>
        }
        else if (state === 'shipped' || state === 'delivered'){
            return <div>produit envoyé</div>
        }
    }

    const ChargeButton = ({state,idOrderProduct,userEmail,userName,productName})=> {
        if(state === 'paid'){
            // Prise en charge du produit
            return <button onClick={()=>{handleProduction(idOrderProduct,userEmail,userName,productName)}}>Commencer</button>
        }
        else if (state === 'processing'){
            // annulation de la prise en charge du produit
            return <button onClick={()=> {cancelProduction(idOrderProduct,userEmail,userName,productName)}}>annuler prise en charge</button>
        } else if (state === 'canceled' || state === 'shipped' || state === 'delivered'){
            // Produit annulé ou envoyé pas de bouton
            return null
        }
    }

    return (
    <div id='orderScreenContainer'>
    <ToastContainer/>
        {order !== null ? order?.map((itemOrder,indexOrder)=>{
           return ( 
            <div key={indexOrder} className='orderContainer' >
            <div className='infoUserContainer'> 
                <div className='mainInfo'>
                    <div> {itemOrder.user.firstname}</div>     
                    <div> {itemOrder.user.lastname}</div>
                </div>
                {
                    itemOrder.deliverymethod.name === 'Mondial Relay' ?
                    <div className='InfoDelivery'> 
                    Livraison : 
                        <div> {itemOrder.deliverymethod.name}</div>
                        <div> {itemOrder.pickup_location_name}</div>  
                          <div> {itemOrder.pickup_location}</div>
                    </div> 
                    : 
                    <div>
                        <div className='adressInfo'>
                            <div> {itemOrder.DeliveryAddress.country}</div> 
                            <div> {itemOrder.DeliveryAddress.cityCode}</div> 
                            <div> {itemOrder.DeliveryAddress.city}</div>     
                        </div>
                            <div className='adressInfo'>
                                <div> {itemOrder.DeliveryAddress.number}</div> 
                                <div> {itemOrder.DeliveryAddress.street}</div>
                                <div> {itemOrder.DeliveryAddress.additional}</div>
                        </div>
                    </div>
                }
            </div>
            {itemOrder.orderproducts.map((item,index)=>{
                return (
                    <div key={index} className='orderProductContainer'>
                        <div className='orderProductSection'>
                            <div className='orderProductItem'>
                                <div className="orderProductMainLine">
                                <p>
                                    {item.product.name}
                                </p>
                                     {item.label_link !== ''&& <a href={item.label_link} className="download-label" target="_blank" rel="noopener noreferrer">Télécharger l&apos;étiquette</a>}
                                </div>   
                                {<img src={item?.product?.productImages?.[0]?.storage ? configStorage() + '/' + item.product.productImages[0].storage : Logo} id='orderImage' alt='Product Image'/>}
                            </div>
                            <div className='orderProductItem'>
                                <div>
                                    quantité : {item.quantity}
                                </div>
                                <div>
                                    prix payé : {item.price}
                                </div>
                            </div>
                            <div className='orderProductItem'>
                            options :
                            {
                                item.orderproductoptions.map((itemOrderProductOption,index)=>{
                                return (
                                    <div key={index}>
                                        <div>{itemOrderProductOption.productoption.name} : {itemOrderProductOption.subOption.detail}
                                        </div>
                                    </div>
                                    )
                                })
                            }

                            </div>
                            <div className='orderProductItem'>
                                personalisation : 
                            {
                                item.orderproductpersonalizations.map((itemOrderPersonalization,index)=>{
                                    return (
                                        <div key={index}>
                                            {itemOrderPersonalization.consumer_text}
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <form onSubmit={(e)=>handleSubmit(e,item.Id_order_product,itemOrder.payment_id,itemOrder.refund,item.price,itemOrder.Id_order,itemOrder.orderproducts.length)}>
                                {
                                item.order_state === "waitingCancel" && <div>
                                <input type='number' max={80} min={0} name='percent' id='orderInput' placeholder="0"/>
                                    <button type='submit' ><Check/></button>
                                </div>
                                }
                            </form>
                        </div>
                        <div className='orderProductButtons'>
                        <div>
                            <ChargeButton state={item.orderproductstate.name} idOrderProduct={item.Id_order_product} productName={item.product.name} userEmail={itemOrder.user.email} userName={itemOrder.user.firstname} />

                            {
                                item.orderproductstate.name == 'processing' && item.label_link == '' ? <button onClick={()=>{handleLabel(itemOrder.pickup_location, itemOrder.pickup_location_name, itemOrder.user, itemOrder.number_facture,item.Id_order_product)}}> Etiquette</button> : null
                            }
                        </div>
                            <div>
                            <ReturnSendButton state={item.orderproductstate.name} idOrder={itemOrder.Id_order} idOrderProduct={item.Id_order_product} userEmail={itemOrder.user.email} paymentid={itemOrder.payment_id} stripe={item.product.user.Stripe_ID} price={item.price} productName={item.product.name} userName={itemOrder.user.firstname} productAccount={itemOrder.orderproducts.length} />
                            </div>
                        </div> 
                    </div>
                )
            })}
            </div>     
        ) 
    }) : <div>Pas de commande pour le moment </div>}
    </div>
    )
}