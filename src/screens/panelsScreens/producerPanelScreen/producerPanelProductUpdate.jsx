import { useEffect } from "react"
import { getProduct, updatePicturesProduct, updateProduct } from "../../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { UploadDropZone } from './../../../components/uiElements/uploaddropZone/uploadDropZone';


export const ProducelPanelProductUpdate = () => {
    const {id} = useParams()
    const [product,setProduct]= useState()
    const [imgUrlProduct,setImgURLProducts] = useState();
    const [imgDisplay, setImgDisplay] = useState();
    const [fileProduct, setFileProduct] = useState();
    const [updatePage, setUpdatePage] = useState(false)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=> {
        const fetch = async()=>{
            const response = await getProduct(id)
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        if(data.data.pictures){
                            setImgDisplay(data.data.pictures.split(','))
                            setProduct(data.data);
                        }
                        else{
                            setImgDisplay(data.data.pictures)
                            setProduct(data.data);
                        }
                    }
                })
            }
        }
        fetch()
    },[])

    const productImages = async(e)=>{
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const name = formData.get("pictures");
        const response = await updatePicturesProduct(product.Id_product,formData)
        setUpdatePage(!updatePage)
    }

    const productUpdate = (e)=>{
        try {
            e.preventDefault()
            const form = e.target
            const elements = e.target.elements
            const formData = new FormData(form);
            const productName = formData.get("productName");
            const productDescription = formData.get("productDescription");
            const productSpecification = formData.get("productSpecification");
            const productPrice = formData.get("productPrice");
            const productQuantity = formData.get("productQuantity");
            const productPackaging = formData.get("productPackaging");
            const productWeight = formData.get("productWeight");
            const productHeight = formData.get("productHeight");
            const productWidth = formData.get("productWidth");
            const fetch = async ()=> {                   
                const response = await updateProduct(id,productName,productDescription,productSpecification,productPrice,productQuantity,productPackaging,productWeight,productHeight,productWidth)
                if(response){
                    response.json()
                    .then((data)=>{
                        console.log(data)
                        if(data.message === 'product updated'){
                            setProduct(data.data)
                        }
                    })
                }
    
        }
        fetch()
            
        } catch (error) {
            console.log(err)
        }
    }
    return (
        <>
        {product && 
        <>
            <div>
        <form encType="multipart/form-data" onSubmit={productImages} className="ProducerPanelDropZoneForm">
        <div>
            Changer l'avatar de votre boutique
        </div>
        <div className="ProducerPanelDropZoneContainer">
        
        { 
            imgDisplay != null && imgDisplay.map((item,index)=>{
            return <img src={product?.pictures &&  Base_URL+item}/>
        })    
        } 
            <UploadDropZone setFile={setFileProduct} loadUrlImg={setImgURLProducts} imageSet={imgUrlProduct} name='pictures' multiple='ok'/>
            <button type='submit'> Envoyer les images</button>
        </div>
        </form>
        <form onSubmit={productUpdate}>
            <input type='text' placeholder='Nom du du produit' defaultValue={product?.name}  name='productName' minLength={1} maxLength={30} required/>
            <input type='text' placeholder='Description du produit' name='productDescription' defaultValue={product?.description} minLength={1} maxLength={255} required/>
            <input type='text' placeholder='Specification du produit' name='productSpecification' defaultValue={product?.specification} minLength={1} maxLength={255} required/>
            <input type='number' placeholder='Prix du produit' name='productPrice' defaultValue={product?.price} minLength={1} required/>
            <input type='number' placeholder='Quantité disponible' name='productQuantity' defaultValue={product?.quantity} minLength={1} maxLength={50} required/>
            <input type='text' placeholder='Embalage cadeau' name='productPackaging' defaultValue={product?.packaging} minLength={1} required/>
            <input type='number' placeholder='Poids' name='productWeight' defaultValue={product?.weight} minLength={1} required/>
            <input type='number' placeholder='Hauteur' name='productHeight' defaultValue={product?.height} minLength={1} required/>
            <input type='number' placeholder='Largeur' name='productWidth' defaultValue={product?.width} minLength={1} required/>
            <button type='submit'> valider </button>
        </form>
        </div>
        <div>
            {product.name}
        </div>
        </>
        }
        </>
    )
}