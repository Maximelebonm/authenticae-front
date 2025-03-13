import { useEffect,useState } from "react";
import { getAllUser } from "../../../../api/backEnd/user.backend";
import './adminUserList.css'
import { useNavigate } from "react-router-dom";
import { addProducerRole, deleteProducerRole } from "../../../../api/backEnd/admin.backend";
import { Link } from "react-router-dom";

export const AdminUserListScreen =()=>{
    const [users,setUsers]=useState()
    const [ChangeRole, setChangeRole]= useState(false)
    const [userSearch,setUserSearch] = useState()
    const [refresh,setRefresh] = useState(true)

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
                const resonse = await getAllUser()
                resonse.json()
                .then(data=>{
                    setUsers(data)
                    setUserSearch(data)
                })
            }
            catch (err){
                return err
            }
        }
        fetchUsers()
    },[ChangeRole,refresh])
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

    const handleChange =(e)=> {
        if(e.target.value === ''){
            setRefresh(!refresh)
        }
        const new_users = users.filter((item)=> item.email.includes(e.target.value))
        setUserSearch(new_users)
    }

    return (
    <div id='adminUserListContainer'>
        <Link to='/panelAdmin/'><div>retour</div></Link>
              <input onChange={(e)=>handleChange(e)}/>
        {
            userSearch?.map((item,index)=>{
                const hasProducerRole = item.roles.some(role => role.name === "producer");
                console.log(hasProducerRole)
                return (
                    <div key={index} className='adminUserListItem' id={index % 2===1 ? "adminuserListItemBC" : undefined}>
                        <div className='adminuserListValue'>{item.email}</div>
                        <div className='adminuserListValue' id='adminUserListRole'>{item.roles.map((role,index)=>{
                            return <div key={index}>{role.name}</div>
                        })}
                        </div>
                        <div className='adminuserListValue'>
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