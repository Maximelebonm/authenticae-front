import './ProducteurProfileScreen.css'

export const ProducteurProfileScreen = (props) => {
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