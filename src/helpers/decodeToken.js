import { jwtDecode } from "jwt-decode";
// import { decodeCookies } from './decodeToken';

export const decodeCookies = (cookie) =>{
    try {
        // console.log('cookie : ' + cookie)
        const TokenDecode = jwtDecode(cookie)
        // console.log('tokenDecode : ' + TokenDecode)
        if(TokenDecode){
            return TokenDecode
            }
            else return 'error'
    } catch (error) {
        return 'not connected : ' + error
    }
}

export const decodeCookieUser = ()=> {
    const cookiesSplit = document.cookie.split('; ')
    console.log(cookiesSplit)
                let authCookie = null
                for (let cookie of cookiesSplit) {
                    if (cookie.startsWith('auth=')) {
                        // Extraire la valeur du cookie après le signe '='
                        authCookie = cookie.substring('auth='.length);
                        break;
                    }
                }
                const cookie = decodeCookies(authCookie) 
                if(cookie){
                    console.log(cookie)
                    return cookie
                }  
}

export const decodeCookieCart = ()=> {
    const cookiesSplit = document.cookie.split('; ')
                let cartCookie = null
                for (let cookie of cookiesSplit) {
                    if (cookie.startsWith('cart=')) {
                        // Extraire la valeur du cookie après le signe '='
                        cartCookie = cookie.substring('cart='.length);
                        break;
                    }
                }
                decodeCookies(cartCookie)      
}

export const decodetoken = (token) =>{
    const TokenDecode = jwtDecode(token)
    if(TokenDecode){
        return TokenDecode
        }
        else return 'error'
    }