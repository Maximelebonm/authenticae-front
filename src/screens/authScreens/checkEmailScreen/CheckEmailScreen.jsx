import { checkEmailApi } from './../../../api/backEnd/user.backend';
import { toast, ToastContainer } from "react-toastify";
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { useState } from 'react';
import { toastError } from '../../../helpers/toast.helper';

export const CheckEmailScreen = () => {
    const [buttonActive,setButtonActive] = useState(false)
    const checkEmail = (e)=>{
        e.preventDefault()
        try {
            if(buttonActive) toastError('Veuillez patienter')
            const form = e.target
            const formData = new FormData(form);
            const email = formData.get("checkEmail")
            setButtonActive(true)

            const checkEmail = async()=>{
                const fetchemail = await checkEmailApi(email)
         
    
                        if(fetchemail.message === 'email exist'){
                            toast.success('Un email vous a été envoyé', {autoClose : 3000}); 
                            setTimeout(()=>{window.location.href = `/login`},3000)
                        }
                        else{
                            toast.error('cet email n\'existe pas', {autoClose : 3000});
                            setTimeout(()=>{setButtonActive(false)},3000)
                        }
         
           
            }
            checkEmail()
        } catch (error) {
            console.log(error)
            toast.error('une erreur est survenue, veuillez reessayer', {autoClose : 3000});
        }
    }


    return (
        <div>
        <ToastContainer />
            <form onSubmit={checkEmail}>
                <InputFloatLabel placeholder='Ex : nom@gmail.com' type="email" name="checkEmail" label="Email" icon="Mail" labelName='E-mail' inputName='checkEmail' required='yes' minLength={6} maxLength={50} pattern='^\S+$'/>
                <button type="submit" disabled={buttonActive}>Envoyer</button>
            </form>
        </div>
    )
}