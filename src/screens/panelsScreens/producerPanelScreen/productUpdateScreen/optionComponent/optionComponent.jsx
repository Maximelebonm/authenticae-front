import "./optionComponent.css"

export const OptionComponent = (props) => {
    const {nameObject} = props
    const {name, Id_option} = props.props
    const subOption = props.props.subOption
    console.log(name)

    const addSubOptionform = ()=> {
        props.addSubOption(props.props)
    }

    const handleOptionChange = (e) => {
        props.handleOptionChange(e,Id_option)
    }

    const handleSubOptionChange = (e, Id_subOption,obj) => {
        props.handlesubOptionChange(e,Id_subOption,obj)
    };

    const delSubOption = (Id_subOption) => {
        props.delSubOption(props.props,Id_subOption)
    };

    const delOption = ()=>{
        props.deleteOption(Id_option)
    }

    return (
        <div className='optionContainer'>
                <label>Nom de l'option :  </label>
                <input name={nameObject} type='text' value={name} onChange={(e)=>handleOptionChange(e.target.value)} className='optionInput' required/>
                <div>
                <div>
                {subOption.map((item, index) => (
                    <div key={index}>
                        <div className="subOptioncontainer">
                        <div className="subOptionInputcontainer">
                            <label>Nom de la sous-option</label>
                            <input
                               required
                                name={`${nameObject}[subOption${index}][name]`}
                                value={item?.name}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'name')}
                            />
                        </div>
                        <div className="subOptionPricecontainer">
                            <label>Prix de l'option</label>
                            <input
                                required
                                name={`${nameObject}[subOption${index}][price]`}
                                type='number'
                                value={item?.price}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'price')}
                            />
                        </div>
                        <div className="subOptionQuantitycontainer">
                            <label>Quantité</label>
                            <input
                                required
                                name={`${nameObject}[subOption${index}][quantity]`}
                                type='number'
                                value={item?.quantity}
                                onChange={(e) => handleSubOptionChange(e.target.value,item.Id_subOption,'quantity')}
                            />
                        </div>
                        <button type="button" onClick={() => delSubOption(item.Id_subOption)}>supprimer</button>
                        </div>
                    </div>
                ))}
                </div>
                <button type="button" onClick={delOption}> supprimer une option</button>
                <button type="button" onClick={addSubOptionform}>+</button>
                </div>
        </div>
    )
}