import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../../../api/backEnd/user.backend"

export const AdminUserPanelScreen = ()=> {
    const [user,setUser] = useState()
    const [userRoles,setUserRoles] = useState()
    const {id} = useParams()
   useEffect(()=>{
    const fetch = async ()=> {
        const response = await getUserById(id)
        const parsed = response.json()
        .then(data =>{
            setUser(data)
        })
    }
    fetch()
   },[])
   
   const handleSubmit=()=>{

   }
    return (
    <div>
        <form>
            <input type='text' defaultValue={user?.firstname}/>
            <input type='text' defaultValue={user?.lastname}></input>
            <input type='text' defaultValue={user?.email}></input>
            {user?.roles.map((index,item)=>{

            })}
            <button onSubmit={handleSubmit}>Valider</button>
        </form>
    </div>
    )
}