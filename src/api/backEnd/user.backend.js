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
    try {
        const user = await ky.get(`${InitRequest()}/users/profile/${id}`,{credentials : 'include'})
        return user
    } catch (err){
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


export const registerUser = async (firstname,lastname,birthdate,email,phone,password) => {
    console.log('ok')
    try {
        const user = await ky.post(`${InitRequest()}/users/register`,{
            json: {
                firstname: firstname,
                lastname : lastname,
                birthdate : birthdate,
                phone : phone,
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