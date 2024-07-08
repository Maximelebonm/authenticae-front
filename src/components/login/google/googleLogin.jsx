import './googleLogin.css'
import { FcGoogle } from "react-icons/fc";
export const GoogleLogin=()=>{

    const googleAuth = () =>{
        const env = import.meta.env.VITE_MODE
        if(env === 'development'){
            window.location.href = (
                `${import.meta.env.VITE_BASE_URL_BACK}users/google`
                
            )
        }
    }

    return (
        <button type='button' onClick={googleAuth}> <FcGoogle /></button>
    )
}