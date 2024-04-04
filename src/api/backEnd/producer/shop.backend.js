import { InitRequest } from "../../initRequest";
import ky from "ky";

export const createShop = async (id,name, description) => {
    try {
        const response = await ky.post(`${InitRequest()}/shop/create/${id}`,{
            json : {
                name : name,
                description : description,
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const getShop = async (id) => {
    try {
        const userList = await ky.get(`${InitRequest()}/shop/${id}`,
        {credentials : 'include'})
        return userList
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateShop = async (id,name, description) => {
    try {
        const response = await ky.put(`${InitRequest()}/shop/update/${id}`,{
            json : {
                name : name,
                description : description,
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}