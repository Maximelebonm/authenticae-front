import { useEffect,useState } from "react";
import './profilescreen.css';
import { getUserById, logoutApi, updateUserApi } from "../../../api/backEnd/user.backend";
import { v4 as uuidv4 } from 'uuid';
import { AddressComponent } from "../../../components/address/address.component";
import { InputFloatLabel } from "../../../components/uiElements/inputFloatLabel/inputFloatLabel";
import { addAddressApi, deleteAdressApi, updateAddressApi } from "../../../api/backEnd/address.backend";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "../../authContext";
import { toastError, toastSuccess } from "../../../helpers/toast.helper";
import Modal from "../../../components/modals/modal";
import { deleteUserApi } from './../../../api/backEnd/user.backend';
import { useNavigate } from "react-router-dom";
import { useRefreshUserAuth } from "../../authContext";

export const ProfilScreen = ()=>{
    
    // const [pseudo,setPseudo] = useState(false)
    const [user,setUser] = useState()
    const [address, setAddress] = useState([])
    const [newAddress, setNewAddress] = useState([])
    const [formSwitch, setformSwitch] = useState({})
    const [reload, setReload] = useState(true)
    const [showModalDeleteUser, setshowModalDeleteUser] = useState(null)
    const [showModalDeleteAdress, setshowModalDeleteAdress] = useState(null)
    const navigate = useNavigate()
    const { userDetails } = useAuthContext();
     const refresh = useRefreshUserAuth()

    useEffect(()=>{
        if(userDetails?.Id_user){
            const fetch = async ()=>{
                const getUser = await getUserById(userDetails.Id_user)
                if(getUser){
                    getUser.json()
                    .then((data)=>{
                        console.log(data)
                        setUser(data)
                        setAddress(data.addresses)
                        
                    })
                }
            }
            fetch()
        }
    },[reload])

    const addAdress = () => {
        const Id_address = uuidv4()
        setNewAddress([ { Id_address : Id_address, country : '', cityCode : '',city : '', additional : '',street : '', number :''}]) 
    }

    const handleSubmitAdress = (e,Id_address) => {
        console.log('address submit')
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
            const id = userDetails.Id_user
            const formObject = {formCountry,formCitycode,formCity,formNumber,formStreet,formAdditional}

            const fetch = async ()=> {  
                console.log(formObject)
                let addressExist = false
                user.addresses.forEach((item)=>{
                    if(item.Id_address === Id_address){
                        addressExist = true
                    }                
                })
                let response
                if(addressExist){
                    response = await updateAddressApi(formObject,Id_address)
                } else {
                    response = await addAddressApi(formObject,id)
                }
                response.json()
                .then((data)=>{
                    if(['address created','address updated'].includes(data.message)){
                        console.log('pass')
                        toastSuccess('adresse mis à jour !')
                        setNewAddress([])
                        setformSwitch(false)
                        setReload(!reload)
                        refresh()
                    } else {
                        toastError('Une erreur est survenu')
                    }
                })
            };

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

            const id = userDetails.Id_user
            const formObject = {formFirstname,formLastname,formBirthdate,formPhone}
            const fetch = async ()=> {                      
                const response = await updateUserApi(formObject,id)
                if(response){
                    response.json()
                    .then((data)=>{
                        console.log(data)
                            if(data.message === 'user updated'){
                                setUser(data.data)
                                toastSuccess('Profil mis à jour')
                                   refresh()
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

    const handleChangeAddress = (e,obj,id,state)=> {
        const newValue = e.target.value
        console.log(state)
        let newAdress = [];
        if(state === 'new'){
            newAdress = [...newAddress] 

        }
        if(state !== 'new'){
            newAdress = [...address] 

        }
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
        if(state === 'new'){
            setNewAddress(newAdress)
        } else {
            setAddress(newAdress)
        }
    }

    const deleteAdress = (Id_adress)=> {
        (async()=>{
            const resp = await deleteAdressApi(Id_adress)
            resp.json()
            .then((data)=>{
                if(data.message == "row deleted")
                    toast.success('adresse supprimé', {autoclose : 2000});
                    setshowModalDeleteAdress(null)
                    setReload(!reload)
                    refresh()
            })
        })()
    }

    const modalDeleteAdress = (Id_adress) => {
        setshowModalDeleteAdress(Id_adress);
    }

    const deleteUser = ()=>{
        const id = userDetails.Id_user
        const fetch = async()=>{
            const resp = await deleteUserApi(id)
            if(resp.message === 'utilisateur supprimé'){
                toastSuccess('Votre compte a été supprimé vous allez être redirigé')
                setTimeout(async()=>{
                    const logout = await logoutApi()
                    if(logout.message === 'deconnecté'){
                        toast.success('Déconnexion réussie',{autoclose : 1000})
                        return setTimeout(()=>{window.location.href = '/'},1500)
                    }

                },1000)
            }
        }
        fetch()
    }

    const toggleModifyState = (index) => {
        setformSwitch((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    return (
        <div className="profileScreenContainer">
                <ToastContainer/>
                <form onSubmit={handleSubmitProfile}>
                <div>
                Genre
                <select value={user?.gender}>
                    <option value="Mr">Mr</option>
                    <option value="Mme">Mme</option>
                </select>
                </div>
                {user?.gender}
                    votre addresse email : {user?.email}
                    <InputFloatLabel placeholder="Ex : John" onchange={(e)=>handleChangeProfile(e,'firstname')} type='text' labelName='prénom' inputName='firstname' inputValue={user?.firstname ?? ''} required='yes' maxLength={30} minLength={1}/>
                    <InputFloatLabel placeholder="ex : Dupont" onchange={(e)=>handleChangeProfile(e,'lastname')} type='text' labelName='Nom' inputName='lastname' inputValue={user?.lastname ?? ''} required='yes' minLength={1} maxLength={50}/>
                    <InputFloatLabel placeholder="" type='date' onchange={(e)=>handleChangeProfile(e,'birthdate')} labelName='Date de Naissance' inputName='birthdate' inputValue={user?.birthdate ?? ''} required='yes' max='2008-01-01'/>
                    <InputFloatLabel placeholder="Ex : 0606060606" onchange={(e)=>handleChangeProfile(e,'phone')} type='number' labelName='N° de téléphone' inputName='phone' inputValue={user?.phone ?? ''} required='yes' maxLength={30} minLength={12} />
                    <button>Valider profil</button>
                </form>
                {address.map((item,index)=>{
                        return (
                            <div key={index}>
                            {!formSwitch[index] ? 
                                <div className="addressContainer" key={index}>
                                    <div>
                                        <h2>Adresse {index+1}</h2>
                                    </div>
                                    <div className='address'>
                                        <p>{item.number}</p>
                                        <p>{item.street}</p>
                                        <p>{item.cityCode}</p>
                                        <p>{item.city}</p>
                                        <p>{item.additional}</p>
                                        <p>{item.country}</p>
                                        <button onClick={() => toggleModifyState(index)}>Modifier</button>
                                    </div>
                                </div>
                            : 
                            <>
                                <AddressComponent props={item} key={index} onChange={(e,obj,id)=>handleChangeAddress(e,obj,id)} submitAdress={(e,Id_address)=>{handleSubmitAdress(e,Id_address);setformSwitch(!formSwitch)}} deleteAddress={()=>modalDeleteAdress(item.Id_address)}/>
                                <button onClick={() => toggleModifyState(index)}>annuler</button>
                                </>
                            }
                            </div>
                        )
                    })}
                    {
                    address.length === 0 &&
                        <button type="button" onClick={addAdress} >ajouter une addresse</button>
                    }
                    {newAddress.map((item,index)=>{
                        return <AddressComponent props={item} key={index} onChange={(e,obj,id)=>handleChangeAddress(e,obj,id,'new')} submitAdress={(e,Id_address)=>{handleSubmitAdress(e,Id_address,'new');setformSwitch(false)}} deleteAddress={()=>modalDeleteAdress(item.Id_address)}/>
                    })}

                    
                    {showModalDeleteAdress && (
                        <Modal show={true} onClose={()=>setshowModalDeleteAdress(null)} onConfirm={()=>deleteAdress(showModalDeleteAdress)}>
                            êtes vous sur de vouloir supprimer votre adrresse ?
                        </Modal>
                    )}
                    
                    <Modal show={showModalDeleteUser === userDetails.Id_user} onClose={()=>setshowModalDeleteUser(null)} onConfirm={()=>deleteUser()}>
                    êtes vous sur de vouloir supprimer votre compte ? Il s&apos;agit d&apos;une suppression définitive, toutes les données personnelles vous concernant seront effacé (email, téléphones, adresses), seul votre historique de commandes sera conservé pour nos statistiques. 
                    </Modal>
                <a onClick={()=>{setshowModalDeleteUser(userDetails.Id_user)}}>Supprimer le compte</a>
        </div>
    )               
}