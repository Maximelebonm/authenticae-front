import { Link } from "react-router-dom"
import { loginUser } from "../../../api/backEnd/user.backend"
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Eye } from 'lucide-react';
import './loginScreen.css'
import { Mail } from "lucide-react";
import { useState } from 'react';
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { toast, ToastContainer } from "react-toastify";
import { MailIcon } from "lucide-react";

export const LoginScreen = () =>{
    const [textError, setTextError] = useState({
        textErrorEmail : '',
        textErrorPassword : ''
    });

    const handleSubmit =async (e)=>{
        e.preventDefault()
        if(textError.textErrorEmail !== '' || textError.textErrorPassword !== ''){
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
    else{
        toast.error('Veuillez remplir les champs correctement')
    }
    }

    const [type,setType] = useState('password');
    
    const handleChange =(e)=>{
        const {name, value} = e.target
    }

    const handlePassword = (e) => {
        const regexLower = /[a-z]/;
        const regexUpper = /[A-Z]/;
        const regexDigit = /\d/;
        const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
        const spanElement = e.target.closest('.loginScreenItemContainer').nextElementSibling;

        if (!regexLower.test(e.target.value)) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword : 'Ce champ dois contenir au moins une minuscule'});
        } 
        else if (!regexUpper.test(e.target.value)) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword : 'Ce champ dois contenir au moins une majuscule'});
        } 
        else if (!regexDigit.test(e.target.value)) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword : 'Ce champ dois contenir au moins un chiffre'});
        } 
        else if (!regexSpecial.test(e.target.value)) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword : 'Ce champ dois contenir au moins un caractère spécial'});
        } 
        else if (e.target.value.length < 8) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword :'Ce champ dois contenir au moins 8 caractères'});
        }
        else if (e.target.value.length > 50) {
            spanElement.classList.add('spanError');
            setTextError({textErrorPassword :'Ce champ ne peut pas contenir plus de 50 caractères'});
        } 
        else {
            setTextError('');
            spanElement.classList.remove('spanError');
        }
    }

    return (
        <div id='loginScreenContainer'>
        <ToastContainer/>
            <form onChange={handleChange}  onSubmit={handleSubmit} id='loginScreenForm'>
                <h1>Connexion</h1>
                <div className='loginScreenItemContainer'>
                    <span><MailIcon /></span>
                    <InputFloatLabel placeholder='Ex : nom@gmail.com' type='email' labelName='E-mail' inputName='loginScreenEmail' required='yes' minLength={6} maxLength={50} pattern='^\S+$'/>
                </div>
                <div>
                    <div className='loginScreenItemContainer'>
                        <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
                        <InputFloatLabel className='InputBorderLeftOff' onchange={(e)=>{handlePassword(e)}} placeholder='Ex : Abcde123!' type={type} labelName='Mot de passe' inputName='loginScreenPassword' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    </div>
                    <span>{textError.textErrorPassword} </span>
                </div>
                <div id='loginCGU'>
                En vous connectant, vous acceptez nos <Link className="loginLink" to='/conditions'>CGU</Link> ainsi que notre politique de <Link className="loginLink" to='/confidentialite'>confidentialité</Link> et de <Link className="loginLink" to='/cookies'>cookies</Link>.</div>
                <div id='loginScreenButtonContainer'>
                    <button type='submit'> Se connecter</button>
                </div>
                <Link to='/checkEmail' className="loginLink" id='passwordForget'> 
                        Mot de passe oublié ?
                    </Link>
                {/* <GoogleLogin/> */}
            </form>
                    <Link to='/register'> 
                        <button type='button' id='loginScreenSecondContainer'>
                            {/* S&apos;enregistrer  */} Creer un compte
                        </button>
                    </Link>
        </div>
    )
}