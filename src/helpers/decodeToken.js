import { jwtDecode } from "jwt-decode";

export const decodeCookies = (cookie) =>{
    try {
        const TokenDecode = jwtDecode(cookie)
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