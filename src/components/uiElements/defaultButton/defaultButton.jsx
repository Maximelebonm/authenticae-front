import './defaultButton.css'

export const DefaultButton = (props) => {
    const {id,value,type,text} = props
    return (
        <button type={type} value={value} className="defaultButton" id={id}>
            {text}
        </button>
    )
}