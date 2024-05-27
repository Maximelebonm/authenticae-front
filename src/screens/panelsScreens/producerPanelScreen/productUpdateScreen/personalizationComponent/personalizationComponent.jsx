import "./personalizationComponent.css"

export const PersonalizationComponent = (props) => {
    const {nameObject} = props
    const {name,detail,price, Id_personalization} = props.props

    const handleChange = (e,Id_personalization,obj) => {
        props.handlepersonalizationChange(e,Id_personalization,obj)
    }

    const delpersonalization = ()=>{
        props.deletePersonalization(Id_personalization)
    }

    return (
        <div className='optionContainer'>
            <div>
                <label>Nom de la personalisation :  </label>
                <input name={nameObject} type='text' value={name} onChange={(e)=>handleChange(e.target.value,Id_personalization,'name')} className='optionInput' required/>
            </div>
            <div>
                <label>detail de la personalisation :  </label>
                <input name={nameObject} type='text' value={detail} onChange={(e)=>handleChange(e.target.value,Id_personalization,'detail')} className='optionInput' required/>
            </div>
            <div>
                <label>Prix :  </label>
                <input name={nameObject} type='number' value={price} onChange={(e)=>handleChange(e.target.value,Id_personalization,'price')} className='optionInput' required/>
            </div>
            <div>
                <button type="button" onClick={delpersonalization}> supprimer la personalisation</button>
            </div>
        </div>
    )
}