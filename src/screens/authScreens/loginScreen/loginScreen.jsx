import { Link } from "react-router-dom"
import { loginUser } from "../../../api/backEnd/user.backend"
import { GoogleLogin } from "../../../components/login/google/googleLogin";
import { Eye } from 'lucide-react';
import './loginScreen.css'
import { Mail } from "lucide-react";
import { useState } from 'react';

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

    const [type,setType] = useState();
    
    const handleChange =(e)=>{
        const {name, value} = e.target
    }

    return (
        <div id='loginScreenContainer'>
        <div id='loginScreenSecondContainer'>
            <Link to='/register'> aller à la page Enregistrement </Link>
                OU
            <GoogleLogin/>
        </div>
        <form onChange={handleChange}  onSubmit={handleSubmit} id='loginScreenForm'>
            <h1>Connection</h1>
            <div className='loginScreenItemContainer'>
                <input placeholder='Email' type='email' name='loginScreenEmail' id='loginScreenEmail' required minLength={6} maxLength={50} pattern='^\S+$'/>
                <span><Mail /></span>
            </div>
            <div className='loginScreenItemContainer'>
                <input placeholder='Mot de passe' type={type} name='loginScreenPassword' id='loginScreenPassword'  required minLength={12} maxLength={30} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$'/>
                <span id="password-toggle" onClick={() => setType(type === 'password' ? 'text' : 'password')}><Eye /></span>
            </div>
            <button type='submit'> Se connecter</button>
        </form>
        </div>
    )
}