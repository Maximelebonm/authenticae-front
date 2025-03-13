import { Eye } from 'lucide-react';
import { useState } from 'react';
import { renewPasswordApi } from '../../../api/backEnd/user.backend';
import { InputFloatLabel } from '../../../components/uiElements/inputFloatLabel/inputFloatLabel';
import './passwordScreen.css'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { decodetoken } from '../../../helpers/decodeToken';

export const PasswordScreen = () => {
    const [type,setType] = useState('password');
    const [type2,setType2] = useState('password');
    const [emailExist,setEmailExist] = useState(false)
    const [buttonActive,setButtonActive] = useState(false)
    const [emailLoaded,setEmailLoaded] = useState();
    let counter = 0;

    console.log('loaded' + emailLoaded)
    useEffect(()=>{
        const currentURL = window.location.pathname;
        const tokenFromURL = currentURL.substring(currentURL.lastIndexOf('/') + 1);
        const {email, Id_user} = decodetoken(tokenFromURL)
        if(email && Id_user){
            setEmailExist(true)
            setEmailLoaded(email)
        }
    },[])


    const handleSubmit =async (e)=>{
        e.preventDefault()
        setButtonActive(true)
        try {
            const form = e.target
            const formData = new FormData(form);
            const password = formData.get("loginScreenPassword");
            const password2 = formData.get("loginScreenPassword2");
            if(counter === 0){
                if(password===password2){
                    const fetch = async ()=>{
                       const renew = await renewPasswordApi(emailLoaded,password)
                       if(renew.message === 'password updated'){
                        counter = 1
                        toast.success('Nouveau mot de passe enregistrer, veuillez vous connecter ', {autoClose : 1000})
                        return setTimeout(()=>{window.location.href = '/'},1600)
                       }
                       if(renew.message === "user doesn't exist"){
                        return toast.error('adress email incorrect', {autoClose : 2000})
                       }
                       else{
                        toast.error('Une erreur est survenue, veuillez réésayer plus tard ou contacter le support à contact.authenticae.fr')
                       }
                    }
                    fetch()
                } else {
                    toast.error('les deux mot de passes doivent être identique',{autoClose : 1500})
                }
            }
            
            
        } catch (err) {
            setButtonActive(false)
        }
    }


    return (
        <div> 
        <ToastContainer/>
        {emailExist ? <>
        <h1>Veuillez renseigner votre nouveau mot de passe</h1> 
        <form onSubmit={handleSubmit} id='passwordScreenForm'>
                <h2>Nouveau mot de passe</h2>
                <div className='loginScreenItemContainer'>
                    <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type} labelName='Nouveau Mot de passe' inputName='loginScreenPassword' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                </div>
                <div className='loginScreenItemContainer'>
                    <span id="password-toggle" onClick={() => setType2(type2 === 'password' ? 'text' : 'password')}><Eye /></span>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type2} labelName='Repeter mot de passe' inputName='loginScreenPassword2' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                </div>

                    <button type='submit' disabled={buttonActive} > Valider</button>  
            </form>
        </>
        : 
            <h1>Une erreur est survenu, veuillez réésayer</h1>}
        </div>
    )
}