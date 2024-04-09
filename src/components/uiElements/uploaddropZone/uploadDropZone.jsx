import { useState } from 'react';
import './uploadDropZone.css'
import { useRef } from 'react';
import { Upload } from 'lucide-react';

export const UploadDropZone = ({setFile, name, loadImg,imageSet})=> {
    const [isDraggingOver,setIsDraggingOver]= useState(false)
    const fileInputRef = useRef(null);
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        const file = files[0]
        const MaxFilesize = 5 * 1024 * 1024
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
        loadImg(imgUrl)
        setFile(file);
    };

    return(
        <div id='dropZoneContainer'>
            <div className="drop-zone" id="drop-zone" name={name}
                onDragLeave={handleDragLeave} 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} 
            >
            
            { imageSet != null ? <img src={imageSet}/> : <Upload id='dropZoneUploadIcon'/> }
            <input style={{ display: 'none' }} type="file" onChange={handleFileInput}
                ref={(ref) => fileInputRef.current = ref} name={name}/>
            </div>
        </div>
    )
}