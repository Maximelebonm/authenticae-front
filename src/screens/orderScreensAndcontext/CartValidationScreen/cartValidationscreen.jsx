import { useEffect } from "react"
import './cartValidationScreen.css'
import { useState } from "react"
import { useOrder } from '../orderContext';
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../api/backEnd/user.backend";
import { decodeCookies } from "../../../helpers/decodeToken";
import { toast, ToastContainer } from "react-toastify";

export const CartValidationScreen = () => {
    const { orderDetails, setOrderDetails } = useOrder();
    console.log(orderDetails)
    const navigate = useNavigate()
    const [adress,setadress] = useState()
    const [selectedAddressFacturation, setSelectedAddressFacturation] = useState(null);
    const [selectedAddressLivraison, setSelectedAddressLivraison] = useState(null);

    const isEmptyObject = (obj) => {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    useEffect(() => {
        if (isEmptyObject(orderDetails.cart)) {
            console.log('Cart is empty');
            navigate('/cart');
        }

        const cookies = document.cookie.split('; ')
                let authCookie = null
                for (let cookie of cookies) {
                    if (cookie.startsWith('auth=')) {
                        // Extraire la valeur du cookie après le signe '='
                        authCookie = cookie.substring('auth='.length);
                        break;
                    }
                }
                const cookie = decodeCookies(authCookie) 
                console.log(cookie)
        if(cookie){
            const fetch = async ()=>{
                const getUser = await getUserById(cookie.Id_user)
                console.log(getUser)
                if(getUser){
                    getUser.json()
                    .then((data)=>{
                        setOrderDetails({...orderDetails,user : data})
                        setadress(data.addresses)     
                    })
                }
            }
            fetch()
        } 

    }, [navigate]);

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
            Veuillez valider / choisir vos adresses
            <div>
            adresse de facturation
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
        <div>
            adresse de Livraison
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
            <button onClick={()=> {handlePaiment()}} >Passez au paiement</button>
            <button onClick={()=> navigate('/profil')} >Modifier les addresses</button>
        </div>
    )
}