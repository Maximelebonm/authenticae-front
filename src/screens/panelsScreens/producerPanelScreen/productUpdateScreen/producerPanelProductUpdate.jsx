import { useEffect } from "react"
import { CheckUpdatePictureApi, archivePictureApi, deleteOption, deletePersonalizationApi, deletePictureApi, deleteProduct, deleteSubOption, downPictureApi, getProduct, getProductAndOption, upPictureApi, updatePicturesProduct, updateProduct } from '../../../../api/backEnd/producer/product.backend'
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
import { Trash2,Archive,ChevronLeft,ChevronRight  } from 'lucide-react';
import { decodeCookies } from "../../../../helpers/decodeToken";

export const ProducelPanelProductUpdate = () => {
    const {id} = useParams()
    const [product,setProduct]= useState()
    const [imgUrlProduct,setImgURLProducts] = useState();
    const [imgDisplay, setImgDisplay] = useState();
    const [fileProduct, setFileProduct] = useState();
    const [updatePage, setUpdatePage] = useState(false)
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK;
    const [onCommand,setOnCommand] = useState()
    const [materials,setMaterials] = useState();
    const [options, setOptions] = useState([])
    const [personlization,setPersonalization] = useState([])
    const navigate = useNavigate()
    const cookie = decodeCookies(document.cookie)  

    useEffect(()=> {
        const fetchProduct = async()=>{
            const response = await getProduct(id)
            console.log(response)
            if(response){
                response.json()
                .then(data=>{
                    if(data.message == 'product geted'){
                        console.log(data.data)
                            setImgDisplay(data.data.images)
                            setProduct(data.data.product);
                            setOptions(data.data.option);
                            setPersonalization(data.data.personalization);
                            setOnCommand(data.data.product.on_command)
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
        console.log(fileProduct)
        console.log(name)
        if(name.size > 0){
            const check = await CheckUpdatePictureApi(product.Id_product,fileProduct.length)
            if(check){
                check.json()
                .then(async(data)=>{
                    if(data.message == "upload autorisé"){
                        const response = await updatePicturesProduct(product.Id_product,formData)
                        if(response){
                            response.json()
                            .then((data)=>{
                                console.log(data.message)
                                if(data.message === "trop d'image")
                                    {
                                        console.log(data)
                                        toast.error("veuillez archiver ou supprimer des images", {autoClose : 2000})
                                    }
                                    else {
                                        setUpdatePage(!updatePage);
                                        notifySuccessPicture();
                                    }
                                })
                            }
                    } else {
                        toast.error("veuillez archiver ou supprimer des images", {autoClose : 2000})
                    }
                })
            }
        } else {
            toast.error('Pas plus de 8 images',{autoClose : 2000})
        }
    }

    const handleChange = (e) =>{
        console.log(e)
        const input = e.target;
   
            const myRegex = /^[a-zA-Z0-9-\sàáâäãåçèéêëìíîïñòóôöõùúûüýÿÀÁÂÄÃÅÇÈÉÊËÌÍÎÏÑÒÓÔÖÕÙÚÛÜÝŸ,."'\-!?]+$/
            const Error = input.nextElementSibling;
            // console.log(input.type)
            if(input.type === "checkbox"){
                console.log("pass")
                const newProduct = product
                newProduct.on_command = e.target.checked

                console.log(newProduct)
                setProduct(newProduct)
            }
            if(input.type === "text"){
                if(input.value === ""){
                    Error.innerHTML = "ecrire un nom de produit"
                }
                else if(myRegex.test(input.value)=== false){
                    console.log(input.value)
                    Error.innerHTML = "le nom doit comporter des lettre et tirer uniquement"
                }
                else{
                    Error.innerHTML =""
                }
            }
            // else if(input.type ==="number"){
    
            // }
    }

    const handleOptionChange = (e,Id_option,obj)=>{
        const newOption = [...options]
        newOption.forEach((item)=> {
            console.log(e)
            if(item.Id_product_option == Id_option){
                switch(obj){
                    case 'name' : item.name = e;
                    break;
                    case 'available' : item.optionActive = e;
                    break;
                }
            
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
                    case 'quantity_available' : subItem.quantity_available = e;
                    break;
                    case 'quantity_reservation' : subItem.quantity_reservation = e;
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
            const producOnCommand = onCommand;
            const productWorkingDays = formData.get("productWorkingDays")
            console.log(producOnCommand)
            const formOptionObject = options
            const formPersonalizationObject = personlization
            if(producmaterial != 'none'){
                const fetch = async ()=> {                   
                    const response = await updateProduct(id,productName,productDescription,productSpecification, producmaterial,productPrice,productQuantityAvailable,productQuantityReservation,formOptionObject,formPersonalizationObject,producOnCommand,productWorkingDays)
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
            }
            else {
                toast.error('Veuillez selectionner une matière utilisé', {autoClose : 2000})
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            { name: '', Id_product_option : uuidOption, optionActive : 0, subOptions : [{ detail: '', price: 0, quantity_available: 0, quantity_reservation: 0, Id_subOption : uuidSuboption}]}
        ])
    }

    const addPersonalization =()=> {
        const uuidPersonalization = uuidv4();
        setPersonalization([
            ...personlization,
            { name: '', detail : '', Id_personalization : uuidPersonalization, personalizationActive : true}
        ])
    }

    const handlepersonalizationChange = (e,Id_personalization,obj)=>{
        const newPersonalization = [...personlization]

        newPersonalization.forEach((item)=> {
            // console.log(item.Id_personalization , ' + + + ', Id_personalization)
            console.log(obj)
            if(item.Id_personalization == Id_personalization){
                switch(obj){
                    case 'detail' : item.detail = e;
                    break;
                    case 'name' : item.name = e;
                    break;
                    case 'price' : item.price = e;
                    break;
                    case 'available' : item.personalizationActive = e;
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
        const newSubOption = { detail: '', price: 0, quantity_available: 0, quantity_reservation: 0, Id_subOption : uuidSuboption}
        updatedOption.forEach(opt => {
            console.log(opt)
            if (opt.Id_product_option === option.Id_product_option) {
                opt.subOptions = [...opt.subOptions, newSubOption];
            }
        });
        setOptions(updatedOption)
    }

    const delsubOption = async (option, subOptionId) =>{
        const deleteSubOptionApi = await deleteSubOption(option.Id_product_option,subOptionId)
        if(deleteSubOptionApi){
            const updatedOption = [...options]
            updatedOption.forEach(item => {
                console.log(item)
                if (item.Id_product_option === option.Id_product_option) {
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
            const updatedOption = options.filter(opt => opt.Id_product_option !== optionId);
            setOptions(updatedOption)
        } 
    }

    const archivePicture = async (id) => {
        const response = await archivePictureApi(id,product.Id_product)
        if(response){
            console.log(response)
            response.json()
            .then((data)=> {
                if(data.message == 'archived'){
                    toast.success('Photo archivé vous pouvez en ajouter de nouvelle', {autoClose : 2000})
                } else {
                    toast.error('une erreur est survenue', {autoClose : 2000})
                }
                setUpdatePage(!updatePage)
            })
        }
    }

    const deletePicture = async (id,name) => {
        const response = await deletePictureApi(id,name,cookie.identifiant,product.Id_product)
        if(response){
            console.log(response)
            response.json()
            .then((data)=> {
                if(data.message == 'image deleted'){
                    toast.success('Photo supprimé vous pouvez en ajouter de nouvelle', {autoClose : 2000})
                } else {
                    toast.error('une erreur est survenue', {autoClose : 2000})
                }
                setUpdatePage(!updatePage)
            })
        }
    }

    const downPicture = async(Id_product_image, order)=>{
   
        const downedPicture = await downPictureApi(Id_product_image,order,product.Id_product)
        if(downedPicture){
            downedPicture.json()
            .then((data)=> {
                console.log(data.message)
                if(data.message == 'image down'){
                    toast.success('photo deplacé', {autoClose : 2000})
                } else {
                    toast.error('une erreur est survenue', {autoClose : 2000})
                }
                setUpdatePage(!updatePage)
            })
        }
    }

    const upPicture = async(Id_product_image, order)=>{
        const upedPicture = await upPictureApi(Id_product_image,order,product.Id_product)
        if(upedPicture){
            upedPicture.json()
            .then((data)=> {
                console.log(data.message)
                if(data.message == 'image up'){
                    toast.success('photo deplacé', {autoClose : 2000})
                } else {
                    toast.error('une erreur est survenue', {autoClose : 2000})
                }
                setUpdatePage(!updatePage)
            })
        }
    }


    const notifySuccessUpload = () => toast.success("Produit mis à jour avec succès",{autoClose : 2000});
    const notifySuccessPicture = () => toast.success("image télécharger avec succès",{autoClose : 2000})
    
    console.log(onCommand)
    
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
        <div className="ProducerPanelDisplayContainer">
            { 
                imgDisplay !== null && imgDisplay?.map((item,index)=>{
                return (
                    <div className='producerPanelDisplayItemContainer' key={index}>
                    {index > 0 && <button className="producerPanelArrowButton" type="button"  onClick={()=>upPicture(item.Id_product_image,item.order)}><ChevronLeft className='displayArrowIconLeft'/></button>}
                    <div className='producerPanelDisplayImageContainer'>
                        <img className="producerPanelDisplayImage" src={Base_URL+item.storage} />
                        <div className='producerPanelDisplayButtonContainer'>
                            <button className="producerPanelDisplayButton" type="button"  onClick={()=>deletePicture(item.Id_product_image,item.name)}><Trash2 className='displayIcon'/></button>
                            <button className="producerPanelDisplayButton" type="button" onClick={()=>archivePicture(item.Id_product_image)} ><Archive className='displayIcon'/></button>
                        </div>
                    </div>
                    {index < 7 && <button className="producerPanelArrowButton" type="button" onClick={()=>downPicture(item.Id_product_image,item.order)} ><ChevronRight className='displayArrowIconroght'/></button>}
                    </div>
                    )
                })    
            } 
        </div>
            <UploadDropZone setFile={(files)=>{setFileProduct(files)}} loadUrlImg={setImgURLProducts} imageSet={imgUrlProduct} name='pictures' multiple='ok' maxImages={8} />
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
                    <div  id="optionInputCheckBox" >
                        <label> produit sur commande : </label>
                        <input type='checkbox' name={`onCommand`} checked={onCommand} onChange={()=> setOnCommand(!onCommand)}/>
                    </div>
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
                        <input className='panelInput' type='number' placeholder='Quantité disponible' name='productQuantityAvailable' defaultValue={product?.quantity_available} min={0} max={50} required/> 
                    </div>
                    <div className='productUpdateInputContainerNumber'>
                        <label>*Jour de travail : </label>
                        <input className='panelInput' type='number' placeholder='Jour de travail' name='productWorkingDays' defaultValue={product?.working_days} min={0} max={90} required/> 
                    </div>
                    {/* <div className='productUpdateInputContainerNumber'>
                        <label>*quantité réservable : (5 maximum) </label>
                        <input className='panelInput' type='number' placeholder='Quantité reservable' name='productQuantityReservation' defaultValue={product?.quantity_reservation} min={0} max={5} required/> 
                    </div> */}
                </div>
            </div>
            <div>
                {options.map((item,index)=> {
                    {/* console.log(item) */}
                    return <OptionComponent 
                                props={item} 
                                key={index} 
                                indexOption={index} 
                                nameObject={"option"+ index} 
                                deleteOption={(optionId)=>delOption(optionId) } 
                                addSubOption={(option)=>addSubOption(option)} 
                                delSubOption={(option,subOptionId)=>delsubOption(option,subOptionId)}
                                handlesubOptionChange={(e,idsubOption,obj)=>{handleSubOptionChange(e,idsubOption,obj)}}
                                handleOptionChange={(e,Idoption,obj)=>{handleOptionChange(e,Idoption,obj)}}
                            />
                })}
            </div>
            <button type="button" onClick={addOption}> Ajouter une option</button>
            <div>
                {personlization.map((item,index)=>{
                    return <PersonalizationComponent 
                                key={index}  
                                nameObject={"personalization"+ index} 
                                props={item} 
                                handlepersonalizationChange={(e,idper,obj)=>handlepersonalizationChange(e,idper,obj)} 
                                deletePersonalization={(id)=>delPresonalization(id)} />
                })}
            </div>
            <button type="button" onClick={addPersonalization}> Ajouter une personalisation</button>
           
            <button className='panelInput' type='submit'> valider </button>
        </form>
            <button className='panelInput' onClick={deleteP}> suprimer l&apos;article </button>
        </div>
        </>
        }
        </>
    )
}