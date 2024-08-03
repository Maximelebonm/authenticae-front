import { useState } from 'react'
import './commandsScreen.css'
import { useEffect } from 'react'

import { toast } from 'react-toastify';
import { useAuthContext } from '../../authContext';
import { getUserCommandsApi } from '../../../api/backEnd/buyProcess/order.backend';

export const CommandsScreen = ()=> {
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;
    const {userDetails} = useAuthContext();
    const [myorder,setMyOrder] = useState()
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

    return (
        <div id='commandsScreenContainer'>
            {myorder != null ? myorder.map((orderItem,orderindex)=>{
                
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
                                </div>
                            )
                        })}
                        
                        </div>
                        {orderItem.order_state &&<button>Annuler la commande</button>}
                    </div>
                )
            })
            : <div>Pas d&apos;historique de commandes</div>}
        </div>
    )
}