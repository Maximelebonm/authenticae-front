import { useEffect } from "react"
import { getProduct } from "../../api/backEnd/producer/product.backend"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import './productScreen.css'
import { ProductSwiper } from "../../components/uiElements/productSwiper/productSwiper";
import { ToastContainer, toast } from 'react-toastify';

export const ProductScreen = () => {
    const {id} = useParams()
    const [product,setProduct]= useState();
    const [imgDisplay, setImgDisplay] = useState();
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    const [price,setPrice] = useState({mainPrice : 0, quantity_available : 0,quantity_reservation : 0, options : [], personalization : []})
    const [selectedProduct, setSelectedProduct] = useState({product : '', options : [], personalization : []})

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
                            // setOptions(data.data.option);
                            // setPersonalization(data.data.personalization);
                        setProduct(data.data);
                        console.log(data.data.product)
                        const optionsNumber = []
                        data.data.option.forEach((item)=>{
                            optionsNumber.push(item)
                        })
                        selectedProduct.product = data.data.product
                        setPrice({mainPrice : data.data.product.price, option : data.data.option})
                    }
                })
            }
        }
        fetch()
    },[]);

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
        setPrice({finalPrice : newPrice})
    },[selectedProduct]);

    const handleOptionChange = (event,idOption) => {
        if(event.target.value == "none"){
            console.log(idOption)
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
        if(pvalue === ""){
            console.log(Inputpersonalization.Id_personalization)
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

    const selectedChange = () => {

    }

    const handleSubmit = (e)=>{
        try {
            e.preventDefault()
            const form = e.target
            const elements = e.target.elements
            const formData = new FormData(form);

            const quantitySelected = formData.get("quandtitySeleted");  
            const quantityReserved = formData.get("quandtityReservé");

            console.log(quantitySelected)
            if(quantityReserved >0 && quantitySelected>0) {
                toast.error('vous ne pouvez pas reserver et selectionner un article en même temps', {autoclose : 2000})
            } else {
                const fetch = async ()=> {                   
                    const response = await updateCart(product.product.Id_product,quantitySelected,quantityReserved,price)
                    if(response){
                        console.log(response)
                        response.json()
                        .then((data)=>{
                        console.log(data)
                            if(data.message === 'product updated'){
                                
                                
                            }
                        })
                    }
                }
                fetch() 
            }
            
            
        } catch (error) {
            
        }
    }

    console.log(selectedProduct)

    return (
        <>
            <ToastContainer/>
            {product?.product && 
            <div className='productContainer'>
                <ProductSwiper props={imgDisplay}/>
                { product.option &&   
                <div className="productInfoContainer">
                <h2>
                    {price.finalPrice || price.mainPrice}€
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
                            <select className='productOption' name='quandtitySeleted'>
                                <option value="none">choisir une quantité</option>
                                {
                                    Array.from({ length: product?.product.quantity_available + 1 }).map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))
                                }
                            </select>
                        </> 
                        : 
                        <>
                            Quantité réservable : {product?.product.quantity_reservation}    
                            <select className='productOption' name='quandtityReservé'>
                                <option value="none">choisir une quantité</option>
                                {
                                    Array.from({ length: product?.product.quantity_reservation + 1 }).map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))
                                }
                            </select>
                        </>
                    }
                    <button type='submit'>Ajouter au panier</button>
                </form>
                    {product?.option.map((item,index)=>{
                        console.log(item)
                        if(item.optionActive == true){                       
                            return(
                                <div key={index}>
                                <div> {item.name} </div>
                                    <select className='productOption' onChange={(e)=>handleOptionChange(e,item.Id_option)}>
                                        <option value="none">Selectionner une option</option>
                                        {item.subOptions.map((subItem,subIndex)=>{
                                                if(subItem.quantity_available > 0){
                                                return (
                                                    <option key={subIndex} value={JSON.stringify(subItem)} > {subItem.detail + ' (+ ' + subItem.price + '€) displonible'}</option>
                                                )
                                                } 
                                                if(subItem.quantity_reservation > 0){
                                                    return (
                                                        <option key={subIndex} value={JSON.stringify(subItem)} > {subItem.detail + ' (+ ' + subItem.price + '€) à réserver'}</option>
                                                    ) 
                                                } else {
                                                    return (
                                                        <option key={subIndex} disabled> {subItem.detail + ' (+ ' + subItem.price + '€) Non disponible'}</option>
                                                    ) 
                                                }
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
                                <textarea className="ProductpersonalizationInput" onChange={(e)=>handlePersonalizationChange(e,item)}></textarea>
                            </div>
                            )
                        }
                    })}
                </div>                 
            }
            </div>
            }
        </>
    )
}