import { Link } from "react-router-dom";
import './registerScreen.css';
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Mail,Phone,User, Lock } from "lucide-react";
import { useState } from "react";
import { ValidationUser} from "../../../api/backEnd/user.backend";
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { toast, ToastContainer } from "react-toastify";

export const RegisterScreen = ()=> {

    const [type,setType] = useState('password');
    const [type2,setType2] = useState('password')

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
                   const log = await ValidationUser(firstname,lastname,birthdate,email,phone,password1,identifiant)
                   log.json()
                   .then((data)=>{
                        if(data.message == 'email exist'){
                            toast.error("l'email existe déjà veuillez changer d'email", {autoClose : 3000})
                        }
                        else if(data.message == 'email envoyé'){
                            toast.success("veuillez valider votre email", {autoClose : 5000})
                            window.location.href = '/login'
                        } else {
                            toast.error('une erreur est survenue, veuillez reessayer', {autoClose : 3000})
                        }
                   })
              
             
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
        <ToastContainer/>
        <form onChange={handleChange}  onSubmit={handleSubmit} id='registerScreenForm'>
            <div className="registerScreenContainer">
            <div id='registerNameAndSurname'>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Jean" type='text' labelName='Prénom' inputName='registerScreenName' required='yes' minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span id='registerScreenSpan'><User /></span>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Dupont" type='text' labelName='Nom' inputName='registerScreenSurname' required='yes' minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span id='registerScreenSpan'><User /></span>
                </div>
            </div>
            <div>
                <InputFloatLabel placeholder="Dupont" type='date' labelName='Date de Naissance' inputName='registerScreenBirthDate' required='yes' max='2008-01-01'/>
            </div>
            <div className='registerScreenItemContainer'>
                <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : jeanDupont@gmail.com" type='text' labelName='E-mail' inputName='registerScreenEmail' required='yes'minLength={6} maxLength={50}/>
                <span id='registerScreenSpan'><Mail /></span>
            </div>
            <div className='registerScreenItemContainer'>
                <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : anonymous" type='text' labelName='Identifiant' inputName='registerScreenIdentifiant' required='yes' minLength={6} maxLength={50}/>
                <span id='registerScreenSpan'><User /></span>
            </div>
            <div className='registerScreenItemContainer'>
                <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : 032728293031" type='text' labelName='N° de téléphone' inputName='registerScreenPhone' required='yes' minLength={10} maxLength={10}/>
                <span id='registerScreenSpan'><Phone /></span>
            </div>
            <div>
                doit contenir une majuscule un chiffre et un caractère spécial
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : Azerty123!" type={type} labelName='Mot de passe' inputName='registerScreenPassword' required='yes' maxLength={30} minLength={12}  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id='registerScreenSpan' onClick={() => setType(type === 'password' ? 'text' : 'password')}><Lock /></span>
                </div>
            </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : Azerty123!" type={type2} labelName='Confirmer mot de passe' inputName='registerScreenPassword2' required='yes' maxLength={30} minLength={12}  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id='registerScreenSpan' onClick={() => setType2(type2 === 'password' ? 'text' : 'password')}><Lock /></span>
                </div>
            </div>
            <div className='registerScreenItemContainer'>
                <button type='submit'> S'enregistrer</button>
                <Link to='/login'> 
                            <button type='button' id='loginScreenSecondContainer'>
                                Se connecter
                            </button>
                        </Link>
            </div>
                <GoogleLogin/>
        </form>
     
      
        </div>
    )
}