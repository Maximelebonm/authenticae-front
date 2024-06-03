import { InitRequest } from "../initRequest";
import ky from "ky";

export const updateCart = async(Id_product,quantitySelected,quantityReserved,price)=> {
    try {
        const user = await ky.post(`${InitRequest()}/cart/update/${Id_product}`,{
            json: {
                pseudo: pseudo,
            },
            credentials : 'include'
        })
        return user
    } catch (err){
        return "erreur : " + err;
    }
}