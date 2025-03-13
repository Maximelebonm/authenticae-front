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
        return user.json()
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

export const checkEmailApi = async (email) => {
    try {
        console.log(email)
        const user = await ky.post(`${InitRequest()}/users/checkEmail`,{
            json: {
                email : email,
            },
            credentials : 'include'
        })
        return user.json()
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
        console.log(err)
        return "erreur : " + err;
    }
}

export const registerUser = async (firstname,lastname,birthdate,email,phone,password) => {
    try {
        const user = await ky.post(`${InitRequest()}/users/register`,{
            json: {
                firstname: firstname,
                lastname : lastname,
                birthdate : birthdate,
                phone : phone,
                email : email,
                password : password,
            },
            credentials : 'include'
        })
        return user
    } catch (err){
        return "erreur : " + err;
    }
}
export const logoutApi = async () => {
    try {
        const response = await ky.post(`${InitRequest()}/users/logout`,{
            credentials : 'include'
        
        });
        return response.json();
    } catch (err) {
        return "Erreur : " + err.message;
    }
}

export const updateUserApi = async (formObject,id)=> {
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
    return response
    } catch (err){
        return "erreur : " + err;
    }
}

export const deleteUserApi = async (id)=> {
    try {
    const response = await ky.put(`${InitRequest()}/users/delete/${id}`,{
        credentials : 'include'
    })
    return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}

export const renewPasswordApi = async (email,password)=> {
    try {
    const response = await ky.put(`${InitRequest()}/users/password`,{
        json : {
            password : password,
            email : email,
        },
        credentials : 'include'
    })
    return response.json()
    } catch (err){
        return "erreur : " + err;
    }
}