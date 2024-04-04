import { useState } from 'react';
import './uploadDropZone.css'
import { useRef } from 'react';

export const UploadDropZone = ()=> {
    const [isDraggingOver,setIsDraggingOver]= useState(false)
    const [file,setFile] = useState()
    const fileInputRef = useRef(null);
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        const file = files[0]
        const MaxFilesize = 5 * 1024 * 1024
        
        const imageUrl = URL.createObjectURL(file);
        setFile(imageUrl);
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
        console.log(file)
        const imageUrl = URL.createObjectURL(file);
        setFile(imageUrl);
    };

    return(
        <div>
        <div id='dropZoneContainer'>
        <div className="drop-zone" id="drop-zone"
            onDragLeave={handleDragLeave} 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()} 
        >
        Drop le fichier ou clicker
        <input style={{ display: 'none' }} type="file" onChange={handleFileInput}
            ref={(ref) => fileInputRef.current = ref}/>
        </div>
        <div id="ImageDropped"><img src={file}/></div>
        </div>
        </div>
    )
}