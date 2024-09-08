import { useState,useEffect } from "react"
import { createProduct } from "../../../../api/backEnd/producer/product.backend"
import { getShop } from "../../../../api/backEnd/producer/shop.backend";
import { decodeCookies } from "../../../../helpers/decodeToken";
import { useNavigate } from "react-router-dom";

export const ProducerPanelProductScreen =()=> {
    const [shop, setShop] = useState()
    const cookie =  decodeCookies(document.cookie)
    console.log(cookie)
    const Id_user = cookie.Id_user
    const Id_shop = shop?.Id_shop
    const navigate = useNavigate()

   
  
    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await getShop(Id_user)
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

    const productSubmit = async (e) =>{
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form);
            const productName = formData.get("productName");
            const productDescription = formData.get("productDescription");
            const fetch = async()=>{
                const response = await createProduct(Id_user,Id_shop,productName,productDescription)
                if(response){
                    response.json()
                    .then((data)=>{
                        console.log()
                        if(data.message === 'product created'){
                            navigate(`/myshop/product/${data.data.Id_product}`)
                        }
                    })
                }
            }
            fetch();         
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <form onSubmit={productSubmit} className='producerPanelform'>
        <input type='text' placeholder="nom du produit" name='productName' minLength={1} maxLength={30} required/>
        <textarea type='text' placeholder="Description rapide du produit" name='productDescription' minLength={1} maxLength={255} required/>
        <button type='submit'> creer mon article </button>
    </form>
    )
}