export const InitRequest = () => {
    if(process.env.NODE_ENV === "production"){
        return import.meta.env.VITE_HOST
    }
    else {
        return "http://localhost:4000"
    }
}