import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckOutForm } from "./checkoutForm";



export const StripeComponent = ({props})=> {
    const Public_Key = import.meta.env.VITE_STRIPE_TEST_PUBLIC
    const stripePromise = loadStripe(Public_Key)
    return (
    <Elements stripe={stripePromise} >
        <CheckOutForm props={props} />
    </Elements>
    )
}