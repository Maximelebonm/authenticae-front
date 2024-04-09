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
            console.log(id)
                const fetch = async ()=> {                       
                    const response = await createPseudo(id,pseudo)
                    if(response){
                        response.json()
                        .then((data)=>{
                            if(data.message === 'pseudo created'){
                                setPseudo(!pseudo)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    return <div>
          
                {
                token?.identifiant ? 
                <>
                Votre identifiant : {token.identifiant}

                </>
                : 
                <div>
                Pour modifier votre profil veuiller creer votre identifiant unique : <br/>
                - celui ci n'est pas modifiable, veuillez bien le choisir.<br/>
                - votre pseudonyme doit être conforme aux règles d'utilisation<br/>
                - il n'est pas utilisé pour se connecter<br/>
                - il permet le stockage de vos de données.
                <div>
                <form onSubmit={pseudoSubmit}>
                <input type='text' placeholder="Votre pseudo"  name='pseudo' required minLength={3} maxLength={50}/>
                <User/>
                <button type='submit'>Valider</button>

                </form>
                </div>
                </div>
                }
            </div>               
}