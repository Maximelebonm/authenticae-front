import { Link } from "react-router-dom"
import './footer.css'
export const Footer =()=> {
    return (
        <div id='footerContainer'>
            <div id='footerInfo'>
               <div>
                    <strong>

                    Informations complémentaires
                    </strong>
               </div>
               <Link to='/conditions'>
                    conditions d&apos;utilisation
               </Link>
               <Link to='/confidentialite'>
                    Règles de confidentialité
               </Link>
               <Link to='/cookies'>
                    Cookies
               </Link>
            </div>
            <div id='footerContact'>
               <div>
                    <strong>
                        Contacts
                    </strong> 
               </div>

                 contact@authenticae.fr
            </div>
            <div id='footerContact'>
               copyright : Nervii Studio
            </div>
        </div>
    )
}