import { useEffect,useState } from "react";
import {jwtDecode} from "jwt-decode";

export const ProfilScreen = ()=>{
    const [token,setToken] = useState()
    useEffect(()=>{
        const cookiesplit = document.cookie.split('=')

        
        const TokenDecode = jwtDecode(cookiesplit[1])
        if(TokenDecode){
            setToken(TokenDecode)
        }
    },[])

    return <div>
                <p>
                {token?.email}
                </p>
            </div>               
}