import { useState } from 'react'
import './commandsScreen.css'
import { useEffect } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import { useAuthContext } from '../../authContext';
import { cancelProductInProgressApi, getUserCommandsApi } from '../../../api/backEnd/buyProcess/order.backend';
import { stripeCancelApi, stripeCancelProductApi } from '../../../api/backEnd/buyProcess/stripe.backend';
import Modal from '../../../components/modals/modal';
import { InitRequest } from '../../../api/initRequest';

export const CommandsScreen = ()=> {
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;
    const {userDetails} = useAuthContext();
    const [myorder,setMyOrder] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [showModalProduct, setShowModalProduct] = useState(null);
    const [showModalPartiel, setShowModalPartiel] = useState(null);
    const [reload,setReload] = useState(false);
    let cliked = 0

    useEffect(()=>{
        const fetchCommands = async () => {
            if (userDetails && userDetails.user && userDetails.user.Id_user) {
                try {
                    const userId = userDetails.user.Id_user;
  
                    await getUserCommandsApi(userId)
                    .then((data)=>{
                        if (data.message === 'commandsgeted') {

                            setMyOrder(data.data);
                        }
                    })
                } catch (error) {
                    console.error('Error fetching commands:', error);
                }
            }
        };

        fetchCommands();
    },[userDetails,reload])

    const formatDate = (dateString) => {
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];
    
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} ${month} ${year}`;
    };

    const handleCancel = (idOrder,idPayment,amount,refund,product,user,order_state)=> {
        if(cliked === 0){
            cliked = 1
            const fetch = async()=>{
                const resp = await stripeCancelApi(idOrder,idPayment,amount,refund,product,user,order_state)
                    if(resp.message === "commande annulé"){
                        toast.success("commande annulé", {autoClose : 3000})
                        setShowModal(!showModal);
                        setReload(!reload)
                    } 
                    if(resp.message === 'commande déja annulé'){
                        toast.error("votre commande à déjà été annulé, si il s&apos;agit d&apos;une erreur, veuillez contacter le support", {autoClose : 3000})
                        setShowModal(!showModal);
                        setReload(!reload)
                    }
                    else {
                        toast.error('une erreure est survenue', {autoClose : 3000})
                        setShowModal(!showModal);
                        setReload(!reload)
                    }
                }
                fetch()
        } else {
            toast.error("actualisé la page")
        }
        }

    const handleCancelProduct = (idOrder,idPayment,amount,idproduct,priceproduct,refund,productAccount,user)=> {
        if(cliked == 0){
            cliked = 1
            const fetch = async()=>{
                const resp = await stripeCancelProductApi(idOrder,idPayment,amount,idproduct,priceproduct,refund,productAccount,user)
                    if(resp.message === "produit annulé"){
                        toast.success("produit annulé", {autoClose : 3000})
                        setShowModal(!showModal);
                        setReload(!reload)
                    } else {
                        toast.error('une erreure est survenue', {autoClose : 3000})
                        setShowModal(!showModal);
                        setReload(!reload)
                    }
                }
                fetch()
            }
        }

        const handleCancelProducer = (id)=> {
            const fetch = async()=>{
                const resp = await cancelProductInProgressApi(id)
                if(resp.message == "produit en cours d'annulation"){
                    toast.success("votre produit est en cours d'annulation, vous serez contacter par mail lorsque cela sera le cas",{autoClose : 3000})
                    setReload(!reload)
                } else {
                    toast.error("une erreur est survenue veuillez contact le support", {autoClose : 3000})
                }
            }
            fetch()
        }

        const CancelReturn = ({state,id})=> {
            if(state == 'wait'){
                return <button onClick={()=>{setShowModalProduct(id)}}>Annuler le produit</button>
            }
            if(state == 'production'){
                return <button onClick={()=>{setShowModalPartiel(id)}}>Annuler le produit (remboursement partiel)</button>
            }
            if(state == 'send'){
                return <div>produit envoyé</div>
            }
            else {
                return <div>produit annulé</div>
            }
        }

        const OrderCancelorFinsih = ({state,id})=> {
            if(state == 'Pay'){
                return <button onClick={()=>setShowModal(id)}>Annuler la commande</button>
            }
            if(state == 'finish'){
                return <div>commande terminé</div>
            }
            else if(state == 'canceled'){
                return <div>commande annulé</div>
            }
        }
        

    return (
        <div id='commandsScreenContainer'>
        <ToastContainer/>
            {myorder.length != 0 ? myorder.map((orderItem,orderindex)=>{
                
                return (
                    <div key={orderindex} className='commandContainer'>
                    <div className='commandHeader'>
                    <div className='commandHeaderItem' >
                        date de la commande : <br/>{formatDate(orderItem.created_date)}
                    </div>
                    <div className='commandHeaderItem'>
                        <strong>prix total :  <br/> {orderItem.price}€ </strong>
                    </div>
                    <div className='commandHeaderItem'>
                           Livraison à  : {orderItem.user.firstname} {orderItem.user.lastname}
                    </div>
                    <div className='commandHeaderItem'>
                            <div id='idDecommande'>id de commande : {orderItem.Id_order}</div>
                            etat de la commande : {orderItem.order_state}
                    </div>
                    </div>
                        <div className='containerProductAndOption'>
                        {orderItem.orderproducts.map((productitem,productindex)=>{
                            return (
                                <div key={productindex} className='commandProductContainer'>
                                    <div className='commandProduct'>
                                        <h2>{productitem.product.name}</h2>
                                        <img src={InitRequest() + '/' + productitem.product.productImages[0].storage} />
                                    </div>
                                    <div className='commandProduct'>
                                        <strong> options : </strong>
                                        {productitem.orderproductoptions.map((optionitem,optionindex)=>{
                                                return (
                                                    <div key={optionindex}>
                                                        <div className='commandoption'>
                                                            {optionitem.productoption.name} :  {optionitem.subOption.detail} ({optionitem.price}€)
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <div className='commandProduct'>
                                        <strong> personalisations : </strong>
                                        {productitem.orderproductpersonalizations.map((persoitem,persoindex)=>{
                                                return (
                                                    <div key={persoindex}>
                                                        <div className='commandoption'>
                                                            {persoitem.consumer_text} ({persoitem.price}€)
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <div className='commandProduct'>
                                        <div> prix de base : {productitem.product.price}</div>
                                       <div> quantité : {productitem.quantity}</div>
                                       <div> prix produit + options : {(productitem.price)} €</div>
                                    </div>
                              
                                    <div className='commandProduct'>
                                        <CancelReturn state={productitem.order_state} id={productitem.Id_order_product} />
                                    </div>
                                    <Modal onClose={()=>setShowModalProduct(null)} show={showModalProduct === productitem.Id_order_product} onConfirm={()=>{handleCancelProduct(orderItem.Id_order,orderItem.payment_id,orderItem.price,productitem.Id_order_product,productitem.price,orderItem.refund,orderItem.orderproducts.length,orderItem.user)
                                    setShowModalProduct(null)
                                    setReload(!reload)
                                    }}>
                                        êtes vous sur de vouloir annuler ce produit
                                    </Modal>
                                    <Modal onClose={()=>setShowModalPartiel(null)} show={showModalPartiel === productitem.Id_order_product} onConfirm={()=> {handleCancelProducer(productitem.Id_order_product)
                                    setShowModalPartiel(null)
                                    setReload(!reload)
                                    }}>
                                        Le producteur à commencer à travaller sur votre produit, le remboursement se fera partielemnt celons l&apos;avancer du produit (jour ouvré), êtes vous sur de vouloir continuer ?
                                    </Modal>
                                </div>
                            )
                        })} 
                  
                        <Modal onClose={()=>setShowModal(null)} show={showModal === orderItem.Id_order} 
                        onConfirm={()=>{handleCancel(orderItem.Id_order,orderItem.payment_id,orderItem.price,orderItem.refund,orderItem.orderproducts,orderItem.user,orderItem.order_state)
                            setShowModal(null)
                            setReload(!reload)
                        }}>
                            êtes vous sur de vouloir annuler cette commande
                        </Modal>
                        </div>
                        <OrderCancelorFinsih state={orderItem.order_state} id={orderItem.Id_order} />
                        {/* {(orderItem.order_state !== 'canceled' || orderItem.order_state !== 'finsih') && orderItem.order_state === 'Pay' ? <button onClick={()=>setShowModal(orderItem.Id_product)}>Annuler la commande</button> : <div> Commande annulé </div>} */}
                  
                    </div>
                )
            })
            : <div> Pas d&apos;historique de commandes</div>}
        </div>
    )
}