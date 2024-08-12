import { useState } from 'react'
import './commandsScreen.css'
import { useEffect } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import { useAuthContext } from '../../authContext';
import { cancelProductInProgressApi, getUserCommandsApi } from '../../../api/backEnd/buyProcess/order.backend';
import { stripeCancelApi, stripeCancelProductApi } from '../../../api/backEnd/buyProcess/stripe.backend';
import Modal from '../../../components/modals/modal';

export const CommandsScreen = ()=> {
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;
    const {userDetails} = useAuthContext();
    const [myorder,setMyOrder] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [showModalProduct, setShowModalProduct] = useState(null);
    const [showModalPartiel, setShowModalPartiel] = useState(null);

    const toggleModal = (obj) => {
        if(obj === 'commande'){
            setShowModal(!showModal)
        }
        if(obj === 'partial'){
            setShowModalPartiel(!showModalPartiel)
        }
        else {
            setShowModalProduct(!showModalProduct)
        }
      };

    useEffect(()=>{
        const fetchCommands = async () => {
            if (userDetails && userDetails.user && userDetails.user.Id_user) {
                try {
                    const userId = userDetails.user.Id_user;
                    console.log(userId);
                    await getUserCommandsApi(userId)
                    .then((data)=>{
                        if (data.message === 'commandsgeted') {
                            console.log(data)
                            setMyOrder(data.data);
                        }
                    })
                } catch (error) {
                    console.error('Error fetching commands:', error);
                }
            } else {
                console.log('User details are not defined yet');
            }
        };

        fetchCommands();
    },[userDetails])

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
    console.log(myorder)

    const handleCancel = (idOrder,idPayment,amount,refund,product)=> {
        const fetch = async()=>{
            const resp = await stripeCancelApi(idOrder,idPayment,amount,refund,product)
                if(resp.message === "commande annulé"){
                    toast.success("commande annulé", {autoClose : 3000})
                    setShowModal(!showModal);
                } else {
                    toast.error('une erreure est survenue', {autoClose : 3000})
                    setShowModal(!showModal);
                }
            }
            fetch()
        }

    const handleCancelProduct = (idOrder,idPayment,amount,idproduct,priceproduct,refund,productAccount)=> {
        const fetch = async()=>{
            const resp = await stripeCancelProductApi(idOrder,idPayment,amount,idproduct,priceproduct,refund,productAccount)
                if(resp.message === "produit annulé"){
                    toast.success("produit annulé", {autoClose : 3000})
                    setShowModal(!showModal);
                } else {
                    toast.error('une erreure est survenue', {autoClose : 3000})
                    setShowModal(!showModal);
                }
            }
            fetch()
        }

        const handleCancelProducer = (id)=> {
            console.log(id)
            const fetch = async()=>{
                const resp = await cancelProductInProgressApi(id)
                if(resp.message == "produit en cours d'annulation"){
                    toast.success("votre produit est en cours d'annulation, vous serez contacter par mail lorsque cela sera le cas")
                }
            }
            fetch()
        }

        const CancelReturn = ({state,id})=> {
            if(state !== 'canceled' && state == 'wait'){
                return <button onClick={()=>{setShowModalProduct(id)}}>Annuler le produit</button>
            }
            if(state !== 'canceled' && state == 'production'){
                return <button onClick={()=>{setShowModalPartiel(id)}}>Annuler le produit (remboursement partiel)</button>
            }
            else {
                return <div>produit annulé</div>
            }
        }
        console.log('modalId :'  + showModalPartiel)

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
                            console.log(productitem.Id_order_product)
                            return (
                                <div key={productindex} className='commandProductContainer'>
                                    <div className='commandProduct'>
                                        <h2>{productitem.product.name}</h2>
                                        <img src={Base_URL + productitem.product.productImages[0].storage} />
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
                                    <Modal onClose={()=>setShowModalProduct(null)} show={showModalProduct === productitem.Id_order_product} onConfirm={()=>handleCancelProduct(orderItem.Id_order,orderItem.payment_id,orderItem.price,productitem.Id_order_product,productitem.price,orderItem.refund,orderItem.orderproducts.length)}>
                                        êtes vous sur de vouloir annuler ce produit
                                    </Modal>
                                    <Modal onClose={()=>setShowModalPartiel(null)} show={showModalPartiel === productitem.Id_order_product} onConfirm={()=> handleCancelProducer(productitem.Id_order_product)}>
                                        Le producteur à commencer à travaller sur votre produit, le remboursement ne pourra être que partiel, êtes vous sur de vouloir continuer ?
                                    </Modal>
                                </div>
                            )
                        })} 
                  
                        <Modal onClose={()=>setShowModal(null)} show={showModal === orderItem.Id_order} onConfirm={()=>handleCancel(orderItem.Id_order,orderItem.payment_id,orderItem.price,orderItem.refund,orderItem.orderproducts)}>
                            êtes vous sur de vouloir annuler cette commande
                        </Modal>
                        </div>
                        {orderItem.order_state !== 'canceled' ? <button onClick={()=>setShowModal(orderItem.Id_product)}>Annuler la commande</button> : <div> Commande annulé </div>}
                    </div>
                )
            })
            : <div> Pas d&apos;historique de commandes</div>}
        </div>
    )
}