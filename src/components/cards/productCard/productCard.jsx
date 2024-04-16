import './productCard.css'

export const ProductCard = ({props})=>{

    const {name, description,Id_product} = props
    return (
        

        <div className="productCardContainer">
            <h3>
                {name}
            </h3>
            {description}
        </div>
  
    )
}