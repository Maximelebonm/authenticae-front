import { useEffect, useState } from "react"
import { UploadDropZone } from "../../../components/uiElements/uploaddropZone/uploadDropZone";
import { decodeCookies } from "../../../helpers/decodeToken";
import './producerPanelScreen.css'
import { createShop, getShop, updateShop,updateAvatarShop } from "../../../api/backEnd/producer/shop.backend";

export const ProducerPanelScreen = () =>{
    const cookie =  decodeCookies(document.cookie)
    console.log(cookie)
    const id = cookie.Id_user
    const [shop, setShop] = useState();
    const [avatarFile, setAvatarFile] = useState();
    const [couvFile, setCouvFile] = useState();
    const [imgUrlAvatar,setImgUrlAvatar] = useState();
    const [imgUrlCover,setImgUrlCover] = useState();
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await getShop(id)
                if(response){
                    response.json()
                    .then(data=>{
                        if(data.message== 'shop exist'){
                            setShop(data.data)
                        }
                    })
                }
            } catch (error) {
                console.log(error)                
            }

        }
        fetch()
    },[])

    
    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
            const formData = new FormData(form);
            const shopName = formData.get("shopName");
            const ShopDescription = formData.get("shopDescriptiopn");
            console.log(formData)
                const fetch = async ()=> {                   
                        const response = await updateShop(id,shopName,ShopDescription)
                        if(response){
                            response.json()
                            .then((data)=>{
                                console.log(data)
                                if(data.message === 'shop updated'){
                                    setShop(data.data)
                                }
                            })
                        }

                }
                fetch()
            } catch (err) {
            alert(err)
            }
    }
    const avatarSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
            const formData = new FormData(form);
            const name = formData.get("avatar");

            console.log(name)
                const fetch = async ()=> {                   
                    if(shop){
                        if(name){
                            const route = 'updateAvatar'
                            const upload = await updateAvatarShop(id,formData,route)
                        }else{
                            const route = 'updateCover'
                            const upload = await updateAvatarShop(id,formData,route)
                        }
    
                    }
                    else {
                        const log = await createShop(id,shopName,shopDesc,avatar,couvFile)
                    }
                }
                fetch()
            } catch (err) {
            alert(err)
            }
    }

    const shopSubmit = async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const shopName = formData.get("shopName");
            const description = formData.get("shopDescriptiopn");
      
                const fetch = async ()=> {                       
                    const response = await createShop(id,shopName,description)
                    if(response){
                        const shopCreate = response.json()
                        .then((data)=>{
                            if(data.message === 'shop created'){
                                setShop(data.data)
                            }
                        })
                    }
                }
                fetch()
            } catch (err) {
                alert(err)
            }
    }

return(
    <>


    { shop !=null ?
        <div>
        <form encType="multipart/form-data" onSubmit={avatarSubmit} className="ProducerPanelDropZoneForm">
        <div>
            Changer l'avatar de votre boutique
        </div>
        <div className="ProducerPanelDropZoneContainer">
        <img src={shop?.profil_picture &&  Base_URL+shop.profil_picture}/>
            <UploadDropZone setFile={setAvatarFile} loadImg={setImgUrlAvatar} imageSet={imgUrlAvatar} name='avatar'/>
            <button type='submit'> Envoyer l'image</button>
        </div>
        </form>
        <div>
            Changer la photo de couverture de votre boutique
        </div>
        <form encType="multipart/form-data" onSubmit={avatarSubmit}>
            <div className="ProducerPanelDropZoneContainer">
                <img src={shop?.cover_picture && Base_URL+shop.cover_picture}/>
                <UploadDropZone setFile={setCouvFile} loadImg={setImgUrlCover} imageSet={imgUrlCover} name='cover'/>
                <button type='submit'> Envoyer l'image </button>
            </div>
        </form>
        <form onSubmit={handleSubmit}
        //method="POST" action="http://localhost:4000/shop/update/:id"
        >
            <input type='text' placeholder='nom du shop' defaultValue={shop?.name}  name='shopName' minLength={1} maxLength={30} required/>
            <input type='text' placeholder={'Description du shop'} name='shopDescriptiopn' defaultValue={shop?.description} minLength={1} maxLength={255} required/>
            <button type='submit'> valider </button>
        </form>
        </div>
    : 
    <form onSubmit={shopSubmit}>
        <input type='text' placeholder='nom du shop' name='shopName' minLength={1} maxLength={30} required/>
        <input type='text' placeholder='Description du shop' name='shopDescriptiopn' minLength={1} maxLength={255} required/>
        <button type='submit'> creer mon shop </button>
    </form>
    }
    </>
    )
}