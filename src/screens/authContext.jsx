import { createContext, useState, useEffect,useContext, useCallback } from 'react';
import { decodeCookies } from '../helpers/decodeToken';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [lastCookieValue, setLastCookieValue] = useState('');

  const readAuthCookie = useCallback(async () => {
    if (document.cookie) {
      const cookies = document.cookie.split('; ');
      let authCookie = null;
      
      for (let cookie of cookies) {
        if (cookie.startsWith('auth=')) {
          authCookie = cookie.substring('auth='.length);
          break;
        }
      }
      
      // Seulement mettre à jour si le cookie a changé
      if (authCookie !== lastCookieValue) {
        setLastCookieValue(authCookie || '');
        
        if (authCookie) {
          try {
            const decodedCookie = decodeCookies(authCookie);
            setUserDetails(decodedCookie);
          } catch (error) {
            setUserDetails({});
          }
        } else {
          // Cookie supprimé
          setUserDetails({});
        }
      }
    } else {
      // Pas de cookies du tout
      if (lastCookieValue !== '') {
        setLastCookieValue('');
        setUserDetails({});
      }
    }
  }, [lastCookieValue]);

    const refreshUserDetails = useCallback(() => {
    console.log('Refresh manuel des détails utilisateur');
    // Forcer la relecture en réinitialisant lastCookieValue
    setLastCookieValue('');
    setTimeout(() => {
      readAuthCookie();
    }, 50);
  }, [readAuthCookie]);

  useEffect(() => {
    // Lecture initiale
    readAuthCookie();

    // Polling pour détecter les changements de cookie
    // const interval = setInterval(() => {
    //   readAuthCookie();
    // }, 1000); 

    // Écouter les événements de focus de la fenêtre
    const handleFocus = () => {
      console.log('Fenêtre focalisée - vérification des cookies');
      readAuthCookie();
    };

    // Écouter les changements de visibilité de la page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page redevenue visible - vérification des cookies');
        readAuthCookie();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [readAuthCookie]);

// console.log('user context : ' + JSON.stringify(userDetails))
  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails,refreshUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useRefreshUserAuth =() => {

  const { refreshUserDetails } = useAuthContext();
  return refreshUserDetails;
} 