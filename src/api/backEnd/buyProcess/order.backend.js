import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getOrderApi = async (id)=> {
    try {
        console.log("order pass" , id)
        const response = await ky.get(`${InitRequest()}/order/producer/${id}`,{
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const inProductionApi = (id,email)=>{
    try {
        console.log("pass")
        const req = ky.post(`${InitRequest()}/order/producer/accepted/${id}`,{
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

export const cancelProductionApi = (id,email)=>{
    try {
        const req = ky.post(`${InitRequest()}/order/producer/cancelAccepted/${id}`,{
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

export const sendProductApi = (id,email)=>{
    try {
        console.log("pass")
        const req = ky.post(`${InitRequest()}/order/producer/send/${id}`,{
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