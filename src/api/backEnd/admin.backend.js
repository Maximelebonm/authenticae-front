import { InitRequest } from "../initRequest";
import ky from "ky";

export const addProducerRole = async (id) => {
    try {
        const response = await ky.post(`${InitRequest()}/admin/producer/role/add/${id}`,{
            json : {
                role : 'producer'
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteProducerRole = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/producer/role/delete/${id}`,{
            json : {
                role : 'producer'
            },
            credentials : 'include'
        })
        console.log(response)
        return response
    } catch (err){
        return "erreur : " + err;
    }
}

/////////////////////////////
//
//         SHOP
//
/////////////////////////////

export const deleteShopApi = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/shop/delete/${id}`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const unDeleteShopApi = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/shop/undelete/${id}`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

///////////////////////////// 
//
//         TVA
//
/////////////////////////////

export const addTvaApi = async (value) => {
    try {
        const response = await ky.post(`${InitRequest()}/admin/tva/add`,{
            json : {
                name : value.name,
                tva_rate : value.tva_rate
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const getTvaApi = async () => {
    try {
        const response = await ky.get(`${InitRequest()}/admin/tva`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateTvaApi = async (value) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/tva/update/${value.Id_tva}`,{
            json : {
                name : value.name,
                tva_rate : value.tva_rate
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteTvaApi = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/tva/delete/${id}`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

/////////////////////////////
//
//         CATEGORY
//
/////////////////////////////

export const addCategoryApi = async (value) => {
    try {
        const response = await ky.post(`${InitRequest()}/admin/category/add`,{
            json : {
                name : value.name
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const getCategoriesApi = async () => {
    try {
        const response = await ky.get(`${InitRequest()}/admin/category`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateCategoryApi = async (value) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/category/update/${value.Id_categoryProduct}`,{
            json : {
                name : value.name
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteCategoryApi = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/category/delete/${id}`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

/////////////////////////////
//
//         MATERIAL
//
/////////////////////////////

export const addMaterialApi = async (value) => {
    try {
        const response = await ky.post(`${InitRequest()}/admin/material/add`,{
            json : {
                name : value.name
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const getMaterialsApi = async () => {
    try {
        const response = await ky.get(`${InitRequest()}/admin/material`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const updateMaterialApi = async (value) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/material/update/${value.Id_material}`,{
            json : {
                name : value.name
            },
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteMaterialApi = async (id) => {
    try {
        const response = await ky.put(`${InitRequest()}/admin/material/delete/${id}`,{
            credentials : 'include'
        })
        return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}
