import { createContext, useState, useEffect,useContext } from 'react';
import { decodeCookies } from '../helpers/decodeToken';
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(()=>{
    if(document.cookie){
        const cookies = document.cookie.split('; ')
        let authCookie = null
        for (let cookie of cookies) {
            if (cookie.startsWith('auth=')) {
                // Extraire la valeur du cookie après le signe '='
                authCookie = cookie.substring('auth='.length);   
                console.log('auth cookie : '  + authCookie)     
                break;
            }
        }
        const decodeCookie = async()=>{
            const cookie = decodeCookies(authCookie)
           
            setUserDetails(cookie)
        }
        decodeCookie()
    }
},[])

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};