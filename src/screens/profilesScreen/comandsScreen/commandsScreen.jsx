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
    const [showModal, setShowModal] = useState(false);
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [showModalPartiel, setShowModalPartiel] = useState(false);

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

    const handleCancelProduct = (idOrder,idPayment,amount,idproduct,priceproduct,refund)=> {
        const fetch = async()=>{
            const resp = await stripeCancelProductApi(idOrder,idPayment,amount,idproduct,priceproduct,refund)
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
            const fetch = async()=>{
                const resp = await cancelProductInProgressApi(id)
                if(resp.message == "produit en cours d'annulation"){
                    toast.success("votre produit est en cours d'annulation, vous serez contacter par mail lorsque cela sera le cas")
                }
            }
            fetch()
        }

        const CancelReturn = ({state})=> {
            if(state !== 'canceled' && state == 'wait'){
                return <button onClick={()=>{toggleModal('product')}}>Annuler le produit</button>
            }
            if(state !== 'canceled' && state == 'production'){
                return <button onClick={()=>{toggleModal('partial')}}>Annuler le produit (remboursement partiel)</button>
            }
            else {
                return <div>produit annulé</div>
            }
        }
        console.log(myorder)

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
                                        <CancelReturn state={productitem.order_state}/>
                                    {/* {productitem.order_state !== 'canceled' && productitem.order_state == 'wait' ? <button onClick={()=>{toggleModal('product')}}>Annuler le produit</button> : <div>produit annulé</div>}
                                    {productitem.order_state !== 'canceled' && productitem.order_state == 'produciton' ? <button onClick={()=>{toggleModal('product')}}>Annuler le produit</button> : <div>produit annulé</div>} */}
                                    </div>
                                    <Modal onClose={()=>setShowModalProduct(!showModalProduct)} show={showModalProduct} onConfirm={()=>handleCancelProduct(orderItem.Id_order,orderItem.payment_id,orderItem.price,productitem.Id_order_product,productitem.price,orderItem.refund,orderItem)}>
                                        êtes vous sur de vouloir annuler ce produit
                                    </Modal>
                                    <Modal onClose={()=>setShowModalPartiel(!showModalPartiel)} show={showModalPartiel} onConfirm={()=>handleCancelProducer(productitem.Id_order_product)}>
                                        Le producteur à commencer à travaller sur votre produit, le remboursement ne pourra être que partiel, êtes vous sur de vouloir continuer ?
                                    </Modal>
                                </div>
                            )
                        })} 
                        
                        <Modal onClose={()=>setShowModal(!showModal)} show={showModal} onConfirm={()=>handleCancel(orderItem.Id_order,orderItem.payment_id,orderItem.price,orderItem.refund,orderItem.orderproducts)}>
                            êtes vous sur de vouloir annuler cette commande
                        </Modal>
                        </div>
                        {orderItem.order_state && <button onClick={()=>toggleModal('commande')}>Annuler la commande</button>}
                    </div>
                )
            })
            : <div> Pas d&apos;historique de commandes</div>}
        </div>
    )
}