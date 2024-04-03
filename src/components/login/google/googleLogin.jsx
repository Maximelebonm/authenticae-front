import './googleLogin.css'

export const GoogleLogin=()=>{

    const googleAuth = () =>{
        const env = import.meta.env.VITE_MODE
        if(env === 'development'){
            window.location.href = (
                `${import.meta.env.VITE_URL_BACK}/users/google`
                
            )
        }
    }

    return (
        <button onClick={googleAuth}> se connecter / s'enregistrer avec Google</button>
    )
}