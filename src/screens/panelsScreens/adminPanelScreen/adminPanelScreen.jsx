import './adminPanelScreen.css'
import { Link } from "react-router-dom";

export const AdminPanelScreen =()=>{
    return (
    <div id='adminPanelScreenContainer'>
        <div id='adminPanelScreenContainer'>
            <Link to='/panelAdmin/tva'>
                <div className='adminPanelCard'>
                    <h2>Admin TVA Panel</h2>
                </div>
            </Link>
            <Link to='/panelAdmin/userList'>
                <div className='adminPanelCard'>
                    <h2>UserList</h2>
                </div>
            </Link>
            <Link to='/panelAdmin/category'>
                <div className='adminPanelCard'>
                    <h2>Categories</h2>
                </div>
            </Link>
            <Link to='/panelAdmin/materials'>
                <div className='adminPanelCard'>
                    <h2>Materials</h2>
                </div>
            </Link>
        </div>
    </div>
    )
}