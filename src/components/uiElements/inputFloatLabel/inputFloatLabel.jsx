import './inputFloatLabel.css'

export const InputFloatLabel = (props) => {
    const {type, placeholder,labelName,inputName,min,max,inputValue,pattern, className, required , onchange} = props
    const inputProps = {
        required : required === 'yes',
        type : type,
    }

    if(type ==="text" || type === "email" || type === 'password'){
            return (
                <div className='InputFloatLabelContainer'>
                    <input className={className}  {...inputProps} onChange={onchange} value={inputValue} minLength={min} maxLength={max} placeholder={placeholder} pattern={pattern} name={inputName}/>
                    <label> {labelName} </label>
                </div>
            )
    } 
    else if(type === 'number' || type==='date') {
            return (
                <div className='InputFloatLabelContainer'> 
                        <input className={className} {...inputProps} onChange={onchange} value={inputValue} min={min} max={max} placeholder={placeholder} name={inputName}/>
                        <label> {labelName} </label>
                </div>
            )
    }
}
