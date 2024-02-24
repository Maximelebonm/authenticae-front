import './homeScreen.css'

import { HomeProductCards } from "../../components/cards/homeProductCard/homeProductCard"
export const HomeScreen = () => {
    let environement;
 console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV === 'producion'){
        environement = 'prod'
    } else {
        environement = 'dev'
    }

    return (
        <div id='homeScreenContainer'>
        <section>
            {environement}
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