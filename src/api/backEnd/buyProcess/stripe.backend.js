import { InitRequest } from "../../initRequest";
import ky from "ky";
//req.body.cart.price
export const paymentStripeApi = (id,price,cart, user, address_delivery,address_billing)=> {
    try {
        const stripeReq = ky.post(`${InitRequest()}/order/stripe/charge`,{
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

export const stripeCancelApi = (id,idP,amount,refund,products)=> {
    try {
        const stripeReq = ky.post(`${InitRequest()}/order/stripe/cancel/${id}`,{
            json : {
                paymentid : idP,
                amount : amount,
                refund : refund,
                products : products,
            },
            credentials : 'include'
        })
        return stripeReq.json()
    } catch (error) {
        console.log(error)
        return error.json()
    }
}

export const stripeCancelProductApi = (id,idP,amount,idproduct,priceproduct,refund)=> {
    try {
        console.log("pass")
        const stripeReq = ky.post(`${InitRequest()}/order/stripe/cancel/product/${id}`,{
            json : {
                paymentid : idP,
                amountCommand : amount,
                id_product : idproduct,
                amountProduct : priceproduct,
                refund : refund,           
            },
            credentials : 'include'
        })
        return stripeReq.json()
    } catch (error) {
        console.log(error)
        return error.json()
    }
}
