import { useEffect,useState } from "react";
import { getAllUser } from "../../../api/backEnd/user.backend";
import './adminPanelScreen.css'
import { useNavigate } from "react-router-dom";
import { addProducerRole, deleteProducerRole } from "../../../api/backEnd/admin.backend";

export const AdminPanelScreen =()=>{
    const [users,setUsers]=useState()
    const [ChangeRole, setChangeRole]= useState(false)
    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
                const resonse = await getAllUser()
                const users = resonse.json()
                .then(data=>{
                    setUsers(data)
                })
            }
            catch (err){
                return err
            }
        }
        fetchUsers()
    },[ChangeRole])
    console.log(users)

    
    const navigate = useNavigate()
    const userNavigate = (id)=> {
        navigate(`/panelAdmin/user/${id}`,{ user_Id: id})
    }

    const addProducer = async (id) =>{
        const addRole = await addProducerRole(id)
        setChangeRole(!ChangeRole)
    }

    const deleteProducer = async (id) =>{
        const deleteRole = await deleteProducerRole(id)
        setChangeRole(!ChangeRole)
    }

    return (
    <div id='adminPanelScreenContainer'>
        {
            users?.map((item,index)=>{
                const hasProducerRole = item.roles.some(role => role.name === "producer");
                console.log(hasProducerRole)
                return (
                    <div key={index} className='adminPanelItem' id={index % 2===1 ? "adminPanelItemBC" : undefined}>
                        <div className='adminPanelValue'>{item.email}</div>
                        <div className='adminPanelValue' id='adminPanelRole'>{item.roles.map((role,index)=>{
                            return <div key={index}>{role.name}</div>
                        })}
                        </div>
                        <div className='adminPanelValue'>
                            <button onClick={()=>userNavigate(item.Id_user)}>update</button>
                            <button>delete</button>
                        </div>
                            <div>
                            {
                               hasProducerRole ? <button onClick={()=>deleteProducer(item.Id_user)}>delete Prod</button>
                               : <button onClick={()=>addProducer(item.Id_user)}>Add Prod</button>
                                                            
                            }
                            
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}