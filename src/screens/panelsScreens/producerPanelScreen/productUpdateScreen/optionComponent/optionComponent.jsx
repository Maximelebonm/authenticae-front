import "./optionComponent.css";
import { Trash2,Archive,ChevronLeft,ChevronRight  } from 'lucide-react';

export const OptionComponent = (props) => {
    const {nameObject} = props
    const {name, Id_product_option,optionActive} = props.props
    // console.log(optionActive)
    const subOption = props.props.subOptions

    const addSubOptionform = ()=> {
        props.addSubOption(props.props)
    }

    const handleOptionChange = (e,obj) => {
        props.handleOptionChange(e,Id_product_option,obj)
    }

    const handleSubOptionChange = (e, Id_subOption,obj) => {
        props.handlesubOptionChange(e,Id_subOption,obj)
    };

    const delSubOption = (Id_subOption) => {
        props.delSubOption(props.props,Id_subOption)
    };

    const delOption = ()=>{
        props.deleteOption(Id_product_option)
    }

    return (
        <div className='optionContainer'>
                <div className='optionTopContainer'>
                    <div className='optionInputContainer'>
                        <label>Nom de l'option :  </label>
                        <input name={nameObject} type='text' value={name} onChange={(e)=>handleOptionChange(e.target.value,'name')} className='optionInput' required/>
                    </div>
                    <div  id="optionInputCheckBox" >
                        <label> option disponible : </label>
                        <input type='checkbox' name={`${nameObject}[available]`} checked={optionActive} onChange={(e)=>handleOptionChange(e.target.checked,'available')}/>
                    </div>
                </div>
                <div>
                <div className='subOptionsContainer'>
                {subOption.map((item, index) => (
                    <div key={index}>
                        <div className="subOptioncontainer">
                        <div className="subOptionInputcontainer">
                            <label>Nom de la sous-option</label>
                            <input
                               required
                                name={`${nameObject}[subOption${index}][name]`}
                                value={item?.detail}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'detail')}
                            />
                        </div>
                        <div className="subOptionPricecontainer">
                            <label>Prix</label>
                            <input
                                required
                                name={`${nameObject}[subOption${index}][price]`}
                                type='number'
                                value={item?.price}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'price')}
                            />
                        </div>
                        
                        {/* <div className="subOptionQuantitycontainer">
                            <label>Quantité Disponible</label>
                            <input
                                required
                                name={`${nameObject}[subOption${index}][quantity]`}
                                type='number'
                                value={item?.quantity_available}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'quantity_available')}
                            />
                        </div> */}
                        {/* <div className="subOptionQuantitycontainer">
                            <label>Quantité Reservable</label>
                            <input
                                required
                                disabled
                                name={`${nameObject}[subOption${index}][quantity]`}
                                type='number'
                                value={item?.quantity_reservation}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'quantity_reservation')}
                            />
                        </div> */}
                        <button className='optionButton' type="button" onClick={() => delSubOption(item.Id_subOption)}> <Trash2/> </button>
                        </div>
                    </div>
                ))}
                </div>
                <div>
                <button className='optionButton' type="button" onClick={addSubOptionform}>+ ajouter une sous option</button>
                </div>
                <button className='optionButton' type="button" onClick={delOption}> <Trash2/> </button>
                </div>
        </div>
    )
}