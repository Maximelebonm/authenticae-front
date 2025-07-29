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
    let counter = 0
    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            if(counter === 0){
                const form = e.target
                const elements = e.target.elements
                console.log(elements)
                const formData = new FormData(form);
                const gender = formData.get("registerGender");
                const firstname = formData.get("registerScreenName");
                const lastname = formData.get("registerScreenSurname");
                const birthdate = formData.get("registerScreenBirthDate");
                const email = formData.get("registerScreenEmail");
                const phone = formData.get("registerScreenPhone");
                const password1 = formData.get("registerScreenPassword");
                const password2 = formData.get("registerScreenPassword2");
                console.log(gender)
                if(password1==password2){
                    console.log('pass')
                    const fetch = async ()=>{
                       const log = await ValidationUser(firstname,lastname,birthdate,email,phone,password1,gender)
                       log.json()
                       .then((data)=>{
                            if(data.message == 'email exist'){
                                toast.error("l'email existe déjà veuillez changer d'email", {autoClose : 3000})
                            }
                            else if(data.message == 'email envoyé'){
                                toast.success("Email envoyé, veuillez valider votre addresse email", {autoClose : 5000})
                                counter = 1
                                setTimeout(()=>{window.location.href = '/login'},6000 )
                                
                            } else {
                                toast.error('une erreur est survenue, veuillez reessayer', {autoClose : 3000})
                            }
                       })
                    } 
                    fetch()
                } else {
                    toast.error("vérifier vos mot de passe", {autoClose : 3000})
                }
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
        <h1>L&apos;inscription n&apos;est pas disponible pour le moment</h1>
            <div className="registerScreenContainer">
                <div className='registerScreenItemContainer'>
                    <input type='radio' id='registerScreenGenderMale' name='registerGender' value='Mr' required />
                    <label htmlFor='registerScreenGenderMale'>Mr</label>
                    <input type='radio' id='registerScreenGenderFemale' name='registerGender' value='Mme' required />
                    <label htmlFor='registerScreenGenderFemale'>Mme</label>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Jean" type='text' labelName='Prénom' inputName='registerScreenName' required='yes' minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span id='registerScreenSpan'><User /></span>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Dupont" type='text' labelName='Nom' inputName='registerScreenSurname' required='yes' minLength={1} maxLength={50} pattern='^(?!.*\s)(?!.*[\d])(?!.*[^a-zA-ZÀ-ÿ-]).+$'/>
                    <span id='registerScreenSpan'><User /></span>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel placeholder="Dupont" type='date' labelName='Date de Naissance' inputName='registerScreenBirthDate' required='yes' max='2008-01-01'/>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : jeanDupont@gmail.com" type='text' labelName='E-mail' inputName='registerScreenEmail' required='yes'minLength={6} maxLength={50}/>
                    <span id='registerScreenSpan'><Mail /></span>
                </div>
                <div className='registerScreenItemContainer'>
                    <InputFloatLabel  className='InputBorderLeftOff' placeholder="Ex : 032728293031" type='text' labelName='N° de téléphone' inputName='registerScreenPhone' required='yes' minLength={10} maxLength={10} pattern='^(\+?\d{1,3}[-.\s]?|0)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$'/>
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
            <div>
            En cliquant sur S’inscrire, vous acceptez nos <Link className='link' to='/conditions'>Conditions générales</Link>. Découvrez comment nous recueillons, utilisons et partageons vos données en lisant les <Link className='link' to='/confidentialite'>règles de confidentialités</Link> et notre Politique d’utilisation des <Link className='link' to='/cookies'>cookies</Link>.
            </div>
            <div className='registerScreenItemContainer'>
                <button type='submit'> S&apos;inscrire</button>
            </div>
                {/* <GoogleLogin/> */}
        </form>
     
      
        </div>
    )
}