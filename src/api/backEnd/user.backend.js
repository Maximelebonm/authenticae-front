import { InitRequest } from "../initRequest";
import ky from "ky";

export const getAllUser = async () => {
    try {
        const userList = await ky.get(`${InitRequest()}/users`,{credentials : 'include'})
        return userList
    } catch (err){
        return "erreur : " + err;
    }
}

export const getUserById = async (id) => {
    console.log(id)
    try {
        const user = await ky.get(`${InitRequest()}/users/profile/${id}`,{credentials : 'include'})
        console.log(user)
        return user
    } catch (err){
        console.log('erreur')
        return "erreur : " + err;
    }
}


export const loginUser = async (email,password) => {
    try {
        const user = await ky.post(`${InitRequest()}/users/login`,{
            json: {
                email : email,
                password : password
            },
            credentials : 'include'
        })
        return user
    } catch (err){
        return "erreur : " + err;
    }
}

export const createPseudo = async (id,pseudo) => {
    try {
        const user = await ky.post(`${InitRequest()}/users/pseudo/${id}`,{
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


export const ValidationUser = async (firstname,lastname,birthdate,email,phone,password,identifiant) => {
    try {
        const user = await ky.post(`${InitRequest()}/users/validation`,{
            json: {
                firstname: firstname,
                lastname : lastname,
                birthdate : birthdate,
                phone : phone,
                email : email,
                password : password,
                identifiant : identifiant,
            },
            credentials : 'include'
        })
        return user
    } catch (err){
        return "erreur : " + err;
    }
}

export const registerUser = async (firstname,lastname,birthdate,email,phone,password,identifiant) => {
    try {
        const user = await ky.post(`${InitRequest()}/users/register`,{
            json: {
                firstname: firstname,
                lastname : lastname,
                birthdate : birthdate,
                phone : phone,
                email : email,
                password : password,
                identifiant : identifiant,
            },
            credentials : 'include'
        })
        return user
    } catch (err){
        return "erreur : " + err;
    }
}
export const logoutApi = async (cookie) => {
    console.log(cookie)
    try {
        const response = await ky.post(`${InitRequest()}/users/logout`,{
            json: {

            },
            credentials : 'include'
        
        }).json();
        console.log(response)
        if (response.message) {
            return response;
        } else {
            return "La déconnexion a échoué";
        }
        } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
        return "Erreur : " + err.message;
    }
}

export const updateUserApi = async (formObject,id)=> {
    console.log('api', formObject,id)
    try {
    const response = await ky.put(`${InitRequest()}/users/update/${id}`,{
        json : {
            firstname : formObject.formFirstname,
            lastname : formObject.formLastname,
            birthdate : formObject.formBirthdate,
            phone : formObject.formPhone,
        },
        credentials : 'include'
    })
    console.log(response)
    return response
    } catch (err){
        return "erreur : " + err;
    }
}