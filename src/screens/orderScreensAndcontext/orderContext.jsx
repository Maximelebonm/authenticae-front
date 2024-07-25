import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState({
    cart : {},
    user : {},
    address_delivery : {},
    address_billing : {},
    userChoicePaymentMethod: {}
  });

  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};