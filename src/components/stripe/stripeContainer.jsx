import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckOutForm } from "./checkoutForm";

export const StripeComponent = ({props})=> {
    let Public_Key
    if(import.meta.env.VITE_MODE === 'developpment'){
       Public_Key = import.meta.env.VITE_STRIPE_TEST_PUBLIC
    } else if(import.meta.env.VITE_MODE === 'production'){
        Public_Key = import.meta.env.VITE_STRIPE_PUBLIC
    }
    const stripePromise = loadStripe(Public_Key)

    return (
    <Elements stripe={stripePromise} className='checkoutContainer'>
        <CheckOutForm props={props} />
    </Elements>
    )
}