import { InitRequest } from "../../initRequest";
import ky from "ky";

export const createProduct = async (Id_user,Id_shop,name, description) => {
    try {
        const response = await ky.post(`${InitRequest()}/product/create/${Id_user}`,{
            json : {
                Id_user : Id_user,
                Id_shop : Id_shop,
                name : name,
                description : description,
            },
            credentials : 'include',
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const getProductAndOption = async()=> {

}

export const getProduct = async (id) => {
    try {
        const shop = await ky.get(`${InitRequest()}/product/${id}`,
        {credentials : 'include'})
        return shop
    } catch (err){
        return "erreur : " + err;
    }
}

export const getAllProduct = async () => {
    try {
        const productList = await ky.get(`${InitRequest()}/product`,
        {credentials : 'include'})
        return productList
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateProduct = async (id,productName,productDescription,productSpecification,producmaterial,productPrice,productQuantity,formOptionObject) => {
    console.log('update')
    try {
        const response = await ky.put(`${InitRequest()}/product/update/${id}`,{
            json : {
                name : productName,
                description : productDescription,
                specification : productSpecification,
                Id_material : producmaterial,
                price : productPrice,
                quantity : productQuantity,
                options : formOptionObject,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const updatePicturesProduct = async (id,formData) => {
    console.log('passe api', id, formData)
    try {
        const response = await ky.post(`${InitRequest()}/product/uploadPictures/${id}`,{
            body: formData,
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteProduct = async (id) => {
    console.log('passe api', id)
    try {
        const response = await ky.delete(`${InitRequest()}/product/delete/${id}`,{
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}