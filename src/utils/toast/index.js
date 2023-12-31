import { toast } from "react-toastify"

export const showToast = (text)=>{
   
    return (
         toast(`🦄 ${text}`, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    )
}