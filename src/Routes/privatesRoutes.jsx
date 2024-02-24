export const PrivateRoutes = ({children,role}) => {
    
    return role=="logged" ? children : null
}