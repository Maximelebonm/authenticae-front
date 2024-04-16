import { useEffect,useState } from "react";
import {User} from 'lucide-react';
import { decodeCookies } from "../../../helpers/decodeToken";
import { createPseudo } from "../../../api/backEnd/user.backend";

export const ProfilScreen = ()=>{
    const [token,setToken] = useState()
    const [pseudo,setPseudo] = useState(false)

    useEffect(()=>{
        const cookies = decodeCookies(document.cookie)
        if(cookies){
            setToken(cookies)
            console.log(cookies)
        }
    },[pseudo])

    const pseudoSubmit = async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const pseudo = formData.get("pseudo");
            const id = token.Id_user
            const fetch = async ()=> {                       
                const response = await createPseudo(id,pseudo)
                if(response){
                    console.log(response)
                    const pseudoCreate =response.json()
                    .then((data)=>{
                            if(data.message === 'pseudo created'){
                                setPseudo(true)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    return (<div>
          
                {
                token?.identifiant ? 
                <>
                Votre identifiant : {token.identifiant}

                </>
                : 
                <div>
                Veuillez choisir un pseudonyme afin de finaliser votre compte. <br/>
                ATTENTION Celui ci n'est pas modifiable !
                <div>
                <form onSubmit={pseudoSubmit}>
                <input type='text' placeholder="Votre pseudo"  name='pseudo' required minLength={3} maxLength={50}/>
                <User/>
                <button type='submit'>Valider</button>

                </form>
                </div>
                </div>
                }
            </div>)               
}