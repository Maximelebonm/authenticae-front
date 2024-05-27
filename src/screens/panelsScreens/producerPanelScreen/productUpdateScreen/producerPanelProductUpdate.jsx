import { useEffect } from "react"
import { deleteOption, deletePersonalizationApi, deleteProduct, deleteSubOption, getProduct, getProductAndOption, updatePicturesProduct, updateProduct } from '../../../../api/backEnd/producer/product.backend'
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
import { PersonalizationComponent } from "./personalizationComponent/personalizationComponent";



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
    const [personlization,setPersonalization] = useState([])

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
                            setPersonalization(data.data.personalization)
                        }
                        else{
                            console.log('else')
                            setImgDisplay(data.data.pictures)
                            setProduct(data.data.product);
                            setOptions(data.data.option);
                            setPersonalization(data.data.personalization);
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
            item.subOptions.forEach((subItem)=>{
                if(subItem.Id_subOption == idsubOption){
                    switch(obj){
                    case 'detail' : subItem.detail = e;
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
            const productQuantityAvailable = formData.get("productQuantityAvailable");
            const productQuantityReservation = formData.get("productQuantityReservation");
            const producmaterial = formData.get("productMaterial");
            const formOptionObject = options
            const formPersonalizationObject = personlization

            const fetch = async ()=> {                   
                const response = await updateProduct(id,productName,productDescription,productSpecification, producmaterial,productPrice,productQuantityAvailable,productQuantityReservation,formOptionObject,formPersonalizationObject)
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
            { name: '', Id_option : uuidOption, subOptions : [{ detail: '', price: '', quantity: '', Id_subOption : uuidSuboption}]}
        ])
    }

    const addPersonalization =()=> {
        const uuidPersonalization = uuidv4();
        setPersonalization([
            ...personlization,
            { name: '', detail : '', Id_personalization : uuidPersonalization}
        ])
    }

    const handlepersonalizationChange = (e,Id_personalization,obj)=>{
        const newPersonalization = [...personlization]
        newPersonalization.forEach((item)=> {
            console.log(item.Id_personalization)
            if(item.Id_personalization == Id_personalization){
                switch(obj){
                    case 'detail' : item.detail = e;
                    break;
                    case 'name' : item.name = e;
                    break;
                    case 'price' : item.price = e;
                    break;
                }
            }
        })
        setPersonalization(newPersonalization)
    }


    const addSubOption = (option)=> {
        console.log(option)
        const updatedOption = [...options]
        const uuidSuboption = uuidv4()
        const newSubOption = { detail: '', price: '', quantity: '', Id_subOption : uuidSuboption}
        updatedOption.forEach(opt => {
            console.log(opt)
            if (opt.Id_option === option.Id_option) {
                opt.subOptions = [...opt.subOptions, newSubOption];
            }
        });
        setOptions(updatedOption)
    }

    const delsubOption = async (option, subOptionId) =>{
        const deleteSubOptionApi = await deleteSubOption(option.Id_option,subOptionId)
        if(deleteSubOptionApi){
            const updatedOption = [...options]
            updatedOption.forEach(item => {
                console.log(item)
                if (item.Id_option === option.Id_option) {
                    item.subOptions = item.subOptions.filter(subOpt => subOpt.Id_subOption !== subOptionId);
                }
            });
            toast.success("SubOptionSupprimé avec succès",{autoClose : 2000});
            setOptions(updatedOption)
        }
    }

    const delPresonalization = async(id)=>{
        console.log(id)
        const deletePersReq = await deletePersonalizationApi(id)
        if(deletePersReq){ 
            const updatedPers = personlization.filter(opt => opt.Id_personalization !== id);
            toast.success("Personalization Supprimé avec succès",{autoClose : 2000});
            setPersonalization(updatedPers)
        } 
    }

    const delOption = async (optionId) =>{
        console.log(optionId)
        const deleteOptionReq = await deleteOption(optionId)
        if(deleteOptionReq){ 
            const updatedOption = options.filter(opt => opt.Id_option !== optionId);
            setOptions(updatedOption)
        } 
    }


    const notifySuccessUpload = () => toast.success("Produit mis à jour avec succès",{autoClose : 2000});
    const notifySuccessPicture = () => toast.success("image télécharger avec succès",{autoClose : 2000})
    
    console.log(product)
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
        </div>
        <div className="ProducerPanelDropZoneContainer">
        { 
            imgDisplay !== null && imgDisplay?.map((item,index)=>{
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
                        <select className='panelInput' placeholder='Prix du produit' name='productMaterial' defaultValue={product?.Id_material || "none"} required>
                        <option value="none">None</option>
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
                        <label>*quantité disponible : </label>
                        <input className='panelInput' type='number' placeholder='Quantité disponible' name='productQuantityAvailable' defaultValue={product?.quantity_available} min={0} max={100} required/> 
                    </div>
                    <div className='productUpdateInputContainerNumber'>
                        <label>*quantité réservable : (5 maximum) </label>
                        <input className='panelInput' type='number' placeholder='Quantité reservable' name='productQuantityReservation' defaultValue={product?.quantity_reservation} min={0} max={5} required/> 
                    </div>
                </div>
            </div>
            <div>
                {options.map((item,index)=> {
                    return <OptionComponent 
                                props={item} 
                                key={index} 
                                indexOption={index} 
                                nameObject={"option"+ index} 
                                deleteOption={(optionId)=>delOption(optionId) } 
                                addSubOption={(option)=>addSubOption(option)} 
                                delSubOption={(option,subOptionId)=>delsubOption(option,subOptionId)}
                                handlesubOptionChange={(e,idsubOption,obj)=>{handleSubOptionChange(e,idsubOption,obj)}}
                                handleOptionChange={(e,Idoption)=>{handleOptionChange(e,Idoption)}}
                            />
                })}
            </div>
            <button type="button" onClick={addOption}> Ajouter une option</button>
            <div>
                {personlization.map((item,index)=>{
                    return <PersonalizationComponent key={index}  nameObject={"personalization"+ index} props={item} handlepersonalizationChange={(e,idper,obj)=>handlepersonalizationChange(e,idper,obj)} deletePersonalization={(id)=>delPresonalization(id)} />
                })}
            </div>
            <button type="button" onClick={addPersonalization}> Ajouter une personalisation</button>
           
            <button className='panelInput' type='submit'> valider </button>
        </form>
            <button className='panelInput' onClick={deleteP}> suprimer l'article </button>
        </div>
        </>
        }
        </>
    )
}