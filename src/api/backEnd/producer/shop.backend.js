import { decodeCookies } from "../../../helpers/decodeToken";
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
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const getShop = async (id) => {
    try {
        const shop = await ky.get(`${InitRequest()}/shop/${id}`,
        {credentials : 'include'})
        return shop
    } catch (err){
        return "erreur : " + err;
    }
}

export const getShopByIdAPI = async (id) => {
    try {
        const shop = await ky.get(`${InitRequest()}/shop/find/${id}`,
        {credentials : 'include'})
        return shop
    } catch (err){
        return "erreur : " + err;
    }
}

export const getAllShop = async () => {
    try {
        const shopList = await ky.get(`${InitRequest()}/shop`,
        {credentials : 'include'})
        return shopList
    } catch (err){
        return "erreur : " + err;
    }
}
export const updateShop = async (id,name,description) => {
   
    try {
        const response = await ky.put(`${InitRequest()}/shop/update/${id}`, {
            json : {
                name : name,
                description : description,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateAvatarShop = async (id,formData,route) => {
    console.log('passe api')
    try {
        const response = await ky.post(`${InitRequest()}/shop/${route}/${id}`,{
            body: formData,
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}