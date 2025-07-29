import { InitRequest } from "../../initRequest";
import ky from "ky";

export const getMrApi = async (props)=> {
    try {
        const response = await ky.post(`${InitRequest()}/mr/test`,{
            json : {
                data : props
            },
            credentials : 'include'
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const createLabelMrApi = async (plocation,plocationName,puser,pnumberFacture,pidOrderProduct)=> {
    try {
        console.log(plocation,plocationName,puser,pnumberFacture,pidOrderProduct)
        const response = await ky.post(`${InitRequest()}/mr/createLabel`,{
            json : {
                location : plocation,
                locationName : plocationName,
                user : puser,
                numberFacture : pnumberFacture,
                Id_order_product : pidOrderProduct
            },
            credentials : 'include'
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}