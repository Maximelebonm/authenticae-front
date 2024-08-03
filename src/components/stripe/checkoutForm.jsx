import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { paymentStripeApi } from "../../api/backEnd/buyProcess/stripe.backend";
import { useNavigate } from "react-router-dom";
import './checkOutForm.css'

export const CheckOutForm = ({props}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const {cart,user,userChoicePaymentMethod,address_billing,address_delivery} = props
    console.log(props)
    const handleSubmit = async (e)=> {
        e.preventDefault()

        if (!stripe || !elements) {
            console.log("Stripe.js n'a pas encore été chargé.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
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
                    const priceInCents = cart.price * 100
                    const response = await paymentStripeApi(id,priceInCents, cart, user,address_delivery,address_billing)
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

    return(
        <form onSubmit={handleSubmit} className='checkOutForm'>
            <div className="checkOutformRecap">Montant à payer : {cart.price} €</div>
            <CardElement
                options={{
                    hidePostalCode : false,
                    disableLink : true,
                }}
            />
            <button type='submit'>Payer</button>
        </form>
    )

}