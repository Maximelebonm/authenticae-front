import { toast, Zoom } from "react-toastify"


export const toastSuccess = (props)=>{
    toast.success(`${props}`,{hideProgressBar: false,pauseOnHover: false,autoClose : 2000,position: "top-left",transition: Zoom})
}

export const toastError = (props)=>{
    toast.error(`${props}`,{hideProgressBar: false,pauseOnHover: false,autoClose : 2000,position: "top-left",transition: Zoom})
}