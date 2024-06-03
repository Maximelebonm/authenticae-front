import { InitRequest } from "../initRequest";
import ky from "ky";

export const getRoles = async () => {
    try {
        const user = await ky.get(`${InitRequest()}/roles`,{credentials : 'include'})
        return user
    } catch (err){
        return "erreur : " + err;
    }
}