import "./personalizationComponent.css";
import { Trash2,Archive,ChevronLeft,ChevronRight  } from 'lucide-react';

export const PersonalizationComponent = (props) => {
    const {nameObject} = props
    const {name,detail,price, Id_personalization,personalizationActive} = props.props

    console.log(Id_personalization)

    const handleChange = (e,obj) => {
        console.log(obj)
        props.handlepersonalizationChange(e,Id_personalization,obj)
    }

    const delpersonalization = ()=>{
        props.deletePersonalization(Id_personalization)
    }

    return (
        <div className='optionContainer'>
        <div className='optionTopContainer'>
            <div>
                <label>Nom de la personalisation :  </label>
                <input name={nameObject} type='text' value={name} onChange={(e)=>handleChange(e.target.value,'name')} className='optionInput' required/>
            </div>
            <div  id="optionInputCheckBox" >
                <label> personalisation disponible : </label>
                <input type='checkbox' name={`${nameObject}[available]`} checked={personalizationActive} onChange={(e)=>handleChange(e.target.checked,'available')}/>
            </div>
        </div>
        <div>
                <label>detail de la personalisation :  </label>
                <input name={nameObject} type='text' value={detail} onChange={(e)=>handleChange(e.target.value,'detail')} className='optionInput' required/>
        </div>
            <div>
                <label>Prix :  </label>
                <input name={nameObject} type='number' value={price} onChange={(e)=>handleChange(e.target.value,'price')} className='optionInput' required/>
            </div>
            <div>
                <button type="button" onClick={delpersonalization}> supprimer la personalisation</button>
            </div>
        </div>
    )
}