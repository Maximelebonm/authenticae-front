import { ProducteurCard } from '../../components/cards/producteurCard/producteurCard'
import './ProducerListScreen.css'

export const ProducerListScreen = () => {
    return (
        <div id='producteursScreenContainer'>
        <section>
            <h1>
                Ici une barre de recherche
            </h1>
        </section>
            <section id="producteursScreenProducts">
                <ProducteurCard profile={'test'}/>
                <ProducteurCard/>
                <ProducteurCard/>
                <ProducteurCard/>
                <ProducteurCard/>
                <ProducteurCard/>
            </section>
        </div>
    )
}