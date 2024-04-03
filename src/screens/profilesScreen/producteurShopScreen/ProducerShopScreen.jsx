import './ProducerShopScreen.css'

export const ProducerShopScreen = (props) => {
    const profilget = {
        name : 'John',
        surname : 'Doe',
        article : 'list',
        contact : 'contact'
    }

    return (
        <div>
            <section id="profileGlobalInfo">
                <div>
                    Photo de profil
                </div>
                <div>
                    Nom : Doe
                </div>
                <div>
                    prenom : John
                </div>
            </section>
            <section id="profileArticle">
                {/* liste d'article, barre de recherche, filtre */}
            </section>
            <section>
                {/* contacter le vendeur */}
            </section>
            <section>
                {/* commentaire acheteur */}
            </section>
        </div>
    )
}