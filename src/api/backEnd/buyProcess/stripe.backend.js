import { InitRequest } from "../../initRequest";
import ky from "ky";

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

export const stripeCancelApi = (id,idP,amount,refund,products,user,order_state)=> {
    try {
        const stripeReq = ky.post(`${InitRequest()}/order/stripe/cancel/${id}`,{
            json : {
                paymentid : idP,
                amount : amount,
                refund : refund,
                products : products,
                user : user,
                order_state : order_state
            },
            credentials : 'include'
        })
        return stripeReq.json()
    } catch (error) {
        console.log(error)
        return error.json()
    }
}

export const stripeCancelProductApi = (idorder,idPaiment,amount,idproduct,priceproduct,refund,productAccount,user)=> {
    try {
        console.log("pass")
        const stripeReq = ky.post(`${InitRequest()}/order/stripe/cancel/product/${idproduct}`,{
            json : {
                paymentid : idPaiment,
                amountCommand : amount,
                Id_order : idorder,
                amountProduct : priceproduct,
                refund : refund,
                productAccount : productAccount,
                user : user,           
            },
            credentials : 'include'
        })
        return stripeReq.json()
    } catch (error) {
        console.log(error)
        return error.json()
    }
}
