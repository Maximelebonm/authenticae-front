export const configStorage = () => {
    if(process.env.NODE_ENV === "production"){
        return import.meta.env.VITE_BACK_STORAGE_PROD 
    }
    else if(process.env.NODE_ENV === "development") {
        return import.meta.env.VITE_BACK_STORAGE_DEV
    }
}