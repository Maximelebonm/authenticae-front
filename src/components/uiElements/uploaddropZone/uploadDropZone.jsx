import { useState } from 'react';
import './uploadDropZone.css'
import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { toastError } from '../../../helpers/toast.helper';


export const UploadDropZone = ({setFile, name, loadUrlImg,imageSet,multiple,maxImages})=> {
    const [isDraggingOver,setIsDraggingOver]= useState(false)
    const fileInputRef = useRef(null);
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        const file = files[0]
        const imgUrl = URL.createObjectURL(file)
        loadImg(imgUrl)
        setFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        const file = files[0]
        const imgUrl = URL.createObjectURL(file)
        loadUrlImg(imgUrl)
        setFile(file)
    };

    const handleProductFilesInput = (e)=>{
        const files = e.target.files;
        console.log(files)
        if(files.length <= maxImages){
            const ImgUrltab = [];
            for(let i=0; i< files.length; i++){
                const file = files[i]
                ImgUrltab.push(URL.createObjectURL(file))
            }
            loadUrlImg(ImgUrltab)
            setFile(files)
        } else {
            toastError(`Maximum ${maxImages} images téléchargeable `)
        }
    }
    
    return(
        <div id='dropZoneContainer'>
            <div className="drop-zone" id="drop-zone" name={name}
                onDragLeave={handleDragLeave} 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} 
            >
            { multiple=='ok' ? 
                <>
                    { 
                    imageSet != null ? 
                    imageSet.map((item,index)=>{
                        return <img src={item} key={index} /> 
                    }) 
                    : <Upload id='dropZoneUploadIcon'/> }
                    <input style={{ display: 'none' }} type="file" onChange={handleProductFilesInput}
                        ref={(ref) => fileInputRef.current = ref} name={name} multiple />
                </>
                    :
                <>  
                    { imageSet != null ? <img src={imageSet}/> : <Upload id='dropZoneUploadIcon'/> }
                    <input style={{ display: 'none' }} type="file" onChange={handleFileInput}
                    ref={(ref) => fileInputRef.current = ref} name={name} />    
                </>
            }
            </div>
        </div>
    )
}