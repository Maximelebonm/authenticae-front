import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getOrderApi = async (id)=> {
    try {
        const response = await ky.get(`${InitRequest()}/order/producer/${id}`,{
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

// prise en charge du produit
export const inProductionApi = (id,email,firstname,productname)=>{
    try {
        const req = ky.post(`${InitRequest()}/order/producer/accepted/${id}`,{
            json : {
                email : email,
                firstname : firstname,
                productname : productname
            },
            credentials : 'include'
        })
        return req
    } catch (error) {
        return error
    }
}

// annulation de la prise en charge du produit
export const cancelProductionApi = (id,email,firstname,productname)=>{
    try {
        const req = ky.post(`${InitRequest()}/order/producer/cancelAccepted/${id}`,{
            json : {
                email : email,
                firstname : firstname,
                productname : productname,
            },
            credentials : 'include'
        })
        return req
    } catch (error) {
        return error
    }
}

// envoie du produit
export const sendProductApi = (id,email,idPayment,stripeId,price,userName,productName,productAccount,idOrder)=>{
    try {
        console.log(idOrder)
        const req = ky.post(`${InitRequest()}/order/producer/send/${id}`,{
            json : {
                email : email,
                IdPayement : idPayment,
                stripe_ID : stripeId,
                amountProduct : price,
                firstname : userName,
                productname : productName,
                productAccount : productAccount,
                Id_order : idOrder
            },
            credentials : 'include'
        })
        return req
    } catch (error) {
        return error
    }
}

export const cancelSendProductApi = (id,email)=>{
    try {
        console.log("pass")
        const req = ky.post(`${InitRequest()}/order/producer/cancelsend/${id}`,{
            json : {
                email : email,
            },
            credentials : 'include'
        })
        return req
    } catch (error) {
        return error
    }
}

export const getUserCommandsApi = async(id)=> {
    try {
        const resp = await ky.get(`${InitRequest()}/order/usercommands/${id}`,{
            credentials : 'include'
        })
        return resp.json()
    } catch (error) {
        return error
    }
}

export const cancelProductInProgressApi = async (id)=>{
    try {
        console.log("pass")
        const req = await ky.post(`${InitRequest()}/order/producer/working_progress/${id}`,{
            credentials : 'include'
        })
        return req.json()
    } catch (error) {
        return error
    }
}

export const cancelProductWithPurcentApi = async(idOrderProduct,percent,idPayement,refundAmount,productPrice,Id_order,productaccount)=>{
    try {
        const req = await ky.post(`${InitRequest()}/order/cancelpercent/${idOrderProduct}`,{
            json : {
                percent : percent,
                idpayement : idPayement,
                refundAmount : refundAmount,
                productPrice : productPrice,
                Id_order : Id_order,
                productaccount : productaccount,
            },
            credentials : 'include'
        })
        return req.json()
    } catch (error) {
        return error
    }
}