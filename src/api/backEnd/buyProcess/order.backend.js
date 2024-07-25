import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getOrderApi = async (id)=> {
    try {
        console.log("order pass" , id)
        const response = await ky.get(`${InitRequest()}/payment/producer/${id}`,{
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}