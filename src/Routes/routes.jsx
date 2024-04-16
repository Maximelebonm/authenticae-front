import {Route, Routes} from 'react-router-dom';
import { PrivateRoutes } from './privates_routes';
import { URL_FRONT } from '../constants/urlFrontEnd';

import { HomeScreen } from '../screens/homeScreen/homeScreen';
import { ProducerPanelScreen } from '../screens/panelsScreens/producerPanelScreen/producerPanelScreen';
import { ProducerListScreen } from '../screens/ProducerListScreen/ProducerListScreen';
import { ProducerShopScreen } from '../screens/profilesScreen/producteurShopScreen/ProducerShopScreen';
import { ProfilScreen } from '../screens/profilesScreen/profilScreen/profilScreen';
import { useEffect, useState } from 'react';
import { decodeCookies } from '../helpers/decodeToken';
import { LoginScreen } from '../screens/authScreens/loginScreen/loginScreen';
import { LogoutScreen } from '../screens/authScreens/logoutScreen/logoutScreen';
import { RegisterScreen } from '../screens/authScreens/registerScreen/registerScreen';
import { AdminPanelScreen } from '../screens/panelsScreens/adminPanelScreen/adminPanelScreen';
import { AdminUserPanelScreen } from '../screens/panelsScreens/adminPanelScreen/adminUserPanel/adminUserPanelScreen';
import { ProducerPanelProductScreen } from '../screens/panelsScreens/producerPanelScreen/producerPanelproductScreen';
import { ProducelPanelProductUpdate } from '../screens/panelsScreens/producerPanelScreen/producerPanelProductUpdate';
import { ProductScreen } from '../screens/productScreen/productScreen';

export const RoutesContainer = () =>{

    return (
        <Routes>
        
            <Route path={URL_FRONT.PRODUCER_PANEL} element={ 
                <PrivateRoutes role={['producer']}>
                        <ProducerPanelScreen/>
                </PrivateRoutes>}/>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/producer' element={<ProducerListScreen/>}/>
           
            <Route path='/profil' element={
                <PrivateRoutes role={['client']}>
                    <ProfilScreen/>
                </PrivateRoutes>
            }/>
              <Route path='/paneladmin' element={
                <PrivateRoutes role={['administrator']}>
                    <AdminPanelScreen/>
                </PrivateRoutes>
            }/>      
                     <Route path='/panelAdmin/user/:id' element={
                <PrivateRoutes role={['administrator']}>
                    <AdminUserPanelScreen/>
                </PrivateRoutes>
            }/>      
              <Route path='/register' element={
                    <RegisterScreen/>
            }/>
                  <Route path='/product/:id' element={
                    <ProductScreen/>
            }/>
            <Route path='/login' element={
                    <LoginScreen/>
            }/>   
            <Route path='/logout' element={
                    <LogoutScreen/>
            }/>
            <Route path='/shop/:id' element={
                    <ProducerShopScreen/>
            }/>   
                <Route path='/myshop/product/createProduct' element={
                <PrivateRoutes role={['producer']}>
                    <ProducerPanelProductScreen/>
                </PrivateRoutes>
            }/>   
            <Route path='/myshop/product/:id' element={
                <PrivateRoutes role={['producer']}>
                    <ProducelPanelProductUpdate/>
                </PrivateRoutes>
            }/>   


            
        </Routes>
    )
}
