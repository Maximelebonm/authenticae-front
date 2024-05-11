import { useEffect,useState } from "react"
import { decodetoken } from "../../../helpers/decodeToken";
import { registerUser } from "../../../api/backEnd/user.backend";
import { Link } from "react-router-dom";


export const ValidationScreen = () => {
    const [valid,setValid] = useState()
    useEffect(()=>{
        const currentURL = window.location.pathname;
        const tokenFromURL = currentURL.substring(currentURL.lastIndexOf('/') + 1);
        const {email,firstname,lastname,password,phone,birthdate,identifiant} = decodetoken(tokenFromURL)
        console.log(email,firstname,lastname,password,phone,birthdate,identifiant)
        const fetch = async()=>{
            const response = await registerUser(firstname,lastname,birthdate,email,phone,password,identifiant)
            response.json()
            .then((data)=>{
                console.log(data)
                if(data.message === "user created"){
                    setValid(true)
                }
                else{
                    setValid(false)
                }
            })
        }
        fetch()
    },[])

    return (
        <>
            {valid ?
            <>
            <h1>Votre email à été validé</h1>
            <h2>Vous pouvez retourner a la page login en cliquant sur le bouton suivant :</h2>
            <Link to='/login'>
                <button>login</button>
            </Link>
            </> : <>
                <h1>Un problème est survenu ou votre compte à déjà été créé</h1>
            </>
            }
        </>
    )
}