import { useLocation } from 'react-router-dom'
import {StripeComponent} from '../../../components/stripe/stripeContainer'
import { useOrder } from '../orderContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const PayementScreen = ()=> {
    const { orderDetails, setOrderDetails } = useOrder();
    const navigate = useNavigate()
    
    const isEmptyObject = (obj) => {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    useEffect(() => {
        if (isEmptyObject(orderDetails.cart)) {
            console.log('Cart is empty');
            navigate('/cart');
        }
    }, [orderDetails, navigate]);

    const memo = useLocation()
    const {state} = memo
    console.log(orderDetails)

    return (
        <StripeComponent props={orderDetails}/>
    )
}