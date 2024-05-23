import { useEffect } from "react"
import { deleteProduct, getProduct, getProductAndOption, updatePicturesProduct, updateProduct } from '../../../../api/backEnd/producer/product.backend'
import { useParams } from 'react-router-dom';
import { useState } from "react";
import './productUpdateScreen.css'
import { UploadDropZone } from "../../../../components/uiElements/uploaddropZone/uploadDropZone";
import { getAllmaterials } from "../../../../api/backEnd/producer/material.backend";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { OptionComponent } from "./optionComponent/optionComponent";
import { v4 as uuidv4 } from 'uuid';



export const ProducelPanelProductUpdate = () => {
    const {id} = useParams()
    const [product,setProduct]= useState()
    const [imgUrlProduct,setImgURLProducts] = useState();
    const [imgDisplay, setImgDisplay] = useState();
    const [fileProduct, setFileProduct] = useState();
    const [updatePage, setUpdatePage] = useState(false)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;
    const Base_URL_FRONT = import.meta.env.VITE_BASE_URL_FRONT;
    const [materials,setMaterials] = useState();
    const [options, setOptions] = useState([])

    useEffect(()=> {
        const fetchProduct = async()=>{
            const response = await getProduct(id)
            const materials = await getAllmaterials()
            console.log(response)
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data)
                        if(data.data.product.pictures){
                            setImgDisplay(data.data.product.pictures.split(','))
                            setProduct(data.data.product);
                            setOptions(data.data.option)
                        }
                        else{
                            console.log('else')
                            setImgDisplay(data.data.pictures)
                            setProduct(data.data);
                        }
                    }
                })
            }
        }
        const fetchmaterials = async()=>{
            const response = await getAllmaterials()
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'materials geted'){
                        setMaterials(data.data)
                    }
                })
            }
        }
        fetchProduct()
        fetchmaterials()
    },[updatePage])

    const productImages = async(e)=>{
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const name = formData.get("pictures");
        console.log(name.size)
        if(name.size > 0){
            const response = await updatePicturesProduct(product.Id_product,formData)
            setUpdatePage(!updatePage);
            notifySuccessPicture();
        }
    }

    const handleChange = (e) =>{
        console.log(e)
        const input = e.target;
        const myRegex = /^[a-zA-Z0-9-\s]+$/
        const Error = input.nextElementSibling;
        console.log(input.type)
        if(input.type === "text"){
            if(input.value === ""){
                Error.innerHTML = "ecrire un nom de produit"
            }
            else if(myRegex.test(input.value)=== false){
                Error.innerHTML = "le nom doit comporter des lettre et tirer uniquement"
            }
            else{
                Error.innerHTML =""
            }
        }
        else if(input.type ==="number"){

        }
    }

    const handleOptionChange = (e,Id_option)=>{
        const newOption = [...options]
        newOption.forEach((item)=> {
            console.log(item.Id_option)
            if(item.Id_option == Id_option){
                item.name = e
            }
        })
        setOptions(newOption)
    }

    const handleSubOptionChange = (e,idsubOption,obj) => {
        const newOptionTab = [...options]
        newOptionTab.forEach((item)=>{
            console.log(item.subOption)
            item.subOption.forEach((subItem)=>{
                if(subItem.Id_subOption == idsubOption){
                    switch(obj){
                    case 'name' : subItem.name = e;
                    break;
                    case 'price' : subItem.price = e;
                    break;
                    case 'quantity' : subItem.quantity = e;
                    break;
                }
                }
            })
        })
        setOptions(newOptionTab)
    }

    const handleSubmit = (e)=>{
        try {
            e.preventDefault()
            const form = e.target
            const elements = e.target.elements
            const Error = elements.nextElementSibling
            console.log(elements)

            if(Error !== undefined){
                return toast.error("Verifier le formulaire",{autoClose : 2000})
            }
            
            const formData = new FormData(form);
            const productName = formData.get("productName");
            const productDescription = formData.get("productDescription");
            const productSpecification = formData.get("productSpecification");
            const productPrice = formData.get("productPrice");
            const productQuantity = formData.get("productQuantity");
            const producmaterial = formData.get("productMaterial");
            const formOptionObject = options

            // for (const [key, value] of formData.entries()) {
            //     if(key.startsWith("option")){
            //     const fieldName = key.split("[")[0];
            //     const optionName = value
            //     const subFieldName = key.split("[")[1]?.split("]")[0];
            //     const subOptionName = key.split("]")[1]
            //     console.log(formOptionObject[fieldName])
            //         if (!formOptionObject[fieldName]) {
            //             formOptionObject[fieldName] = {
            //                 name : value
            //             };
            //         }
            //         if (subFieldName) {
            //             if (!formOptionObject[fieldName][subFieldName]) {
            //                 if(subOptionName.includes('name')){
            //                     formOptionObject[fieldName][subFieldName] = {
            //                         name : value
            //                     }
            //                 }
            //                 else {
            //                     console.log(formOptionObject[fieldName][subFieldName])
            //                     formOptionObject[fieldName][subFieldName] = {...formOptionObject[fieldName][subFieldName],price : value};
            //                 }
            //             } else {
            //                 if(subOptionName.includes('name')){
            //                     formOptionObject[fieldName][subFieldName] = {
            //                         ...formOptionObject[fieldName][subFieldName],name: value
            //                     }
            //                 }
            //                 else {
            //                     formOptionObject[fieldName][subFieldName] = {...formOptionObject[fieldName][subFieldName],price : value};
            //                 }
                            
            //             }
            //         }
            //     }   
            // }

            console.log(formOptionObject)

            const fetch = async ()=> {                   
                const response = await updateProduct(id,productName,productDescription,productSpecification, producmaterial,productPrice,productQuantity,formOptionObject)
                if(response){
                    console.log(response)
                    response.json()
                    .then((data)=>{
                    console.log(data)
                        if(data.message === 'product updated'){
                            setUpdatePage(!updatePage);
                            notifySuccessUpload()
                        }
                    })
                }
            }
            fetch() 
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    const deleteP = async () => {
        const response = await deleteProduct(product.Id_product)
        response.json()
        .then((data)=>{
            if(data.message === "product deleted"){
                toast.success("produit supprimé retour au shop",{autoClose : 2000})
                setTimeout(resolve, 2900);
            }
        }).then(
                navigate('/myshop', { replace: true })
        )
    }

    const addOption =()=> {
        const uuidOption = uuidv4();
        const uuidSuboption = uuidv4()
        setOptions([
            ...options,
            { name: '', Id_option : uuidOption, subOption : [{ name: '', price: '', quantity: '', Id_subOption : uuidSuboption}]}
        ])
    }

    const addSubOption = (option)=> {
        console.log(option)
        const updatedOption = [...options]
        const uuidSuboption = uuidv4()
        const newSubOption = { name: '', price: '', quantity: '', Id_subOption : uuidSuboption}
        updatedOption.forEach(opt => {
            console.log(opt)
            if (opt.Id_option === option.Id_option) {
                opt.subOption = [...opt.subOption, newSubOption];
            }
        });
        setOptions(updatedOption)
    }

    const delsubOption = (option, subOptionId) =>{
        const updatedOption = [...options]
        updatedOption.forEach(item => {
            console.log(item)
            if (item.Id_option === option.Id_option) {
                item.subOption = item.subOption.filter(subOpt => subOpt.Id_subOption !== subOptionId);
            }
        });
        setOptions(updatedOption)
    }

    const deleteOption = (optionId) =>{
        console.log(optionId)
        const updatedOption = options.filter(opt => opt.Id_option !== optionId);
        console.log(updatedOption)
        setOptions(updatedOption)
    }


    const notifySuccessUpload = () => toast.success("Produit mis à jour avec succès",{autoClose : 2000});
    const notifySuccessPicture = () => toast.success("image télécharger avec succès",{autoClose : 2000})
    
    console.log(options)
    return (
        <>
        <Link to='/myshop'>
            <button>Retour</button>
        </Link>
          <ToastContainer/>
        {product && 
        <>
        <div>
            <form encType="multipart/form-data" onSubmit={productImages} className="ProducerPanelDropZoneForm">
        <div>
            Changer l'avatar de votre boutique
        </div>
        <div className="ProducerPanelDropZoneContainer">
        { 
            imgDisplay !== null && imgDisplay.map((item,index)=>{
            return <img src={product?.pictures &&  Base_URL+item} key={index}/>
        })    
        } 
            <UploadDropZone setFile={setFileProduct} loadUrlImg={setImgURLProducts} imageSet={imgUrlProduct} name='pictures' multiple='ok'/>
            <button type='submit'> Envoyer les images</button>
        </div>
        </form>
        <form onSubmit={handleSubmit} id='productPanelformContainer'>
            <div id='productUpdateFirst'>
                <div id='productUpdateMainInfo'>
                    <div className='productUpdateInputContainer'>
                        <label>Nom du produit</label>
                        <input className='panelInput' onChange={handleChange} type='text' placeholder='Nom du du produit' defaultValue={product?.name}  name='productName' minLength={1} maxLength={30}/>
                        <span id='productNameError'></span>
                    </div>
                    <div className='productUpdateInputContainer'>
                        <label>Description du produit</label>
                        <input className='panelInput' onChange={handleChange} type='text' placeholder='Description du produit' name='productDescription' defaultValue={product?.description} minLength={1} maxLength={255}/>
                        <span id='productDescriptionError'></span>
                    </div>
                    <div className='productUpdateInputContainer'>
                        <label>Detail du produit</label>
                        <input className='panelInput' onChange={handleChange} type='text' placeholder='Detail du produit' name='productSpecification' defaultValue={product?.detail} minLength={1} maxLength={255}/>
                        <span id='productSpecificationError'></span>
                    </div>
                </div>
                <div id='productUpdateNumberContainer'>
                    <div className='productUpdateInputContainerNumber'>
                        <label>*Matière principale utilisé :</label>
                        <select className='panelInput' placeholder='Prix du produit' name='productMaterial' defaultValue={product?.Id_material} required>
                            {materials?.map((item)=>{
                                return <option  key={item.Id_material} value={item.Id_material} > {item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='productUpdateInputContainerNumber'>
                        <label>*prix en euros :</label>
                        <input className='panelInput' type='number' placeholder='Prix du produit' name='productPrice' defaultValue={product?.price} minLength={0} step=".01" required/>
                    </div>
                    <div className='productUpdateInputContainerNumber'>
                        <label>*quantité : </label>
                        <input className='panelInput' type='number' placeholder='Quantité disponible' name='productQuantity' defaultValue={product?.quantity} min={0} max={100} required/> 
                    </div>
                </div>
            </div>
            <div>
                {options.map((item,index)=> {
                    console.log(item)
                    return <OptionComponent 
                                props={item} 
                                key={index} 
                                indexOption={index} 
                                nameObject={"option"+ index} 
                                deleteOption={(optionId)=>deleteOption(optionId) } 
                                addSubOption={(option)=>addSubOption(option)} 
                                delSubOption={(option,subOptionId)=>delsubOption(option,subOptionId)}
                                handlesubOptionChange={(e,idsubOption,obj)=>{handleSubOptionChange(e,idsubOption,obj)}}
                                handleOptionChange={(e,Idoption)=>{handleOptionChange(e,Idoption)}}
                            />
                })}
            </div>
            <span onClick={addOption}> Ajouter une option</span>
           
            <button className='panelInput' type='submit'> valider </button>
        </form>
            <button className='panelInput' onClick={deleteP}> suprimer l'article </button>
        </div>
        </>
        }
        </>
    )
}