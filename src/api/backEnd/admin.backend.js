import { InitRequest } from "../initRequest";
import ky from "ky";

export const addProducerRole = async (id) => {
    try {
        const response = await ky.post(`${InitRequest()}/admin/producer/role/add/${id}`,{
            json : {
                role : 'producer'
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteProducerRole = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/producer/role/delete/${id}`,{
            json : {
                role : 'producer'
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}