import { InitRequest } from "../initRequest";
import ky from "ky";

export const addAddressApi = async (formObject,id) => {
    console.log(formObject.formCountry)
    try {
        const response = await ky.post(`${InitRequest()}/address/create/${id}`,{
            json : {
                country : formObject.formCountry,
                city : formObject.formCity,
                cityCode : formObject.formCitycode,
                number : formObject.formNumber,
                street : formObject.formStreet,
                additional :formObject.formAdditional,
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteAdressApi = async(Id_address)=>{
    try {
        const response = await ky.put(`${InitRequest()}/address/delete/${Id_address}`,{
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}
