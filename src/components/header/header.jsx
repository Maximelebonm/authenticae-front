import './header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logos/logo_authenticae_blanc.png';
import { decodeCookies } from '../../helpers/decodeToken';
import { ToggleSwitch } from '../uiElements/toggleSwitch/toggleSwitch';
import { Store,ClipboardList,ShoppingCart,User } from 'lucide-react';
import { getUserById, logoutApi } from '../../api/backEnd/user.backend';
import { useAuthContext } from '../../screens/authContext';

export const Header =()=>{
    const [isActive, setIsActive] = useState(false);
    const { userDetails, setUserDetails } = useAuthContext();
    
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    const [roleCookie,setRoleCookie]=useState()
    const [cookie, setCookie] = useState()

    useEffect(()=>{
        if(document.cookie){
            const auth = async()=>{
                const cookies = document.cookie.split('; ')
                let authCookie = null
                for (let cookie of cookies) {
                    if (cookie.startsWith('auth=')) {
                        // Extraire la valeur du cookie après le signe '='
                        authCookie = cookie.substring('auth='.length);        
                        break;
                    }
                }
                const cookie = decodeCookies(authCookie) 
                const getUser = await getUserById(cookie.Id_user)
                getUser.json()
                .then(async(data)=> {
                    if(data === 'erreur : HTTPError: Request failed with status code 404 Not Found'){
                        await logoutApi()
                    } else {
                        const cookieTab = data.roles.map((item)=> item.name)
                        setRoleCookie(cookieTab)
                        setCookie(cookie)
                        setUserDetails({user : data})
                    }
                })
            }
            auth()
        }
    },[])
    
    useEffect(()=>{
        const nav = document.querySelectorAll('#headerNav .headerItem');
        nav.forEach(item => {
            item.addEventListener('click', function() {
                nav.forEach((item)=>{
                    item.classList.remove('active')
                })    
                this.classList.add('active')
            })
        })
    },[]);
    
    const activeItem = () => {
        const clickedItem = window.innerWidth;
 
        if(clickedItem <= 780){
            toggleActive() 
        }
    }

    return (
    <nav id='headerContainer' className={isActive ? 'active' : ''}>
        <div id='headerLogoContainer' className=''>
            <Link to="/">
                <img id='headerLogo' src={Logo} />
            </Link>
        </div>
        <ul id='headerNav' onClick={toggleActive}>
            <Link to="/">
                <li className='headerItem' onClick={activeItem}>
                Produits 
                </li>
            </Link>
            <Link to="/producer">
                <li className='headerItem' onClick={activeItem}>
                Producteurs
                </li>
            </Link>

        </ul>
            <ul id='HeaderRight'>
                <div id='dropdown'>
                    <Link  to={roleCookie ? "/profil" : '/login'}>
                        <li className='headerItem' onClick={activeItem}> <User /> Compte</li>
                    </Link>
                    <div id='dropdown-content'>
                        {roleCookie?.includes('client') ?
                            <>
                                <Link  to={roleCookie ? "/profil" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <User /> Compte</li>
                                </Link>
                                <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <User /> Deconnexion </li>
                                </Link>
                                <div>
                                    <li className='headerItem'>
                                        <ToggleSwitch />
                                    </li>
                                </div>
                            </> :
                            <>
                            <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <User /> Connexion </li>
                                </Link>
                                <div>
                                    <li className='headerItem' onClick={activeItem}>
                                        <ToggleSwitch />
                                    </li>
                                </div>                        
                            </>
                        }
                        {roleCookie?.includes('producer') && 
                            <>
                                <Link  to={"/myshop"}>
                                            <li className='headerItem' onClick={activeItem}> <Store />Shop</li>
                                </Link>
                                <Link  to={"/order"}>
                                            <li className='headerItem' onClick={activeItem}> <ClipboardList />Commandes</li>
                                </Link>
                            </>
                        }
                    </div> 
                </div>
                        <Link  to={roleCookie ? "/cart" : '/login'}>
                            <li className='headerItem' onClick={activeItem}><ShoppingCart /> Panier</li>
                        </Link>
                        <Link  to={roleCookie ? "/myorder" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <ClipboardList />Commandes</li>
                        </Link>
            </ul>
        <div id='icons' onClick={toggleActive}>
        </div>
    </nav>
    )
}