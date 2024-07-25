import { useEffect,useState } from "react";
import {User} from 'lucide-react';
import { decodeCookies } from "../../../helpers/decodeToken";
import { createPseudo, getUserById, updateUserApi } from "../../../api/backEnd/user.backend";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { AddressComponent } from "../../../components/address/address.component";
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { addAddressApi, deleteAdressApi } from "../../../api/backEnd/address.backend";
import { toast, ToastContainer } from "react-toastify";

export const ProfilScreen = ()=>{
    const [token,setToken] = useState()
    const [pseudo,setPseudo] = useState(false)
    const [user,setUser] = useState()
    const [address, setAddress] = useState([])
    const [reload, setReload] = useState(true)

    useEffect(()=>{
        const cookies = document.cookie.split('; ')
                let authCookie = null
                for (let cookie of cookies) {
                    if (cookie.startsWith('auth=')) {
                        // Extraire la valeur du cookie après le signe '='
                        authCookie = cookie.substring('auth='.length);
                        break;
                    }
                }
                const cookie = decodeCookies(authCookie) 
                console.log(cookie)
        if(cookie){
            const fetch = async ()=>{
                const getUser = await getUserById(cookie.Id_user)
                console.log(getUser)
                if(getUser){
                    getUser.json()
                    .then((data)=>{
                        console.log(data)
                        setUser(data)
                        setAddress(data.addresses)
                        setToken(cookie)
                    })
                }
            }
            fetch()
       
        }
    },[pseudo,reload])

    const pseudoSubmit = async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const pseudo = formData.get("pseudo");
            const id = token.Id_user
            const fetch = async ()=> {                       
                const response = await createPseudo(id,pseudo)
                if(response){
                    console.log(response)
                    response.json()
                    .then((data)=>{
                            if(data.message === 'pseudo created'){
                                setPseudo(true)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    const addAdress = () => {
        const Id_address = uuidv4()
        setAddress([ { Id_address : Id_address, country : '', cityCode : '',city : '', additional : '',street : '', number :''}, ...address]) 
    }

    const handleSubmitAdress = (e) => {
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const formCountry = formData.get("country");
            const formCitycode = formData.get("cityCode");
            const formCity = formData.get("city");
            const formNumber = formData.get("number");
            const formStreet = formData.get("street");
            const formAdditional = formData.get("additional");
            const id = token.Id_user
            const formObject = {formCountry,formCitycode,formCity,formNumber,formStreet,formAdditional}
            const fetch = async ()=> {  
                console.log(formObject)                     
                const response = await addAddressApi(formObject,id)
                if(response){
                    console.log(response)
                    response.json()
                    .then((data)=>{
                            if(data.message === 'address created'){
                                toast.success('adresse mis à jour !', {autoclose : 2000})
                                setReload(!reload)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    const handleChangeProfile = (e,obj)=> {
        const newValue = e.target.value
        const newUser = {...user}
        switch(obj){
            case 'firstname' : newUser.firstname = newValue;
            break;
            case 'lastname' : newUser.lastname = newValue;
            break;
            case 'birthdate' : newUser.birthdate = newValue;
            break;
            case 'phone' : newUser.phone = newValue;
            break;
        }
        setUser(newUser)
    }

    const handleSubmitProfile =(e)=> {
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const formFirstname = formData.get("firstname");
            const formLastname = formData.get("lastname");
            const formBirthdate = formData.get("birthdate");
            const formPhone = formData.get("phone");

            const id = token.Id_user
            const formObject = {formFirstname,formLastname,formBirthdate,formPhone}
            const fetch = async ()=> {  
                console.log(formObject)                     
                const response = await updateUserApi(formObject,id)
                if(response){
                    console.log(response)
                    response.json()
                    .then((data)=>{
                            if(data.message === 'address created'){
                                setAddress(data.data)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    const handleChangeAddress = (e,obj,id)=> {
        const newValue = e.target.value
        console.log(address)
        const newAdress = [...address]
        newAdress.map((item)=>{
        if(item.Id_address === id)
            switch(obj){
                case 'country' : item.country = newValue;
                break;
                case 'cityCode' : item.cityCode = newValue;
                break;
                case 'city' : item.city = newValue;
                break;
                case 'number' : item.number = newValue;
                break;
                case 'street' : item.street = newValue;
                break;
                case 'additionnal' : item.additional = newValue;
                break;
            }
        })
        setAddress(newAdress)
    }

    const deleteAdress = (e,Id_adress)=> {
        (async()=>{
            const resp = await deleteAdressApi(Id_adress)
            resp.json()
            .then((data)=>{
                if(data.message == "row deleted")
                    toast.success('adress supprimé', {autoclose : 2000});
                    setReload(!reload)
            })
        })()
    }
console.log(user)
    return (
        <div className="profileScreenContainer">
        <ToastContainer/>
                {
                token?.identifiant ? 
                <>
                Votre identifiant est : {token.identifiant} (non modifiable)
                <form onSubmit={handleSubmitProfile}>
                    <InputFloatLabel placeholder="Ex : John" onchange={(e)=>handleChangeProfile(e,'firstname')} type='text' labelName='prénom' inputName='firstname' inputValue={user?.firstname ?? ''} required='yes' maxLength={30} minLength={1}/>
                    <InputFloatLabel placeholder="ex : Dupont" onchange={(e)=>handleChangeProfile(e,'lastname')} type='text' labelName='Nom' inputName='lastname' inputValue={user?.lastname ?? ''} required='yes' minLength={1} maxLength={50}/>
                    <InputFloatLabel placeholder="" type='date' onchange={(e)=>handleChangeProfile(e,'birthdate')} labelName='Date de Naissance' inputName='birthdate' inputValue={user?.birthdate ?? ''} required='yes' min='2008-01-01'/>
                    <InputFloatLabel placeholder="Ex : 0606060606" onchange={(e)=>handleChangeProfile(e,'phone')} type='number' labelName='N° de téléphone' inputName='phone' inputValue={user?.phone ?? ''} required='yes' maxLength={30} minLength={12} />
                    <button>Valider profil</button>
                </form>
                <div>
                    votre adress Email : {user?.email}
                    <button>Modifier</button>
                </div>
                <Link to="/cart">
                    <div>votre panier</div>
                </Link>
                <button type="button" onClick={addAdress} >ajouter une address</button>
                    {address.map((item,index)=>{
                        return <AddressComponent props={item} key={index} onChange={(e,obj,id)=>handleChangeAddress(e,obj,id)} submitAdress={(e)=>handleSubmitAdress(e)} deleteAddress={(e,Id_address)=>deleteAdress(e,Id_address)}/>
                    })}          
                </>
                : 
                <div>
                Veuillez choisir un pseudonyme afin de finaliser votre compte. <br/>
                ATTENTION Celui ci n&apos;est pas modifiable !
                    <div>
                        <form onSubmit={pseudoSubmit}>
                            <input type='text' placeholder="Votre pseudo"  name='pseudo' required minLength={3} maxLength={50}/>
                                <User/>
                            <button type='submit'>Valider</button>
                        </form>
                    </div>
                </div>
                }
        </div>
    )               
}