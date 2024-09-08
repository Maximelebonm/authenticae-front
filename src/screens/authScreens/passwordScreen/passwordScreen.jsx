import { Eye } from 'lucide-react';
import { useState } from 'react';
import { renewPasswordApi } from '../../../api/backEnd/user.backend';
import { InputFloatLabel } from '../../../components/uiElements/inputFloatLabel/inputFloatLabel';
import './passwordScreen.css'
import { toast, ToastContainer } from 'react-toastify';

export const PasswordScreen = () => {
    const [type,setType] = useState('password');
    const [type2,setType2] = useState('password');
    let counter = 0;

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const email = formData.get("loginScreenEmail");
            const password = formData.get("loginScreenPassword");
            const password2 = formData.get("loginScreenPassword2");
            if(counter === 0){
                if(password===password2){
                    const fetch = async ()=>{
                       const renew = await renewPasswordApi(email,password)
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
            console.log(err)
        }
    }


    return (
        <div> 
        <ToastContainer/>
        <form onSubmit={handleSubmit} id='passwordScreenForm'>
                <h2>Nouveau password</h2>
                <InputFloatLabel placeholder='Ex : nom@gmail.com' type='email' labelName='E-mail' inputName='loginScreenEmail' required='yes' minLength={6} maxLength={50} pattern='^\S+$'/>
                <div className='loginScreenItemContainer'>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type} labelName='Nouveau Mot de passe' inputName='loginScreenPassword' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
                </div>
                <div className='loginScreenItemContainer'>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type2} labelName='Repeter mot de passe' inputName='loginScreenPassword2' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id="password-toggle" onClick={() => setType2(type2 === 'password' ? 'text' : 'password')}><Eye /></span>
                </div>

                    <button type='submit'> Valider</button>  
            </form>
        </div>
    )
}