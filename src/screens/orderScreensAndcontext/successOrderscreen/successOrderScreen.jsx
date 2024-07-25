import './successOrderScreen.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SuccessOrderScreen = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{navigate('/')}, 10000)
    },[])
    return (
        <div>
            Votre commande à bien été pris en compte vous aller recevoir un mail récapitulatif, vous allez être rediriger à la page d'acceuil dans 10sec , ou vous pouvez cliquer sur le bouton
            <button onClick={()=>{navigate('/')}}>Revenir à la page d'acceuil</button>
        </div>
    )
}