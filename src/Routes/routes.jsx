import {Route, Routes} from 'react-router-dom';
import { PrivateRoutes } from './privates_routes';
import { URL_FRONT } from '../constants/urlFrontEnd';

import { HomeScreen } from '../screens/homeScreen/homeScreen';
import { ProducerPanelScreen } from '../screens/panelsScreens/producerPanelScreen/producerMainPanel/producerPanelScreen.jsx';
import { ProducerListScreen } from '../screens/ProducerListScreen/ProducerListScreen';
import { ProducerShopScreen } from '../screens/profilesScreen/producteurShopScreen/ProducerShopScreen';
import { ProfilScreen } from '../screens/profilesScreen/profilScreen/profilScreen';
import { LoginScreen } from '../screens/authScreens/loginScreen/loginScreen';
import { LogoutScreen } from '../screens/authScreens/logoutScreen/logoutScreen';
import { RegisterScreen } from '../screens/authScreens/registerScreen/registerScreen';
import { AdminPanelScreen } from '../screens/panelsScreens/adminPanelScreen/adminPanelScreen';
import { AdminUserPanelScreen } from '../screens/panelsScreens/adminPanelScreen/adminUserPanel/adminUserPanelScreen';
import { ProducerPanelProductScreen } from '../screens/panelsScreens/producerPanelScreen/productUpdateScreen/producerPanelproductScreen.jsx'; 
import { ProducelPanelProductUpdate } from '../screens/panelsScreens/producerPanelScreen/productUpdateScreen/producerPanelProductUpdate.jsx';
import { ProductScreen } from '../screens/productScreen/productScreen';
import { ValidationScreen } from '../screens/authScreens/valdationScreen/validationScreen';
import { CartScreen } from '../screens/orderScreensAndcontext/cartScreen/cartScreen.jsx';
import { PayementScreen } from '../screens/orderScreensAndcontext/payementScreen/payementscreen.jsx';
import { OrderProvider } from '../screens/orderScreensAndcontext/orderContext.jsx';
import { CartValidationScreen } from '../screens/orderScreensAndcontext/CartValidationScreen/cartValidationscreen.jsx';
import { OrderScreen } from '../screens/panelsScreens/producerPanelScreen/commandsScreen/OrderScreen.jsx';
import { SuccessOrderScreen } from '../screens/orderScreensAndcontext/successOrderscreen/successOrderScreen.jsx';
import { CommandsScreen } from '../screens/profilesScreen/comandsScreen/commandsScreen.jsx';
import { ReturnOrderScreen } from '../screens/panelsScreens/producerPanelScreen/returnScreen/returnScreen.jsx';
import { ConditionsScreen } from '../screens/rulesScreens/conditionsScreen/conditionsScreen.jsx';
import { ConfScreen } from '../screens/rulesScreens/confScreen/confScreen.jsx';
import { CookieScreen } from '../screens/rulesScreens/cookiesScreen/cookieScreen.jsx';
import { PasswordScreen } from '../screens/authScreens/passwordScreen/passwordScreen.jsx';
import { AdminTvaPanel } from '../screens/panelsScreens/adminPanelScreen/adminTvaPanel/adminTvaPanel.jsx';
import { AdminUserListScreen } from '../screens/panelsScreens/adminPanelScreen/adminUserList/adminUserList.jsx';
import { AdminCategory } from '../screens/panelsScreens/adminPanelScreen/adminCategory/adminCategory.jsx';
import { AdminMaterial } from '../screens/panelsScreens/adminPanelScreen/adminMaterial/adminMaterial.jsx';
// import { DeliveryScreen } from '../screens/orderScreensAndcontext/deliveryScreen/deliveryScreen.jsx';
import { CheckEmailScreen } from '../screens/authScreens/checkEmailScreen/CheckEmailScreen.jsx';
import { DeliveryScreen } from '../screens/orderScreensAndcontext/deliveryScreen/deliveryScreen.jsx';

export const RoutesContainer = () =>{
    return (
        <>
        <OrderProvider>
        <Routes>
            <Route index element={<HomeScreen/>} />
            {/* <Route path='*' element={<HomeScreen/>}/>
            <Route path="/" element={<HomeScreen/>}/> */}
            <Route path='/producer' element={<ProducerListScreen/>}/>
            <Route path='/profil' element={<PrivateRoutes role={['client']}><ProfilScreen/></PrivateRoutes>}/>
            <Route path='/myorder' element={<PrivateRoutes role={['client']}><CommandsScreen/></PrivateRoutes>}/>

            <Route path='/paneladmin' element={<PrivateRoutes role={['administrator']}><AdminPanelScreen/></PrivateRoutes>}/>      
            <Route path='/paneladmin/user/:id' element={<PrivateRoutes role={['administrator']}><AdminUserPanelScreen/></PrivateRoutes>}/> 
            <Route path='/paneladmin/tva' element={<PrivateRoutes role={['administrator']}><AdminTvaPanel/></PrivateRoutes>}/> 
            <Route path='/paneladmin/userList' element={<PrivateRoutes role={['administrator']}><AdminUserListScreen/></PrivateRoutes>}/> 
            <Route path='/paneladmin/category' element={<PrivateRoutes role={['administrator']}><AdminCategory/></PrivateRoutes>}/>
            <Route path='/paneladmin/materials' element={<PrivateRoutes role={['administrator']}><AdminMaterial/></PrivateRoutes>}/>

            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/password/:token' element={<PasswordScreen/>}/>
            <Route path='/cookies' element={<CookieScreen/>}/>
            <Route path='/conditions' element={ <ConditionsScreen/>}/>
            <Route path='/confidentialite' element={<ConfScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/login' element={<LoginScreen/>}/>   
            <Route path='/logout' element={<LogoutScreen/>}/>
            <Route path='/shop/:id' element={<ProducerShopScreen/>}/>   
            <Route path={URL_FRONT.PRODUCER_PANEL} element={ <PrivateRoutes role={['producer']}><ProducerPanelScreen/></PrivateRoutes>}/>
            <Route path='/validation/:token' element={<ValidationScreen/>} />
            <Route path='/myshop/product/createProduct' element={<PrivateRoutes role={['producer']}><ProducerPanelProductScreen/></PrivateRoutes>}/>   
            <Route path='/order' element={<PrivateRoutes role={['producer']}><OrderScreen/></PrivateRoutes>}/>   
            <Route path='/myshop/product/:id' element={<PrivateRoutes role={['producer']}><ProducelPanelProductUpdate/></PrivateRoutes>}/>      
            <Route path='/return' element={<PrivateRoutes role={['producer']}><ReturnOrderScreen/></PrivateRoutes>}/> 

            <Route path='/checkEmail' element={<CheckEmailScreen/>}/>          
            <Route path='/cart' element={<PrivateRoutes role={['client']}><CartScreen/></PrivateRoutes>}/>
            <Route path='/cartvalidation' element={<PrivateRoutes role={['client']}><CartValidationScreen/></PrivateRoutes>}/>  
            <Route path='/paiement' element={<PrivateRoutes role={['client']}><PayementScreen/></PrivateRoutes>}/>  
            <Route path='/livraison' element={<PrivateRoutes role={['client']}><DeliveryScreen/></PrivateRoutes>}/>
            <Route path='/paiement/success' element={<PrivateRoutes role={['client']}><SuccessOrderScreen/></PrivateRoutes>}/>
            </Routes>
        </OrderProvider>
        </>
    )
}
