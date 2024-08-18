export const InitRequest = () => {
    if(process.env.NODE_ENV === "production"){
        return import.meta.env.VITE_HOST
    }
    else  if(process.env.NODE_ENV === "developpment") {
        return import.meta.env.VITE_HOST
    }
}