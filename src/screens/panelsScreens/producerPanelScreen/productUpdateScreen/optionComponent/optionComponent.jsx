import { useState } from "react"

export const OptionComponent = (props) => {
    const {name, price} = props

    const [subOption,setSubOption] = useState([])

    const addSubOption = ()=> {
        return (
            <div>
                <label></label>
                <input />
                <label></label>
                <input/>
            </div>
        )
    }

    return (
        <div>
                <label>Nom de l'option</label>
                <input name={name} type='text'/>
                <div>
                <div>
                    {subOption.map((item,index)=> {
                        return (
                            <div key={index} >
                                <label>name {index}</label>
                                <input name={name + "[subOption" + index + "]name"} />
                                <label>Prix de l'option</label>
                                <input name={name + "[subOption" + index + "]price"} type='number'/>
                            </div>
                        )
                    })}
                </div>
                </div>
                <button type="button" onClick={()=>setSubOption([...subOption, addSubOption()])}>+</button>
        </div>
    )
}