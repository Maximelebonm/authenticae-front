import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getAllTvaApi = async () => {
    try {
        const tva = await ky.get(`${InitRequest()}/tva/`,
        {credentials : 'include'})
        return tva
    } catch (err){
        return "erreur : " + err;
    }
}
