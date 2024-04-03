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

export const RoutesContainer = () =>{

    return (
        <Routes>
        
            <Route path={URL_FRONT.PRODUCER_PANEL} element={ 
                <PrivateRoutes role={'producer'}>
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
            <Route path='/login' element={
                    <LoginScreen/>
            }/>   
            <Route path='/logout' element={
                    <LogoutScreen/>
            }/>   

            
        </Routes>
    )
}
