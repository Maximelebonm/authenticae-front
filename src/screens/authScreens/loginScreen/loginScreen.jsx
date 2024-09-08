import { Link } from "react-router-dom"
import { loginUser } from "../../../api/backEnd/user.backend"
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Eye } from 'lucide-react';
import './loginScreen.css'
import { Mail } from "lucide-react";
import { useState } from 'react';
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { toast, ToastContainer } from "react-toastify";

export const LoginScreen = () =>{

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const email = formData.get("loginScreenEmail");
            const password = formData.get("loginScreenPassword");
            
            const fetch = async ()=>{
               const log = await loginUser(email,password)
               if(log.message === 'connection autorisé'){
                toast.success('Vous êtes connecté ! ', {autoClose : 1000})
                return window.location.href = '/'
               }
               if(log.message === 'mot de passe incorrect'){
                return toast.error('mot de passe incorrect ! ', {autoClose : 2000})
               }
               if(log.message === 'email invalide'){
                return toast.error("Cet email n'éxiste pas veuillez vous créer un compte", {autoClose : 2000})
               }
               else{
                toast.error('Une erreur est survenue, veuillez réésayer plus tard ou contacter le support à contact.authenticae.fr')
               }
            }
            fetch()
            
        } catch (err) {
            console.log(err)
        }
    }

    const [type,setType] = useState('password');
    
    const handleChange =(e)=>{
        const {name, value} = e.target
    }

    return (
        <div id='loginScreenContainer'>
        <ToastContainer/>
            <form onChange={handleChange}  onSubmit={handleSubmit} id='loginScreenForm'>
                <h1>Connexion</h1>
                <InputFloatLabel placeholder='Ex : nom@gmail.com' type='email' labelName='E-mail' inputName='loginScreenEmail' required='yes' minLength={6} maxLength={50} pattern='^\S+$'/>
                <div className='loginScreenItemContainer'>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type} labelName='Mot de passe' inputName='loginScreenPassword' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
                </div>
                <div id='loginCGU'>En vous connectant, vous acceptez nos <Link className="loginLink" to='/conditions'>CGU</Link> ainsi que notre politique de <Link className="loginLink" to='/confidentialite'>confidentialité</Link> et de <Link className="loginLink" to='/cookies'>cookies</Link>.</div>
                <div id='loginScreenButtonContainer'>
                    <button type='submit'> Se connecter</button>
                    <Link to='/register'> 
                        <button type='button' id='loginScreenSecondContainer'>
                            S&apos;enregistrer 
                        </button>
                    </Link>
                </div>
                <Link to='/password' className="loginLink" id='passwordForget'> 
                        Mot de pass oublié ?
                    </Link>
                <GoogleLogin/>
            </form>
        </div>
    )
}