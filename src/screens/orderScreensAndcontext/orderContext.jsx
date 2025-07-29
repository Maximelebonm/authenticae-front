import { createContext, useState,useEffect, useContext } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);


export const OrderProvider = ({ children }) => {
  
  useEffect(() => {
      // Charger depuis le localStorage au montage
      const savedOrder = localStorage.getItem('orderDetails');
      if (savedOrder) {
          setOrderDetails(JSON.parse(savedOrder));
      }
  }, []);
  
  const [orderDetails, setOrderDetails] = useState({
    cart : {},
    user : {},
    address_delivery : {},
    userChoicePaymentMethod: {}
  });

  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};