import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getMrApi = async ()=> {
    try {
        const response = await ky.post(`${InitRequest()}/mr/test`,{
            credentials : 'include'
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}