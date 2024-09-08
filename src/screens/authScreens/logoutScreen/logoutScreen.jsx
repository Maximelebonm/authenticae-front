import { useNavigate } from 'react-router-dom'
import { logoutApi } from '../../../api/backEnd/user.backend'
import './logoutScreen.css'
import { toast, ToastContainer } from 'react-toastify';

export const LogoutScreen = () => {
    const navigate = useNavigate();

    const logout = async () =>{
        const resp = await logoutApi()
        if(resp.message === 'deconnecté'){
            toast.success('Déconnexion réussie',{autoclose : 1000})
            return setTimeout(()=>{window.location.href = '/'},1500)
        }
        else {
            toast.error('Déconnexion à échoué, veuillez réessayer plus tard')
        }
        
    
    }

    return (
        <div> 
        <ToastContainer/>
            <p>
                Etes vous sur de vouloir vous déconnecter ?
            </p>
            <button onClick={logout}>Oui</button>
            <button>Non</button>
        </div>
    )
}