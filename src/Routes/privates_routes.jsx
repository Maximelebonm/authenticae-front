import { useState, useEffect } from "react"
import { decodeCookies } from "../helpers/decodeToken"
import { HomeScreen } from "../screens/homeScreen/homeScreen"
import { LoginScreen } from "../screens/authScreens/loginScreen/loginScreen"

export const PrivateRoutes = ({children,role}) => {
    const [roleCookie,setRoleCookie]=useState()
    useEffect(()=>{
        if(document.cookie){
            const decodeCookie = async()=>{
                const cookie = await decodeCookies(document.cookie)
                setRoleCookie(cookie.role)
            }
            decodeCookie()
        }
    },[])
    if(roleCookie != null){
        const roleMap = roleCookie.map(item => item.name)

        const shouldRenderChildren = Array.isArray(role)
        ? role.some(r => roleMap.includes(r))
        : roleMap.includes(role);

        return shouldRenderChildren ? children : null
    }
}