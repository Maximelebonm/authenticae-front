import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckOutForm } from "./checkoutForm";

export const StripeComponent = ({props})=> {
    let public_Key
    if(process.env.NODE_ENV === 'development'){
       public_Key = import.meta.env.VITE_STRIPE_TEST_PUBLIC
    } else if(process.env.NODE_ENV === 'production'){
        public_Key = import.meta.env.VITE_STRIPE_PUBLIC
    }
    console.log(public_Key)
    const stripePromise = loadStripe(public_Key)

    return (
    <Elements stripe={stripePromise} className='checkoutContainer'>
        <CheckOutForm props={props} />
    </Elements>
    )
}