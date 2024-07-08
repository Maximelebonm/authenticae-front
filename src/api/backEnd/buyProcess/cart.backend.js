import { InitRequest } from "../../initRequest";
import ky from "ky";

export const addCartApi = async(formObject,finalPrice)=>{
    console.log('pass')
    console.log(finalPrice)
    console.log(formObject)
    try {
        const cartCreate = ky.post(`${InitRequest()}/cart/cartcontrol`,{
            json: {
                state : 'add',
                product : {
                    price : finalPrice,
                    quantity : formObject.product.quantity,
                    Id_product : formObject.product.Id_product
                },
                personalizations : formObject.personalization,
                options : formObject.options,
            },
            credentials : 'include'
        })
        return cartCreate
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCartApi = async(id)=>{
    console.log(id)
    try {
        return await ky.get(`${InitRequest()}/cart/${id}`,{credentials : 'include'})
    } catch (err){
        console.log('erreur')
        return "erreur : " + err;
    }
}

export const deleteCartApi = async(idcartProduct,idPersonalization,idsOptions)=>{
    try {
        return ky.post(`${InitRequest()}/cart/cartcontrol/`,{
            json: {
                state : 'delete',
                product : {
                    id : idcartProduct.id,
                    price : idcartProduct.price,
                },
                options : idsOptions,
                personalizations : idPersonalization,

            },
            credentials : 'include'
        })
    } catch (error) {
        console.log(error)
        return error
    }
}