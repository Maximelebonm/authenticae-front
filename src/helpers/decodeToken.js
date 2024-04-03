import { jwtDecode } from "jwt-decode";

export const decodeCookies = (cookie) =>{
    const cookieSplit = cookie.split('=');
    const TokenDecode = jwtDecode(cookieSplit[1])
    if(TokenDecode){
        return TokenDecode
        }
        else return 'error'
    }