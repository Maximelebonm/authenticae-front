import { useAuthContext } from "../screens/authContext";



export const PrivateRoutes = ({children,role}) => {
    const { userDetails } = useAuthContext();

    
    if(userDetails?.role?.length > 0){
        const roleMap = userDetails.role.map(item => item.name)

        const shouldRenderChildren = Array.isArray(role)
        ? role.some(r => roleMap.includes(r))
        : roleMap.includes(role); 

        return shouldRenderChildren ? children : null
    }
}