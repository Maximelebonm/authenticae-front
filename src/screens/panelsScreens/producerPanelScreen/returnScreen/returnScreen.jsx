import './returnScreen.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ReturnOrderScreen = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{navigate('/myShop')}, 10000)
    },[])
    return (
        <div>
            Votre compte stripe à bien été créé vous aller être redirigé à votre shop ou cliquez sur le bouton
            <button onClick={()=>{navigate('/myShop')}}>Revenir à la page d&apos;acceuil</button>
        </div>
    )
}