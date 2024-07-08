import { Link } from "react-router-dom"
import { loginUser } from "../../../api/backEnd/user.backend"
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Eye } from 'lucide-react';
import './loginScreen.css'
import { Mail } from "lucide-react";
import { useState } from 'react';
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";

export const LoginScreen = () =>{

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
    
            const formData = new FormData(form);
            console.log(formData.values())
            const email = formData.get("loginScreenEmail");
            const password = formData.get("loginScreenPassword");
            console.log(email,password)
            
            const fetch = async ()=>{
               const log = await loginUser(email,password)
               if(log){
                window.location.href = '/'
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
            <form onChange={handleChange}  onSubmit={handleSubmit} id='loginScreenForm'>
                <h1>Connexion</h1>
                <InputFloatLabel placeholder='Ex : nom@gmail.com' type='email' labelName='E-mail' inputName='loginScreenEmail' required='yes' minLength={6} maxLength={50} pattern='^\S+$'/>
                <div className='loginScreenItemContainer'>
                    <InputFloatLabel className='InputBorderLeftOff' placeholder='Ex : Abcde123!' type={type} labelName='Mot de passe' inputName='loginScreenPassword' required='yes' minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                    <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
                </div>
                <div id='loginScreenButtonContainer'>
                    <button type='submit'> Se connecter</button>
                    <Link to='/register'> 
                        <button type='button' id='loginScreenSecondContainer'>
                            S'enregistrer 
                        </button>
                    </Link>
                </div>
                <GoogleLogin/>
            </form>
        </div>
    )
}