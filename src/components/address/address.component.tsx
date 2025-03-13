import './address.component.css';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { InputFloatLabel } from '../uiElements/inputFloatLabel/inputFloatLabel';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface AddressProps {
    Id_address: number;
    country: string;
    city: string;
    additional?: string;
    cityCode: string;
    street: string;
    number: string;
}

interface AddressComponentProps {
    props: AddressProps;
    onChange: (e: ChangeEvent<HTMLInputElement>, field: string, Id_address: number) => void;
    submitAdress: (e: FormEvent<HTMLFormElement>, Id_address: number) => void;
    deleteAddress: (e: React.MouseEvent<HTMLButtonElement>, Id_address: number) => void;
}

interface TextError {
    textErrorCountry?: string;
    textErrorCity?: string;
    textErrorAdditional?: string;
    textErrorCityCode?: string;
    textErrorStreet?: string;
    textErrorNumber?: string;
}

export const AddressComponent = ({ props, onChange, submitAdress, deleteAddress }: AddressComponentProps) => {
    const { Id_address, country, city, additional, cityCode, street, number } = props;

    const [textError, setTextError] = useState<TextError>({});

    const handleCountry = (e: ChangeEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z\s]*$/;
        const spanElement = e.target.parentElement?.parentElement?.querySelector('span');
        if (!regex.test(e.target.value)) {
            e.target.classList.add('inputError');
            spanElement?.classList.add('spanError');
            setTextError({ textErrorCountry: 'Ce champ ne peut contenir que des lettres et des espaces' });
        } else if (e.target.value === '') {
            e.target.classList.add('inputError');
            spanElement?.classList.add('spanError');
            setTextError({ textErrorCountry: 'Ce champ ne peut pas être vide' });
        }
        else if (e.target.value.length > 50) {
            e.target.classList.add('inputError');
            spanElement?.classList.add('spanError');
            setTextError({ textErrorCountry: 'Ce champ ne peut pas contenir plus de 50 caractères' });
        } else {
            setTextError({});
            e.target.classList.remove('inputError');
            spanElement?.classList.remove('spanError');
        }
    }

    const verifyNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const regex = /^\d{5}$/;
        const spanElement = e.target.parentElement?.parentElement?.querySelector('span');
        if (!regex.test(e.target.value)) {
            e.target.classList.add('inputError');
            spanElement?.classList.add('spanError');
            setTextError({ textErrorCityCode: 'Le code postal doit être composé de 5 chiffres' });
        } else if (e.target.value === '') {
            e.target.classList.add('inputError');
            spanElement?.classList.add('spanError');
            setTextError({ textErrorCityCode: 'Ce champ ne peut pas être vide' });
        } else {
            setTextError({});
            e.target.classList.remove('inputError');
            spanElement?.classList.remove('spanError');
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>, Id_address: number) => {
        e.preventDefault();
        if (Object.values(textError).every(error => error === '')) {
            return submitAdress(e, Id_address);
        } else {
            return toast.error('Veuillez corriger les erreurs avant de valider l\'adresse');
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={(e) => handleSubmit(e, Id_address)} >
                <div className='adressComponentContainer'>
                    <div className='adressComponentSubContainer'>
                        <div className='adresscountry'>
                            <InputFloatLabel onchange={(e) => { onChange(e, 'country', Id_address); handleCountry(e) }} placeholder='Ex : France' type='text' labelName='Pays' inputName={'country'} inputValue={country} required='yes' minLength={0} maxLength={50} />
                            <span>{textError.textErrorCountry} </span>
                        </div>
                        <div className='adressCode'>
                            <InputFloatLabel onchange={(e) => { onChange(e, 'cityCode', Id_address); verifyNumber(e) }} placeholder='Ex : 59000' type='number' labelName='Code Postal' inputName={'cityCode'} inputValue={cityCode} required='yes' min={0} max={99999} pattern='^\S+$' />
                            <span>{textError.textErrorCityCode} </span>
                        </div>
                    </div>
                    <InputFloatLabel onchange={(e) => onChange(e, 'city', Id_address)} placeholder='Ex : Lille' type='text' labelName='Ville' inputName={'city'} inputValue={city} required='yes' minLength={0} maxLength={255} />
                    <span>{textError.textErrorCity} </span>
                    <div className='adressComponentSubContainer'>
                        <div className='adressNumber'>
                            <InputFloatLabel onchange={(e) => onChange(e, 'number', Id_address)} placeholder='Ex : 2' type='number' labelName='N°' inputName={'number'} inputValue={number} required='yes' minLength={0} />
                            <span>{textError.textErrorNumber} </span>
                        </div>
                        <div className='adressStreet'>
                            <InputFloatLabel onchange={(e) => onChange(e, 'street', Id_address)} placeholder='Ex : rue de la grange' type='text' labelName='Rue' inputName={'street'} inputValue={street} required='yes' minLength={0} maxLength={255} />
                            <span>{textError.textErrorStreet} </span>
                        </div>
                    </div>
                    <InputFloatLabel onchange={(e) => onChange(e, 'additionnal', Id_address)} placeholder='Ex : Batiment porte 34' type='text' labelName='Informations complétmentaire' inputName={'additional'} inputValue={additional} minLength={0} maxLength={255} />
                    <span>{textError.textErrorAdditional} </span>
                    <div>
                        <button type='button' onClick={(e) => deleteAddress(e, Id_address)}><Trash2 /></button>
                        <button type='submit'>Valider l&apos;adresse</button>
                    </div>
                </div>
            </form>
        </>
    )
}