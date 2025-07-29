import { useState } from "react";
import './deliveryScreen.css';
import { useOrder } from "../orderContext";
import MondialRelayMapSelector from "../../../components/MrIntegration/MrIntegration";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../authContext";
import { use } from "react";


export const DeliveryScreen = () => {
  const [load, setLoad] = useState(false);
  const [dataPicker,setDataPeaker] = useState();

      const [parcelSelect, setParcelSelect] = useState(null);

const navigate = useNavigate();
  const { orderDetails, setOrderDetails } = useOrder();
     const { userDetails } = useAuthContext();
  const [selectedLivraisonMode ,setSelectedLivraisonMode] = useState();
  const [selectedAddressFacturation, setSelectedAddressFacturation] = useState();

  const fetchMrConfig = async () => {
    
    if(parcelSelect === null){
      return toast.error('Veuillez sélectionner un point relais avant de continuer', { autoClose: 3000 });
    } 
    if(parcelSelect){
      
      setOrderDetails({ ...orderDetails, 
        livraisonMode: selectedLivraisonMode,
        livraisonPrice : priceDelivery.toFixed(2),
        address_delivery: parcelSelect,
        cart : {...orderDetails.cart, price: totalPrice.toFixed(2)},
      });
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }
    navigate('/cartvalidation');


    // const response = await getMrApi(dataPicker)
  }
  
    const handleSelectMode = (e,item) => {
        e.target
        setOrderDetails({...orderDetails, livraisonMode : item})
        setSelectedLivraisonMode(item)
    }

        const handleSelect = (e,item,obj) => {
            e.target
            // if(obj === 'livraison'){
            //     setOrderDetails({...orderDetails, address_billing : item})
            //     setSelectedAddressLivraison(item)
    
            // }
            if(obj === 'facturation'){
                setOrderDetails({...orderDetails, address_billing : item})
                setSelectedAddressFacturation(item)
            }
        }

  console.log(orderDetails)
  console.log(userDetails)
        const quantityProduct = orderDetails.cart.cartProduct.reduce((acc, item) => acc + item.quantity, 0);
  const priceDelivery = 2.99 * (quantityProduct)
  const totalPrice = orderDetails.cart.price + priceDelivery;

  return (
    <>
    <ToastContainer/>
    <div>
      <h2>Veuillez choisir votre mode de livraison</h2>
      <form>
        <div className="deliverySelect">
          <label> Mondial relais + {priceDelivery}€  </label>
          <input name="LivraisonMode" type="radio" onClick={(e)=>handleSelectMode(e,'Mondial Relay')} value={'Mondial Relay'}/>
        </div>
            <div className="deliverySelect">
          <label> colissimo (arrive bientôt)</label>
          {/* <input name="LivraisonMode" type="radio" onClick={(e)=>handleSelectMode(e,'colissimo')} value={'colissimo'}/> */}
        </div>
        <div className="deliverySelect">
          <label> remise en mains propre (arrive bientôt)</label>
          {/* <input type="radio" name="LivraisonMode" onClick={(e)=>handleSelectMode(e,'hand')} value={'hand'}/> */}
        </div>
      </form>
    </div>

    { selectedLivraisonMode === 'Mondial Relay' &&

    <>
      <MondialRelayMapSelector onParcelShopSelect={setParcelSelect}/>

      <form>
      </form>
    </>
      }

      <h2>Votre addresse</h2>
        <div>
           {userDetails.addresses.length === 0 ?
           <div>
                <h2>Vous devez avoir une addresse enregistrer</h2>
                <button onClick={()=>{navigate('/profil')}}>Ajouter une adresse</button>
            </div>
            :
            userDetails.addresses.map((item,index) => {
            return (
              <div key={index} className="addressContainer">
                <label>{item.country} {item.number} {item.street} {item.cityCode} {item.city}</label>
                <input type="radio" name="addressBilling" onClick={(e)=>handleSelect(e,item,'facturation')} value={item.Id_address}/>
              </div>
            )
          })}
        </div>

    {
      selectedLivraisonMode === 'Mondial Relay' && orderDetails?.address_billing?.Id_address &&
      <button onClick={() => fetchMrConfig()}>Suivant</button>
    }
    </>
  );
};