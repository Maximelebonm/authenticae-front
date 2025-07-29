import { useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement } from "@stripe/react-stripe-js";
import { paymentStripeApi } from "../../api/backEnd/buyProcess/stripe.backend";
import { useNavigate } from "react-router-dom";
import './checkOutForm.css'
import Logo from '../../assets/logos/logo_authenticae_noir_cut.png';

export const CheckOutForm = ({props}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    let clicked = 0
    const {cart,user,userChoicePaymentMethod,address_billing,address_delivery,livraisonMode,livraisonPrice} = props
    if(Object.keys(cart).length === 0){
        console.log('vide')
        navigate('/cart')
    }
    console.log(props)

    const handleSubmit = async (e)=> {
        e.preventDefault()
        if(clicked == 0){
            clicked = 1
                  if (!stripe || !elements) {
                      console.log("Stripe.js n'a pas encore été chargé.");
                      return;
                  }
          
                  const cardElement = elements.getElement(CardNumberElement,CardExpiryElement,CardCvcElement);
                  if (!cardElement) {
                      console.log("CardElement n'est pas disponible.");
                      return;
                  }
                  try {
                      const { error, paymentMethod } = await stripe.createPaymentMethod({
                          type: "card",
                          card: cardElement,
                      });
          
                      if (error) {
                          console.error("Erreur de génération du token :", error.message);
                      } else {
                          console.log("Token généré :", paymentMethod);
                          try {
                              const {id} = paymentMethod
                              const priceInCents = Math.round(cart.price * 100)
                              
                              const response = await paymentStripeApi(id,priceInCents, cart, user,address_delivery,address_billing,livraisonMode)
                              response.json()
                              .then((data)=>{
                                  console.log(data.success)
                                  if(data.success){
                                      navigate('/paiement/success')
                                  }
                              })
                          } catch (error) {
                              console.log(error)
                          }
                      }
                  } catch (err) {
                      console.error("Erreur inattendue :", err.message);
                  }

        }
   
    }

    return(
        <div className="checkoutContainer">
        <img src={Logo} id={'logoCommande'} />
        <form onSubmit={handleSubmit} className='checkOutForm'>
            <div className='checkoutLineContainter'>

            {cart.cartProduct.map((item,index)=>{
                return (
                    <div key={index}>
                        <div className='checkoutLine'>
                            <div>{item.product.name} x {item.quantity}</div>
                            <div>{item.price} €</div>  
                        </div>
                    </div>
                )
            })}
            <div  className='checkoutLine'> <div> Livraison (2.99 € / article) : </div> {livraisonPrice} € </div>
            <div className="checkOutformRecap"> TOTAL : {cart.price} € TTC</div>
            </div>
            <div id="checkoutCardNumber">N° de carte bancaire</div>
            <CardNumberElement/>
            <div className="checkoutDateContainer">
            <div className="checkoutDate">
                <div>date d&apos;expiration</div>
                <CardExpiryElement/>

            </div>
            <div className="checkoutsecurity">
                <div >Code de sécurité</div>
                <CardCvcElement/>
            </div>

            </div>
            <button id="checkoutButton" type='submit'>Payer {cart.price} €</button>
        </form>

        </div>
    )

}