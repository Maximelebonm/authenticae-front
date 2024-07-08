import './address.component.css';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { InputFloatLabel } from '../uiElements/inputFloatLabel/inputFloatLabel';


export const AddressComponent = ({props, onChange, submitAdress}) => {
    const {Id_address, country,city, additional,cityCode, street , number} = props;
    const Base_URL = import.meta.env.VITE_BASE_URL_BACK
    
    return (
        <form onSubmit={submitAdress}>
            <div className='adressComponentContainer'>
                <div className='adressComponentSubContainer'>
                <div className='adresscountry'>
                    <InputFloatLabel onchange={(e)=>onChange(e,'country',Id_address)} placeholder='Ex : France' type='text' labelName='Pays' inputName={'country'} inputValue={country}  required='yes' minLength={0} maxLength={50}/>        
                </div>
                <div className='adressCode'>
                    <InputFloatLabel onchange={(e)=>onChange(e,'cityCode',Id_address)} placeholder='Ex : 59000' type='number' labelName='Code Postal' inputName={'cityCode'} inputValue={cityCode} required='yes' minLength={0} pattern='^\S+$'/>

                </div>
                </div>
                <InputFloatLabel onchange={(e)=>onChange(e,'city',Id_address)} placeholder='Ex : Lille' type='text' labelName='Ville' inputName={'city'} inputValue={city} required='yes' minLength={0} maxLength={255}/>
                <div className='adressComponentSubContainer'>
                    <div className='adressNumber'>
                        <InputFloatLabel onchange={(e)=>onChange(e,'number',Id_address)} placeholder='Ex : 2' type='number' labelName='N°' inputName={'number'} inputValue={number} required='yes' minLength={0}/>
                    </div>
                    <div className='adressStreet'> 
                        <InputFloatLabel onchange={(e)=>onChange(e,'street',Id_address)} placeholder='Ex : rue de la grange' type='text' labelName='Rue' inputName={'street'} inputValue={street} required='yes' minLength={0} maxLength={255}/>
                    </div>
                </div>
                <InputFloatLabel onchange={(e)=>onChange(e,'additionnal',Id_address)} placeholder='Ex : Batiment porte 34' type='text' labelName='Informations complétmentaire' inputName={'additional'} inputValue={additional} minLength={0} maxLength={255}/>
            </div>
            <button type='submit'>Valider l'adresse</button>
            </form>
    )
}