import './homeScreen.css';
import { HomeProductCards } from "../../components/cards/homeProductCard/homeProductCard"
import { GoogleLogin } from '../../components/login/google/googleLogin';

export const HomeScreen = () => {
    console.log(import.meta.env)
    return (
        <div id='homeScreenContainer'>
        <section>

        </section>
        <section id="homeScreenProducts">
            <HomeProductCards/>
            <HomeProductCards/>
            <HomeProductCards/>
            <HomeProductCards/>
            <HomeProductCards/>
            <HomeProductCards/>
        </section>
        </div>
    )
}