import './header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logos/logo_authenticae_blanc.png';
import { ToggleSwitch } from '../uiElements/toggleSwitch/toggleSwitch';
import { Store,ClipboardList,ShoppingCart,User } from 'lucide-react';
import { useAuthContext } from '../../screens/authContext';

export const Header =()=>{
    const [isActive, setIsActive] = useState(false);
    const { userDetails } = useAuthContext();
    const [mobile, setMobile] = useState();
    
    const toggleActive = () => {
        setIsActive(!isActive);
    }
    console.log(userDetails)
    const roleCookie= userDetails?.role?.map((item)=> item.name)

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

    useEffect(()=>{
        const handleResize = () => {
            console.log('pass');
            if (window.innerWidth <= 840) {
                setMobile(true);
            } else {
                setMobile(false); // Optionnel, si vous souhaitez réinitialiser la valeur pour les largeurs supérieures à 780px
            }
        };

        // Appeler handleResize une première fois pour vérifier la largeur initiale
        handleResize();

        // Ajouter l'écouteur d'événement lors du montage
        window.addEventListener('resize', handleResize);

        // Nettoyer l'écouteur d'événement lors du démontage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);

    const activeItem = () => {
        const clickedItem = window.innerWidth;
 
        if(clickedItem <= 840){
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
                {mobile === false ? <div id='dropdown'>
                    <Link  to={roleCookie ? "/profil" : '/login'}>
                        <li className='headerItem' onClick={activeItem}> <User /> Compte</li>
                    </Link>
                    <div id={'dropdown-content'}>
                        {roleCookie?.includes('client') ?
                            <>
                                <Link  to={roleCookie ? "/profil" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <User /> Compte</li>
                                </Link>
                                <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className={'headerItem'} onClick={activeItem}> <User /> Deconnexion </li>
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
                </div> : 
                // Mobile Version
                <>
                        {roleCookie?.includes('client') ?
                            <>
                                <Link  to={roleCookie ? "/profil" : '/login'}>
                                    <li className='headerItem' onClick={activeItem}> <User /> Compte</li>
                                </Link>
                                <Link  to={roleCookie ? "/logout" : '/login'}>
                                    <li className={'headerItem'} onClick={activeItem}> <User /> Deconnexion </li>
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
                </>
                }
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