import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../../../api/backEnd/user.backend"
import { deleteShopApi, unDeleteShopApi } from './../../../../api/backEnd/admin.backend';
import { toast, ToastContainer } from "react-toastify";

export const AdminUserPanelScreen = ()=> {
    const [user,setUser] = useState()
    const [reload,setReload] = useState(false)
    // const [userRoles,setUserRoles] = useState()
    const {id} = useParams()
   useEffect(()=>{
    const fetch = async ()=> {
        const response = await getUserById(id)
        response.json()
        .then(data =>{
            setUser(data)
        })
    }
    fetch()
   },[reload])
   

   const handleSubmit=()=>{

   }
   const handleDeleteShop = () =>{
        const fetch = async ()=>{
            const deleteShop = await deleteShopApi(user.shop.Id_shop)
            console.log(deleteShop)
            if(deleteShop.message == 'shop désactivé'){
                toast.success('le shop à été désactivé', {autoClose : 3000})
                setReload(!reload)
            } else {
                toast.error('une erreur est survenue')
            }
        }
        fetch()
   }
   const handleUnDeleteShop = () =>{
    const fetch = async ()=>{
        const undeleteShop = await unDeleteShopApi(user.shop.Id_shop)
        
        if(undeleteShop.message == 'shop activé'){
            setReload(!reload)
            return toast.success('le shop à été activé', {autoClose : 3000})
        } else {
            toast.error('une erreur est survenue')
        }
    }
    fetch()
}

    return (
    <div>
    <ToastContainer/>
        <form>
            {user?.Id_user}
            <input type='text' defaultValue={user?.firstname}/>
            <input type='text' defaultValue={user?.lastname}></input>
            <input type='text' defaultValue={user?.email}></input>
            <div>
                roles : 
            {user?.roles.map((item,index)=>{
                return (
                    <div key={index}> {item.name} </div>
                )
            })}
            </div>
            <button onSubmit={handleSubmit}>Valider</button>
        </form>
            {user?.shop?.Id_shop && user.shop.deleted_by == 0 ? <button onClick={handleDeleteShop}>Désactiver le shop</button> : <button onClick={handleUnDeleteShop}>activer le shop</button> }
    </div>
    )
}