import { Link } from "react-router-dom";
import './registerScreen.css';
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Mail,Phone,User, Lock } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../../api/backEnd/user.backend";

export const RegisterScreen = ()=> {

    const [type,setType] = useState();

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
            console.log(elements)
            const formData = new FormData(form);
            const firstname = formData.get("registerScreenName");
            const lastname = formData.get("registerScreenSurname");
            const birthdate = formData.get("registerScreenBirthDate");
            const email = formData.get("registerScreenEmail");
            const phone = formData.get("registerScreenPhone");
            const identifiant = formData.get("registerScreenIdentifiant");
            const password1 = formData.get("registerScreenPassword");
            const password2 = formData.get("registerScreenPassword2");
            if(password1==password2){
                console.log('pass')
                const fetch = async ()=>{
                   const log = await registerUser(firstname,lastname,birthdate,email,phone,password1,identifiant)
                   if(log){
                    window.location.href = '/login'
                   }
                }
                fetch()
            }
        } catch (err) {
            alert('une erreur est survenu',err)
        }
    }

    const handleChange =(e)=>{
        const {name, value} = e.target
        
    }

    return (
        <div id='registerScreenContainer'>
       <div id='registerScreenSecondContainer'>
            <Link to='/login'> Revenir à la page login </Link>
                OU
            <GoogleLogin/>
        </div>
        <form onChange={handleChange}  onSubmit={handleSubmit} id='registerScreenForm'>
            <div className="registerScreenContainer">
            <div id='registerNameAndSurname'>
                <div className='registerScreenItemContainer'>
                    <input type='text' placeholder="Prénom" name='registerScreenName' id='registerScreenName' required minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span><User /></span>
                </div>
                <div className='registerScreenItemContainer'>
                    <input type='text' placeholder="Nom de famille" name='registerScreenSurname' id='registerScreenSurname' required minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span><User /></span>
                </div>
            </div>
            <div>
                <label htmlFor='registerScreenBirthDate'>Date de naissance</label>
                <input type='date' name='registerScreenBirthDate' id='registerScreenBirthDate' required minLength={1} maxLength={50}/>
            </div>
            <div className='registerScreenItemContainer'>
                <input type='email' placeholder='email' name='registerScreenEmail' id='registerScreenEmail' required minLength={6} maxLength={50}/>
                <span><Mail /></span>
            </div>
            <div className='registerScreenItemContainer'>
                <input type='text' placeholder='Pseudonyme' name='registerScreenIdentifiant' id='registerScreenIdentifiant' required minLength={6} maxLength={50}/>
                <span><User /></span>
            </div>
            <div className='registerScreenItemContainer'>
                <input type='text' placeholder='numéro de téléphone' name='registerScreenPhone' id='registerScreenPhone' required minLength={10} maxLength={10}/>
                <span><Phone /></span>
            </div>
            <div>
                <div className='registerScreenItemContainer'>
                    <input type="password" placeholder='mot de passe' name='registerScreenPassword' id='registerScreenPassword'  maxLength={30} minLength={12}  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$' required/>
                    <span  onClick={() => setType(type === 'password' ? 'text' : 'password')}><Lock /></span>
                </div>
                doit contenir une majuscule un chiffre et un caractère spécial
            </div>
                <div className='registerScreenItemContainer'>
                    <input type="password" placeholder='confirmer mot de passe' name='registerScreenPassword2' id='registerScreenPassword2'  maxLength={30}  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$' minLength={12} required/>
                    <span onClick={() => setType(type === 'password' ? 'text' : 'password')}><Lock /></span>
                </div>
            </div>
            <button type='submit'> S'enregistrer</button>
        </form>
     
      
        </div>
    )
}