import { useEffect, useState } from "react";
import $ from "jquery";
import { getMrApi } from "../../../api/backEnd/buyProcess/mr.backend";
import { usestate } from "react";

export const DeliveryScreen = () => {
  const [load, setLoad] = useState(false);
  const [dataPicker,setDataPeaker] = useState();

  const fetchMrConfig = async () => {
    const response = await getMrApi()
    console.log(response);
  }
  useEffect(() => {
// Initialiser le widget après le chargement complet de la page
  jQuery(document).ready(function($) {
  // Charge le widget dans la DIV d'id "Zone_Widget" avec les paramètres indiqués
  $("#Zone_Widget").MR_ParcelShopPicker({
    //
    // Paramétrage de la liaison avec la page.
    //
    // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais (ex: input hidden)
    Target: "#Target_Widget",
    // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais pour affichage
    TargetDisplay: "#TargetDisplay_Widget",
    // Selecteur de l'élément dans lequel sont envoysé les coordonnées complètes du point relais
    TargetDisplayInfoPR: "#TargetDisplayInfoPR_Widget",
    //
    // Paramétrage du widget pour obtention des point relais.
    //
    // Le code client Mondial Relay, sur 8 caractères (ajouter des espaces à droite)
    // BDTEST est utilisé pour les tests => un message d'avertissement apparaît
    Brand: "BDTEST  ",
    // Pays utilisé pour la recherche: code ISO 2 lettres.
    Country: "FR",
    // Code postal pour lancer une recherche par défaut
    PostCode: "59000",
    // Mode de livraison (Standard [24R], XL [24L], XXL [24X], Drive [DRI])
    ColLivMod: "24R",
    // Nombre de Point Relais à afficher
    NbResults: "7",
    //
    // Paramétrage d'affichage du widget.
    //
    // Afficher les résultats sur une carte?
    ShowResultsOnMap: true,
    // Afficher les informations du point relais à la sélection sur la carte?
    DisplayMapInfo: true,
    // Fonction de callback déclenché lors de la selection d'un Point Relais
    OnParcelShopSelected:
      // Fonction de traitement à la sélection du point relais.
      // Remplace les données de cette page par le contenu de la variable data.
      // data: les informations du Point Relais
      function(data) {
        $("#cb_ID").html(data.ID);
        $("#cb_Nom").html(data.Nom);
        $("#cb_Adresse").html(data.Adresse1 + ' ' + data.Adresse2);
        $("#cb_CP").html(data.CP);
        $("#cb_Ville").html(data.Ville);
        $("#cb_Pays").html(data.Pays);
        setDataPeaker(data);
      }
      //
    // Autres paramétrages.
    //
    // Filtrer les Points Relais selon le Poids (en grammes) du colis à livrer
    // Weight: "",
    // Spécifier le nombre de jours entre la recherche et la dépose du colis dans notre réseau
    // SearchDelay: "3",
    // Limiter la recherche des Points Relais à une distance maximum
    // SearchFar: "",										
    // Liste des pays selectionnable par l'utilisateur pour la recherche: codes ISO 2 lettres
    // AllowedCountries: "FR,ES",
    // Force l'utilisation de Google Map si la librairie est présente? 
    // EnableGmap: true,                  
    // Activer la recherche de la position lorsque le navigateur de l'utilisateur le supporte?
    // EnableGeolocalisatedSearch: "true",
    // Spécifier l'utilisation de votre feuille de style CSS lorsque vous lui donnez la valeur "0"
    // CSS: "1",
    // Activer le zoom on scroll sur la carte des résultats?
    //,MapScrollWheel: "false",
    // Activer le mode Street View sur la carte des résultats (attention aux quotas imposés par Google)
    // MapStreetView: "false"
  });
});
        setLoad(true);
  



  }, []);
console.log(dataPicker)
  return (
    <>
    <div>
      <h2>Veuillez choisir votre mode de livraison</h2>
      <div> Mondial relais</div>
      {/* <div> Colissimo</div> */}
      <div>Arrive prochainement : Colissimo</div>
      <div>Arrive prochainement : remise en mains propre</div>
    </div>
    {load &&
    <>
      <div id="Zone_Widget"></div>

      <div style={{ padding: "8px", overflow: "auto" }}>
        <div style={{ background: "#edffb2", border: "solid 1px #a5f913", padding: "5px", fontFamily: "verdana", fontSize: "10px" }}>
          <em>Cette zone n&apos;est pas située dans le Widget mais bien dans la page appelante.</em><br /><br />
          <div style={{ display: "inline-block", verticalAlign: "top" }}>

            {/* La balise ayant pour id "TargetDisplay_Widget" a été paramétrée pour reçevoir 
            l'ID du Point Relais sélectionné */}
            Point Relais Selectionné : <input type="text" id="TargetDisplay_Widget" /><br />

            {/* Balise HTML avec id "Target_Widget", paramétrée pour reçevoir l'ID 
            du Point Relais sélectionné */}
            Hidden : <input type="text" id="Target_Widget" /><br />

            {/* Balise HTML avec id "TargetDisplayInfoPR_Widget" paramétrée pour recevoir 
            l'adresse du Point Relais sélectionné */}
            InfosPR : <span id="TargetDisplayInfoPR_Widget"></span>

          </div>

          <hr />

          <div style={{ display: "inline-block" }}>
            {/* Balises HTML utilisées dans la fonction de CallBack pour reçevoir des données à afficher */}
            <div style={{ fontWeight: "bold", textDecoration: "underline" }}>Callback zone</div><br />
            <div>data.ID = <span id="cb_ID"></span></div>
            <div>data.Nom = <span id="cb_Nom"></span></div>
            <div>data.Adresse = <span id="cb_Adresse"></span></div>
            <div>data.CP = <span id="cb_CP"></span></div>
            <div>data.Ville = <span id="cb_Ville"></span></div>
            <div>data.Pays = <span id="cb_Pays"></span></div>
          </div>
        </div>
      </div>
      <button onClick={() => fetchMrConfig()}>Fetch Mr Config</button>
      </>
      }
    </>
  );
};