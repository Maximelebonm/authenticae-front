import './googleLogin.css'
import { FcGoogle } from "react-icons/fc";
export const GoogleLogin=()=>{

    const googleAuth = () =>{
        if(process.env.NODE_ENV === 'development'){
            window.location.href = (
                `${import.meta.env.VITE_URL_BACK_DEV}/users/google`
                
            )
        }else if(process.env.NODE_ENV === 'prodution'){
            window.location.href = (
                `${import.meta.env.VITE_URL_BACK_PROD}/users/google`
                
            )
        }
    }

    return (
        <button type='button' onClick={googleAuth}> <FcGoogle /></button>
    )
}