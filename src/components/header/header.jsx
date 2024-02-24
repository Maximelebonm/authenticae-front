import './header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logos/logo_authenticae_blanc.png';

export const Header =()=>{
    const [isActive, setIsActive] = useState(false);

    const logo = '../../assets/logos/src/assets/logos/logo_authenticae_blanc.png'
    
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    useEffect(()=>{

        const nav = document.querySelectorAll('#headerNav .headerItem');
        nav.forEach(item => {
            item.addEventListener('click', function() {
                nav.forEach((item)=>{
                    item.classList.remove('active')
                })    
                this.classList.add('active')
            });
        });
    },[])
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
            <Link to="/producteurs">
                <li className='headerItem' onClick={activeItem}>
                Producteurs
                </li>
            </Link>
            <Link to="/profile"> 
                <li className='headerItem' onClick={activeItem}>
                Profil 
                </li>
            </Link>
            <Link to="/">
                <li className='headerItem' onClick={activeItem}>
                Panier
                </li>
            </Link>
        </ul>
        <div id='icons' onClick={toggleActive}>
        </div>
    </nav>
    )
}