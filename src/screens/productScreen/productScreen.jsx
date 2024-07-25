import { useEffect } from "react"
import { getProduct } from "../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import './productScreen.css'
import { ProductSwiper } from "../../components/uiElements/productSwiper/productSwiper";
import { ToastContainer, toast } from 'react-toastify';
import { addCartApi } from "../../api/backEnd/buyProcess/cart.backend";
import { decodeCookieUser } from "../../helpers/decodeToken";


export const ProductScreen = () => {
    const {id} = useParams()
    const [product,setProduct]= useState();
    const [imgDisplay, setImgDisplay] = useState();
    // const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    const [price,setPrice] = useState({mainPrice : 0, quantity_available : 0,quantity_reservation : 0, options : [], personalization : []})
    const [selectedProduct, setSelectedProduct] = useState({product : {}, options : [], personalization : []})
   
    const [reload,setReload] = useState(false)

    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectReload,setSelectReload] = useState({quantityA : 'none',quantityR : 'none', option : 'none', personalisation : ''})


    const cookiesAuth = decodeCookieUser(document.cookie)
    useEffect(()=> {
        const fetch = async()=>{
            const response = await getProduct(id)
            if(response){
                console.log(response)
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data.data)
                        setImgDisplay(data.data.images)
                        setProduct(data.data);
                        const optionsNumber = []
                        data.data.option.forEach((item)=>{
                            optionsNumber.push(item)
                        })
                        selectedProduct.product.Id_product = data.data.product.Id_product
                        ///////
                        const initialSelectedOptions = {};
                        data.data.option.forEach((item) => {
                            initialSelectedOptions[item.Id_product_option] = 'none';
                        });
                        setSelectedOptions(initialSelectedOptions);
                        ///////
                        setPrice({mainPrice : data.data.product.price, option : data.data.option})
                    }
                })
            }
        }
        setSelectReload({quantityA : 'none',quantityR : 'none', personalisation : ''})
        fetch()
    },[reload]);


    useEffect(()=> {
        let newPrice = product?.product.price
        if(selectedProduct.options.length !== 0){
            console.log(newPrice)
            selectedProduct.options.forEach((item)=>{
                console.log(item.price)
                newPrice += item.price
            })
            console.log(newPrice)
        }
        if(selectedProduct.personalization.length !==0){
            selectedProduct.personalization.forEach((item)=>{
                newPrice += item.price
            })
        }
        if(selectedProduct.product.quantity>1){
            newPrice *= selectedProduct.product.quantity
        }
        setPrice({finalPrice : newPrice})
    },[selectedProduct]);

    const handleOptionChange = (event,idOption) => {

        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [idOption]: event.target.value
        }));
        if(event.target.value == "none"){
            const updatedOptions = selectedProduct.options.filter((item) => {return item.option !== idOption});
            console.log(updatedOptions)
            setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                options: updatedOptions
            }));
        }else {
            const selectedOption = JSON.parse(event.target.value);
            const optionWasSelected = selectedProduct.options.find((item)=> item.option === idOption)
            console.log(optionWasSelected)
            if (!optionWasSelected) {
                const newOption = { option: idOption, subOption: selectedOption.Id_subOption, price : selectedOption.price};
                const updatedOptions = [...selectedProduct.options, newOption];
                setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    options: updatedOptions
                }));
            }else {
                const updatedOptions = selectedProduct.options.map((item) => {
                    if (item.option === idOption) {
                        return { ...item, subOption: selectedOption.Id_subOption, price: selectedOption.price };
                    }
                    return item;
                });
                setSelectedProduct((prevProduct) => ({
                    ...prevProduct,
                    options: updatedOptions
                }));
            }
        }
    };

    const handlePersonalizationChange = (e,Inputpersonalization)=>{
        const pvalue = e.target.value
        selectReload.personalisation = pvalue
        if(pvalue === ""){
            const updatedPersonalization = selectedProduct.personalization.filter((item) => {return item.Id_personalization !== Inputpersonalization.Id_personalization});
            console.log(updatedPersonalization)
            setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                personalization : updatedPersonalization
            }));
        } else {
            const PersWasSelected = selectedProduct.personalization.find((item)=> item.Id_personalization === Inputpersonalization.Id_personalization)
            if(!PersWasSelected){
                const NewPersonalization = {Id_personalization : Inputpersonalization.Id_personalization, price : Inputpersonalization.price, value : e.target.value}
                const updatedPers = [...selectedProduct.personalization,NewPersonalization]
                setSelectedProduct((prevProduct)=>({
                    ...prevProduct,
                    personalization : updatedPers
                }))
            } else {
                const updatedPersonalization = selectedProduct.personalization.map((item) => {
                    if (item.Id_personalization === Inputpersonalization.Id_personalization) {
                        return {...item,Id_personalization : item.Id_personalization, price : item.price, value : e.target.value  };
                    }
                    return item;
                });
                setSelectedProduct((prevProduct)=>({
                    ...prevProduct,
                    personalization : updatedPersonalization
                }))
       
            }
        }
    }

    const handlequantityChange = (e,obj) => {
        try {
            const value = e.target.value
            const NewSelectedProduc = {...selectedProduct}
            NewSelectedProduc.product.quantity = value
            setSelectedProduct(NewSelectedProduc)
            if(obj === 'A') selectReload.quantityA = value
            if(obj === 'R') selectReload.quantityR = value
        
        } catch (error) {
           console.log(error)
        }
    }

    const handleSubmit = (e)=>{
        try {
            e.preventDefault()
            if(cookiesAuth.Id_user){
                const fetch = async ()=> {
                    const response = await addCartApi(selectedProduct,price.finalPrice)
                    if(response){
                        response.json()
                        .then((data)=> {
                            console.log(data)
                            if(data.message == "ajouté au panier" || data.message == "cart créé" || data.message == 'cart updated'){
                                toast.success('Produit ajouté au panier', {autoclose : 2000})
                                setReload(!reload)
                            }
                            if(data.message === "SequelizeUniqueConstraintError"){
                                toast.error('Une erreur est survenu veuillez vous déconnecter et vous reconnecter', {autoclose : 2000})
                            }
                        })
                    }
                    // else{
                    //     toast.error('Une erreur est survenu veuillez vous déconnecter et vous reconnecter', {autoclose : 2000})
                    // }
                }
                fetch()
            } else {
                toast.error('Vous devez creer un compte pour creer un panier', {autoclose : 2000})
            }
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer/>
            {product?.product && 
            <div className='productContainer'>
                <ProductSwiper props={imgDisplay}/>
                { product.option &&   
                <div className="productInfoContainer">
                <h2>
                   prix total : {price.finalPrice || price.mainPrice}€
                </h2>   
                <h2>
                    {product?.product.name}
                </h2> 
                <p>
                    {product?.product.description}
                </p>
                <p>
                    {product?.product.detail}
                </p>
                <form onSubmit={handleSubmit}>
                    {
                        product?.product.quantity_available > 0 ?
                        <>
                            Quantité disponible : {product?.product.quantity_available}
                            <select className='productOption' name='quandtitySeleted' onChange={(e)=>handlequantityChange(e, 'A')} value={selectReload.quantityA} >
                                <option value='None'>choisir une quantité</option>
                                {
                                    Array.from({ length: product?.product.quantity_available}).map((_, i) => (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    ))
                                }
                            </select>
                        </> 
                        : 
                        <>
                            Quantité réservable : {product?.product.quantity_reservation}    
                            <select className='productOption' name='quantityReservation' onChange={(e)=>handlequantityChange(e, 'R')} value={selectReload.quantityR}>
                                <option value="none">choisir une quantité</option>
                                {
                                    Array.from({ length: product?.product.quantity_reservation + 1 }).map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))
                                }
                            </select>
                        </>
                    }
            
                    {product?.option.map((item,index)=>{
                        {/* console.log(item) */}
                        if(item.optionActive == true){                       
                            return(
                                <div key={index}>
                                <div> {item.name} </div>
                                    <select className='productOption' name='optionSelected'  value={selectedOptions[item.Id_product_option] || 'none'} onChange={(e)=>handleOptionChange(e,item.Id_product_option)}>
                                        <option value="none">Selectionner une option</option>
                                        {item.subOptions.map((subItem,subIndex)=>{
                                                if(subItem){
                                                return (
                                                    <option key={subIndex} value={JSON.stringify(subItem)} > {subItem.detail + ' (+ ' + subItem.price + '€)'}</option>
                                                )
                                                } 
                                                {/* if(subItem.quantity_reservation > 0){
                                                    return (
                                                        <option key={subIndex} value={JSON.stringify(subItem)} > {subItem.detail + ' (+ ' + subItem.price + '€) à réserver'}</option>
                                                    ) 
                                                }
                                                 else {
                                                    return (
                                                        <option key={subIndex} disabled> {subItem.detail + ' (+ ' + subItem.price + '€) Non disponible'}</option>
                                                    ) 
                                                } */}
                                        })}
                                    </select>      
                            </div>
                            )
                        }
                    })}
                    {product.personalization.map((item,index)=>{
                        if(item.personalizationActive){
                        return(
                            <div key={index}>
                                <div>{item.name}</div>
                                <div>{item.detail}</div>
                                <div>Prix de la personalisation : {item.price} € </div>
                                <textarea className="ProductpersonalizationInput" onChange={(e)=>handlePersonalizationChange(e,item)} value={selectReload.personalisation}></textarea>
                            </div>
                            )
                        }
                    })}
                    <button type='submit'>Ajouter au panier</button>
                </form>
                </div>                 
            }
            </div>
            }
        </>
    )
}