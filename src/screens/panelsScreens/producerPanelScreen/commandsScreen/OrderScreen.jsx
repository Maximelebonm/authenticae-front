import { useState,useEffect } from "react"
import { getOrderApi } from "../../../../api/backEnd/buyProcess/order.backend";
import { useAuthContext } from "../../../authContext";
import './OrderScreen.css'

export const OrderScreen =()=> {
    const { userDetails } = useAuthContext();
    const [order, setOrder] = useState()
    const base_URL = import.meta.env.VITE_BASE_URL_BACK

    useEffect(()=>{
        (async ()=>{
            try {
                if(userDetails.user.Id_user){
                    console.log('order : ', userDetails)
                    const response = await getOrderApi(userDetails.user.Id_user)
                    response.json()
                        .then(data=>{
                            if(data.message== 'order finded'){
                                console.log(data)
                                setOrder(data.data)
                            }
                        })
                }
            } catch (error) {
                console.log(error)                
            }
        })()
    },[userDetails])


    return (
    <div>
        {order?.map((item,index)=>{
            console.log(item)
            return (
                <div key={index}>
                {<img src={base_URL + item.product.productImages[0].storage} id='orderImage'/>}
                <div>
                    {item.product.name}
                </div>
                <div>
                   quantité : {item.quantity}
                </div>
                <div>
                   prix payé : {item.price}
                </div>
                {
                    item.orderproductoptions.map((itemOrderProductOption,index)=>{
                    return (
                        <div key={index}>
                            <div>{itemOrderProductOption.productoption.name} : {itemOrderProductOption.subOption.detail}
                            </div>
                        </div>
                        )
                    })
                }
                {
                    item.orderproductpersonalizations.map((itemOrderPersonalization,index)=>{
                        return (
                            <div key={index}>
                                {itemOrderPersonalization.consumer_text}
                            </div>
                        )
                    })
                }

                <div>
                <button>Pris en charge</button>
                <button>Envoyé</button>
                </div>
                </div>
            )
        })}
    </div>
    )
}