import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getMaterial = async (id) => {
    try {
        const material = await ky.get(`${InitRequest()}/material/${id}`,
        {credentials : 'include'})
        return material
    } catch (err){
        return "erreur : " + err;
    }
}

export const getAllmaterials = async () => {
    try {
        const materialList = await ky.get(`${InitRequest()}/material`,
        {credentials : 'include'})
        return materialList
    } catch (err){
        return "erreur : " + err;
    }
}