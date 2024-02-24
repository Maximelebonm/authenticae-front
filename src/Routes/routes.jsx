import {Route, Routes} from 'react-router-dom';
import { PrivateRoutes } from './privatesRoutes';
import { URL_FRONT } from '../constants/urlFrontEnd';

import { HomeScreen } from '../screens/homeScreen/homeScreen';
import { ProducteurScreen } from '../screens/producteurScreen/producteurScreen';
import { ProducteurProfileScreen } from '../screens/producteurProfileScreen/ProducteurProfileScreen';

export const RoutesContainer = () =>{
    return (
        <Routes>
        
        <Route path={URL_FRONT.PROFILE} element={ <PrivateRoutes role={'logged'}>
                    <ProducteurProfileScreen/>
            </PrivateRoutes>}/>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/producteurs' element={<ProducteurScreen/>}/>
        </Routes>
    )
}
