import { useEffect, useState } from "react"
import { UploadDropZone } from "../../../../components/uiElements/uploaddropZone/uploadDropZone";
import { decodeCookies } from "../../../../helpers/decodeToken";
import './producerPanelScreen.css';
import { Link } from "react-router-dom";
import { createShop, getShop, updateShop,updateAvatarShop } from "../../../../api/backEnd/producer/shop.backend";
import { ProductCard } from "../../../../components/cards/productCard/productCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProducerPanelScreen = () =>{
    const cookie =  decodeCookies(document.cookie)
    const id = cookie.Id_user
    const [shop, setShop] = useState();
    const [avatarFile, setAvatarFile] = useState();
    const [couvFile, setCouvFile] = useState();
    const [imgUrlAvatar,setImgUrlAvatar] = useState();
    const [imgUrlCover,setImgUrlCover] = useState();
    const [change,setChange] = useState(false)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    const [product, setProduct] = useState()

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await getShop(id)
                if(response){
                    response.json()
                    .then(data=>{
                        if(data.message== 'shop exist'){
                            console.log(data.data)
                            setShop(data.data.shop)
                            setProduct(data.data.products)
            
                        }
                    })
                }
            } catch (error) {
                console.log(error)                
            }

        }
        fetch()
    },[change])

    
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
                                    setChange(!change)
                                    notifySuccessUpload()
                                }
                            })
                        }

                }
                
                fetch()
            } catch (err) {
            console.log(err)
            }
    }

    const avatarSubmit =async (e)=>{
        e.preventDefault()
        try {
            const form = e.target
            const elements = e.target.elements
            const formData = new FormData(form);
            const name = formData.get("avatar");
                const fetch = async ()=> {                   
                    if(shop){
                        if(name){
                            const route = 'updateAvatar'
                            const upload = await updateAvatarShop(id,formData,route);
                            setChange(!change)
                            setImgUrlAvatar()
                            notifySuccessPicture()
                        }else{
                            const route = 'updateCover'
                            const upload = await updateAvatarShop(id,formData,route);
                            setChange(!change)
                            setImgUrlCover()
                            notifySuccessPicture()
                        }
    
                    }
                    else {
                        const log = await createShop(id,shopName,shopDesc,avatar,couvFile)
                    }
                }
                if(imgUrlAvatar || imgUrlCover){
                    console.log('pass img')
                    fetch()
                }
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

    const notifySuccessUpload = () => toast.success("votre shop a été mis à jour avec succès");
    const notifySuccessPicture = () => toast.success("image télécharger avec succès")

return(
    <>
    <ToastContainer />
    { shop !=null ?
        <div>
        <form encType="multipart/form-data" onSubmit={avatarSubmit} className="ProducerPanelDropZoneForm">
        <div>
            Changer l'avatar de votre boutique
        </div>
        <div className="ProducerPanelDropZoneContainer">
        <img src={shop?.profil_picture &&  Base_URL+shop.profil_picture}/>
            <UploadDropZone setFile={setAvatarFile} loadUrlImg={setImgUrlAvatar} imageSet={imgUrlAvatar} name='avatar'/>
            <button type='submit'> Envoyer l'image</button>
        </div>
        </form>
        <div>
            Changer la photo de couverture de votre boutique
        </div>
        <form encType="multipart/form-data" onSubmit={avatarSubmit}>
            <div className="ProducerPanelDropZoneContainer">
                <img src={shop?.cover_picture && Base_URL+shop.cover_picture}/>
                <UploadDropZone setFile={setCouvFile} loadUrlImg={setImgUrlCover} imageSet={imgUrlCover} name='cover'/>
                <button type='submit'> Envoyer l'image </button>
            </div>
        </form>
        <form onSubmit={handleSubmit} className='producerPanelform'>
            <input type='text' placeholder='nom du shop' defaultValue={shop?.name}  name='shopName' minLength={1} maxLength={30} required/>
            <input type='text' placeholder={'Description du shop'} name='shopDescriptiopn' defaultValue={shop?.description} minLength={1} maxLength={255} required/>
            <button type='submit'> valider </button>
        </form>
        </div>
    : 
    <form onSubmit={shopSubmit} className='producerPanelform'>
        <input type='text' placeholder='nom du shop' name='shopName' minLength={1} maxLength={30} required/>
        <input type='text' placeholder='Description du shop' name='shopDescriptiopn' minLength={1} maxLength={255} required/>
        <button type='submit'> creer mon shop </button>
    </form>
    }
    <Link to='/myshop/product/createProduct'>
    { shop && <button>
        Creer un nouvel article
    </button>}
    </Link>
    <div id='ProducerPanelProductsContainer'>
        {product?.map((item,index)=>{
            return (
                <Link to={`/myshop/product/${item.Id_product}`} key={index}>
                    <ProductCard props={item} key={index}/>   
                </Link>
            )
        })}
    </div>
    </>
    )
}