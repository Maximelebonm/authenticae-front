import { useState } from 'react';
import { ParcelShopSelector } from '@frontboi/mondial-relay/browser';
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types';

export default function MondialRelayMapSelector({ onParcelShopSelect }) {
  const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>()

    const handleParcelShopSelected = (selectedShop) => {
    setParcelShop(selectedShop);
    if (onParcelShopSelect) {
      return onParcelShopSelect(selectedShop);
    }
  };
  

  return (
    <ParcelShopSelector
      weight={3000} // (in grams) optional, filters parcel shops by package weight
      nbResults={7} // optional (default: 7)
      deliveryMode="24R" // optional (default: "24R)
      brandIdAPI="BDTEST" // optional (default: "BDTEST", replace with your Brand Id API value for production usage)
      defaultCountry="FR" // optional (default: "FR")
      defaultPostcode="59000" // optional (default: "59000")
      allowedCountries="FR,BE" // optional (default: "FR")
      onParcelShopSelected={handleParcelShopSelected} // setter function when a parcel shop is clicked
    /> 
  )
}