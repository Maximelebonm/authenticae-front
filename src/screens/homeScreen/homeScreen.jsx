import './homeScreen.css'

import { HomeProductCards } from "../../components/cards/homeProductCard/homeProductCard"
export const HomeScreen = () => {

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