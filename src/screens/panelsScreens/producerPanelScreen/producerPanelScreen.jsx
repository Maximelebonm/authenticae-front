import { useEffect, useState } from "react"
import { UploadDropZone } from "../../../components/uiElements/uploaddropZone/uploadDropZone";
import { decodeCookies } from "../../../helpers/decodeToken";
import { createShop, getShop, updateShop } from "../../../api/backEnd/producer/shop.backend";

export const ProducerPanelScreen = () =>{
    const cookie =  decodeCookies(document.cookie)
    const id = cookie.Id_user
    const [shop, setShop] = useState();

    useEffect(()=>{
        const fetch = async ()=>{
            console.log(id)
            try {
                const response = await getShop(id)
                const shopExist = response.json()
                    .then(data=>{
                        setShop(data)
                    })
                
            } catch (error) {
                console.log(err)                
            }

        }
        fetch()
    },[])
    console.log(shop)

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
            console.log(elements)
            const formData = new FormData(form);
            const shopName = formData.get("shopName");
            const shopDesc = formData.get("shopDescriptiopn");
                console.log('pass')
                const fetch = async ()=>{
                    
                    if(shop){
                        console.log('update')
                        const log = await updateShop(id,shopName,shopDesc)
                    }
                    else {
                        const log = await createShop(id,shopName,shopDesc)
                    }
                }
                fetch()
            } catch (err) {
            alert('une erreur est survenu',err)
            }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='nom du shop' defaultValue={shop?.name}  name='shopName' minLength={1} maxLength={30} required/>
            <input type='text' placeholder={'Description du shop'} name='shopDescriptiopn' defaultValue={shop?.description} minLength={1} maxLength={30} required/>
            <div>
            </div>
            <UploadDropZone/>
            <UploadDropZone/>
            <div>Telephone</div>
            <div>Social media</div>
            <button type='submit'> Envoyer </button>
        </form>
        </div>
    )
}