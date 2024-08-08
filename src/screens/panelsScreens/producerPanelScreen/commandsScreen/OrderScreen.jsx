import { useState,useEffect } from "react"
import { cancelProductionApi, cancelProductWithPurcentApi, cancelSendProductApi, getOrderApi, inProductionApi, sendProductApi } from "../../../../api/backEnd/buyProcess/order.backend";
import { useAuthContext } from "../../../authContext";
import './OrderScreen.css'
import Logo from '../../../../assets/logos/logo_authenticae_blanc.png';
import { toast, ToastContainer } from "react-toastify";

export const OrderScreen =()=> {
    const { userDetails } = useAuthContext();
    const [order, setOrder] = useState(null)
    const [reload, setReload] = useState(false)
    const [errorMail,setErrorMail] = useState(false)
    const base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=>{
        (async ()=>{
            try {
                if(userDetails.user.Id_user){
                    console.log('order : ', userDetails)
                    const response = await getOrderApi(userDetails.user.Id_user)
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

    const handleProduction = async(id,mail)=>{
        try {
            console.log(id, mail)
            const resp = await inProductionApi(id,mail)
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

    const cancelProduction = async(id,mail)=> {
        try {
            console.log(id, mail)
            const resp = await cancelProductionApi(id,mail)
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

    const handleProductSend = async(id,mail)=> {
        try {
            console.log(id, mail)
            const resp = await sendProductApi(id,mail)
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
                } else {
                    toast.error('envoi annulé mais mail non envoyé, faire une demande au support', {autoClose : 10000})
                    setReload(!reload)
                    // setErrorMail(true)
                }
            })
        } catch (error) {
            toast.error('Une erreure est survenu', {autoClose : 3000})
        }
    }
    console.log(order)

    const handleSubmit = (e,idOrderProduct,idPayement,refund,productPrice,Id_order)=> {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const percent = formData.get("percent");

        const fetch = async()=>{
            const resp = await cancelProductWithPurcentApi(idOrderProduct,percent,idPayement,refund,productPrice,Id_order)
            if(resp.message == "remboursement effectué"){
                toast.success('le produit à bien été remboursé')
            }
            else {
                toast.error('une erreur est survenue')
            }
        }
        fetch()
    }

    return (
    <div>
    <ToastContainer/>
        {order !== null ? order?.map((itemOrder)=>{
           return (         
           itemOrder.orderproducts.map((item,index)=>{
            console.log(item)
            return (
                <div key={index} className='orderProductContainer'>
                    <div className='orderProductSection'>
                        <div className='orderProductItem'>
                            <div>
                                {item.product.name}
                            </div>   
                            {<img src={item?.product?.productImages?.[0]?.storage ? base_URL + item.product.productImages[0].storage : Logo} id='orderImage' alt='Product Image'/>}
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
                        <form onSubmit={(e)=>handleSubmit(e,item.Id_order_product,itemOrder.payment_id,itemOrder.refund,item.price,itemOrder.Id_order)}>
                        {item.order_state === "waitingCancel" && <div>
                         <input type='number'  name='percent' placeholder="0"/>
                            <button type='submit' >V</button>
                        </div>
                         }

                        </form>
                    </div>
                    <div className='orderProductButtons'>
                        <div>
                        {item.order_state == 'wait' ? <button onClick={()=>{handleProduction(item.Id_order_product,itemOrder.user.email)}}>Pris en charge</button> : <button onClick={()=> {cancelProduction(item.Id_order_product,itemOrder.user.email)}}>annuler prise en charge</button>}
                        {errorMail && <button>Error</button>}
                        {(item.order_state == 'wait' || item.order_state == 'production') ? <button onClick={()=>{handleProductSend(item.Id_order_product,itemOrder.user.email)}} >Envoyé</button> : <button onClick={()=>{cancelProductSend(item.Id_order_product,itemOrder.user.email)}} > annulé envoie</button>}
                        </div>
                    </div>
                </div>
            )
        })
           ) 
    }) : <div>Pas de commande pour le moment </div>}
    </div>
    )
}