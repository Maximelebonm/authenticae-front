export const InitRequest = () => {
    if(process.env.NODE_ENV === "production"){
        return import.meta.env.VITE_URL_BACK_PROD 
    }
    else if(process.env.NODE_ENV === "development") {
        return import.meta.env.VITE_URL_BACK_DEV
    }
}