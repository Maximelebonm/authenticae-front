import { useNavigate } from 'react-router-dom'
import { logoutApi } from '../../../api/backEnd/user.backend'
import './logoutScreen.css'

export const LogoutScreen = () => {
    const navigate = useNavigate();

    const logout = async () =>{
        const cookie = document.cookie
        const resp = await logoutApi(cookie)
        console.log(resp)
        window.location.href = '/'
            // navigate('/')
    }

    return (
        <div> 
            <p>
                Etes vous sur de vouloir vous déconnecter ?
            </p>
            <button onClick={logout}>Oui</button>
            <button>Non</button>
        </div>
    )
}