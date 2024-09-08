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

export const updateProduct = async (id,productName,productDescription,productSpecification,producmaterial,productPrice,productQuantityAvailable,productQuantityReservation,formOptionObject,formPersonalizationObject,producOnCommand,productWorkingDays) => {
    console.log(producOnCommand)
    try {
        const response = await ky.put(`${InitRequest()}/product/update/${id}`,{
            json : {
                name : productName,
                description : productDescription,
                specification : productSpecification,
                on_command : producOnCommand,
                Id_material : producmaterial,
                price : productPrice,
                productWorkingDays : productWorkingDays,
                quantity_available : productQuantityAvailable,
                quantity_reservation : productQuantityReservation,
                options : formOptionObject,
                personalization : formPersonalizationObject,
            },
            credentials : 'include',
        })
        return response.json()
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

export const deleteSubOption = async (optionId,subOptionId) => {
    console.log(optionId)
    try {
        const response = await ky.delete(`${InitRequest()}/option/suboption/delete/${optionId}`,{
            json : {
                Id_subOption : subOptionId,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteOption = async (optionId) => {
    console.log(optionId)
    try {
        const response = await ky.delete(`${InitRequest()}/option/delete/${optionId}`,{
            json : {
                Id_option : optionId,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deletePersonalizationApi = async (id) => {
    console.log(id)
    try {
        const response = await ky.delete(`${InitRequest()}/personalization/delete/${id}`,{
            json : {
                Id_personalization : id,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const archivePictureApi = async(id,Id_product)=> {
    try {
        const response = await ky.put(`${InitRequest()}/product/archivePicture/${id}`,{
            json : {
                Id_product : Id_product,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const downPictureApi = async(Id_product_image,order,Id_product)=> {
    try {
        const response = await ky.put(`${InitRequest()}/product/downPicture/${Id_product_image}`,{
            json : {
                Id_product_image : Id_product_image,
                order : order,
                Id_product : Id_product,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const upPictureApi = async(Id_product_image,order,Id_product)=> {
    try {
        const response = await ky.put(`${InitRequest()}/product/upPicture/${Id_product_image}`,{
            json : {
                Id_product_image : Id_product_image,
                order : order,
                Id_product : Id_product,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deletePictureApi = async (id,name,pseudo,Id_product,Id_user) => {
    console.log('api')
    try {
        const response = await ky.delete(`${InitRequest()}/product/deletePicture/${id}`,{
            json : {
                name : name,
                pseudo : pseudo,
                Id_product : Id_product,
                Id_user : Id_user,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const CheckUpdatePictureApi = async (id,numberOfUpload) => {
    console.log('passe api', id, numberOfUpload)
    try {
        const response = await ky.post(`${InitRequest()}/product/checkUploadPictures/${id}`,{
            json : {
                numberOfUpload : numberOfUpload,
            },
            credentials : 'include',
        })
        return response
    } catch (err){
        return "erreur : " + err;
    }
}