import './cartValidationScreen.css'
import { useState } from "react"
import { useOrder } from '../orderContext';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const CartValidationScreen = () => {
    const { orderDetails, setOrderDetails } = useOrder();

    const navigate = useNavigate()
    const [adress,setadress] = useState(orderDetails?.user.addresses)
    const [selectedAddressFacturation, setSelectedAddressFacturation] = useState(null);
    const [selectedAddressLivraison, setSelectedAddressLivraison] = useState(null);

    const handlePaiment = ()=> {
        const isObjectNotEmpty = (obj) => {
            return obj && Object.keys(obj).length > 0;
        }
        if (isObjectNotEmpty(orderDetails.address_billing) && isObjectNotEmpty(orderDetails.address_delivery)) {
            navigate('/paiement');
        } else {
            toast.error("Sélectionnez une adresse de livraison et de facturation", { autoClose: 3000 });
        }
    }

    const handleSelect = (e,item,obj) => {
        e.target
        if(obj === 'livraison'){
            setOrderDetails({...orderDetails, address_billing : item})
            setSelectedAddressLivraison(item)

        }
        if(obj === 'facturation'){
            setOrderDetails({...orderDetails, address_delivery : item})
            setSelectedAddressFacturation(item)
        }
    }

    return (
        <div className="cartValidationContainer">
        <ToastContainer/>
            <h2>Veuillez valider / choisir vos adresses</h2>
            <div>
        <div id='carValidItemContianer'>
            <div className = 'cartValidItem'>
                <h3>adresse de facturation</h3>
                {adress?.map((item,index)=>{
                    return (
                        <form className='cartValidationAddressContainer' key={index}>
                            <div onClick={(e)=>handleSelect(e,item,'livraison')} className={selectedAddressLivraison === item ? 'selected' : ''}>
                                <div>
                                    {item.country}
                                </div>
                                <div>
                                    {item.number + ' '}
                                    {item.street + ' '}
                                    {item.additional}
                                </div>
                                <div>
                                    {item.cityCode + ' '}
                                    {item.city}           
                                </div>
                            </div>
                        </form>
                    )
                })}
            </div>
            <div className = 'cartValidItem'>
                <h3>adresse de Livraison</h3>
                {adress?.map((item,index)=>{
                    return (
                        <form className='cartValidationAddressContainer' key={index}>
                            <div onClick={(e)=>handleSelect(e,item,'facturation')} className={selectedAddressFacturation === item ? 'selected' : ''}>
                                <div>
                                    {item.country}
                                </div>
                                <div>
                                    {item.number + ' '}
                                    {item.street + ' '}
                                    {item.additional}
                                </div>
                                <div>
                                    {item.cityCode + ' '}
                                    {item.city}           
                                </div>
                            </div>
                        </form>
                    )
                })}
            </div>
        </div>
        </div>
            <button onClick={()=> {handlePaiment()}} >Passez au paiement</button>
            <button onClick={()=> navigate('/profil')} >Modifier les addresses</button>
        </div>
    )
}