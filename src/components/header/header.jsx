import './header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart,User } from 'lucide-react';
import Logo from '../../assets/logos/logo_authenticae_blanc.png';
import { decodeCookies } from '../../helpers/decodeToken';
import { ToggleSwitch } from '../uiElements/toggleSwitch/toggleSwitch';
import { Store } from 'lucide-react';

export const Header =()=>{
    const [isActive, setIsActive] = useState(false);


    const logo = '../../assets/logos/src/assets/logos/logo_authenticae_blanc.png'
    
    const toggleActive = () => {
        setIsActive(!isActive);
    }
    const [roleCookie,setRoleCookie]=useState()
    const [cookie, setCookie] = useState()
    useEffect(()=>{
        if(document.cookie){
            const auth = async()=>{
                const cookie = await decodeCookies(document.cookie)
                const cookieTab = cookie.role.map((item)=> item.name)
                setRoleCookie(cookieTab)
                setCookie(cookie)
            }
            auth()
        }
    },[])
    
    console.log(cookie?.identifiant)
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
                        <li className='headerItem'> <User /> Compte</li>
                    </Link>
                        <div id='dropdown-content'>
                        {roleCookie?.includes('client') ?
                            <>
                                <Link  to={roleCookie ? "/profil" : '/login'}>
                                    <li className='headerItem'> <User /> Compte</li>
                                </Link>
                                <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className='headerItem'> <User /> Deconnexion </li>
                                </Link>
                                <div>
                                    <li className='headerItem'>
                                        <ToggleSwitch />
                                    </li>
                                </div>
                            </> :
                            <>
                            <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className='headerItem'> <User /> Connexion </li>
                                </Link>
                                <div>
                                    <li className='headerItem'>
                                        <ToggleSwitch />
                                    </li>
                                </div>                        
                            </>
                        }
                        {roleCookie?.includes('producer') &&
                        <Link  to={cookie?.identifiant == null ? "/profil" : "/myshop"}>
                                    <li className='headerItem'> <Store />Shop</li>
                        </Link>}
                        </div> 
                </div>
                        <Link  to={roleCookie ? "/cart" : '/login'}>
                            <li className='headerItem'><ShoppingCart /> Panier</li>
                        </Link>
            </ul>
        <div id='icons' onClick={toggleActive}>
        </div>
    </nav>
    )
}