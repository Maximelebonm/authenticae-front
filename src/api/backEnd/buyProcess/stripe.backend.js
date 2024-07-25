import { InitRequest } from "../../initRequest";
import ky from "ky";
//req.body.cart.price
export const paymentStripeApi = (id,price,cart, user, address_delivery,address_billing)=> {
    try {
        const stripeReq = ky.post(`${InitRequest()}/payment/stripe/charge`,{
            json : {
                amount : price,
                id : id,
                cart : cart,
                products : cart.cartProduct,
                user : user,
                address_delivery : address_delivery.Id_address,
                address_billing : address_billing.Id_address,
            },
            credentials : 'include'
        })
        return stripeReq
    } catch (error) {
        console.log(error)
        return error
    }
}

export const stripeOnBoradingApi = (id)=> {
    try {
        const stripeReq = ky.post(`${InitRequest()}/admin/create-express-account/${id}`,{
            credentials : 'include'
        })
        return stripeReq
    } catch (error) {
        console.log(error)
        return error
    }
}