"use client"
import { useState, useEffect } from "react"
import LoginSig from "./LoginSig" // Importation du composant LoginSig

const Home = ({ isDarkMode }) => {
  const [textColor, setTextColor] = useState("text-white")
  const [showLoginPopup, setShowLoginPopup] = useState(false) // État pour contrôler l'affichage du popup

  useEffect(() => {
    if (isDarkMode) {
      setTextColor("text-black")
    } else {
      setTextColor("text-white")
    }
  }, [isDarkMode])

  // Fonction pour ouvrir le popup
  const openLoginPopup = () => {
    setShowLoginPopup(true)
    document.body.style.overflow = "hidden" // Empêcher le défilement
  }

  // Fonction pour fermer le popup
  const closeLoginPopup = () => {
    setShowLoginPopup(false)
    document.body.style.overflow = "" // Réactiver le défilement
  }


  return (
    <div className="relative">
      {/* Contenu principal avec effet de flou lorsque le popup est ouvert */}
      <div
       className={`flex flex-col items-center w-full min-h-screen ${textColor} transition-all duration-300 ${showLoginPopup ? "blur-sm" : ""}`}
        style={{
          backgroundImage: `url(${isDarkMode ? "/path-to-your-dark-mode-background.jpg" : "/CommeMobile.jpg"})`, // <-- MODIFICATION ICI
          backgroundSize: 'cover', // Pour que l'image couvre tout le fond
          backgroundPosition: 'center', // Pour centrer l'image
          backgroundAttachment: 'fixed', 
           opacity: 0.85,// (Optionnel) Pour que l'image de fond reste fixe en défilant
        }}
      >
        {/* Header Navigation */}

        {/* Section principale avec titre et logo */}
        <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
          {/* Emplacement pour le grand logo au centre */}
          <div className="relative mb-6">
            <img src="/path-to-your-big-logo.svg" alt="E-mergency Icon" className="h-40 w-40 opacity-30" />
          </div>

          {/* Titre principal */}
          <h1 className=" text-4xl font-bold mb-10 tracking-wide ">JOIN E-MERGENCY NOW !</h1>

          {/* Bouton Sign Up modifié pour ouvrir le popup au lieu de naviguer */}
          <button
            onClick={openLoginPopup}
            className={`bg-white ${isDarkMode ? "text-black" : "text-[#f05050]"} px-8 py-3 rounded-full text-xl font-semibold shadow-md hover:bg-gray-100 transition duration-300 mb-16`}
          >
            Sign Up
          </button>

          {/* Section "Who are we?" */}
          <section className="w-full max-w-4xl mb-16">
            <h2 className="text-[#f05050] font-bold mb-6 text-5xl">WHO ARE WE?</h2>

            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 text-center md:text-left px-2">
                <p className="mb-4 text-black text-lg">
                We Are the E-mergency team we introduce an innovative medical assistance application leveraging the Internet of Things IOT and IA to enhance emergency management. It targets risks associated with chronic conditions like diabetes and cardiovascular diseases, offering crucial support in critical situations such as driving.
                </p>
                <p className="mb-4 text-black text-lg">
                 Our platform provides real-time alerts to individuals, their contacts, and emergency services, utilizing a deep neural network for anomaly detection. Built with a secure, hybrid cloud architecture, it ensures high availability, scalability, and robust data protection.
               </p>
                <p className="mb-4 text-black text-lg">
                 Developed with expertise in software engineering and cybersecurity, this solution demonstrates technical feasibility for real-world use. We aim to improve patient quality of life by offering enhanced safety and peace of mind during unexpected health events.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex items-center justify-center mt-6 md:mt-0">
                {/* Emplacement pour le dessin/image avec texte en superposition */}
                <div className="relative w-full h-64 flex items-center justify-center">
                  {/* Image en arrière-plan depuis le dossier public */}
                  <div 
                    className="absolute inset-0 z-0 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: 'url("/ai-emergency-vehicle.jpg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: isDarkMode ? 0.7 : 0.9
                    }}
                  ></div>
                  {/* Texte en avant-plan */}
                  <div className="relative z-10 text-4xl font-bold drop-shadow-lg">
                 {/* <img>  </img>*/} 
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
      </div>

     {/* Popup LoginSig */}
        {showLoginPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0" onClick={closeLoginPopup}></div>
            <div className="relative z-10">
          {/* Bouton de fermeture */}
            <button
              className="absolute top-4 right-4 z-20 text-gray-100 hover:text-gray-200 bg-[#f05050] rounded-full w-6 h-6 flex items-center justify-center shadow-md transition duration-300 transform hover:scale-70"
              onClick={closeLoginPopup}
            >
              ×
            </button>

            {/* Composant LoginSig */}
            <LoginSig />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/*const Home = () => {
  const [data, setData] = useState(null); // Stocker les données de l'API
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  useEffect(() => {
    // Remplace l'URL par celle de ton API ASP.NET
    axios.get("http://localhost:5002/api/test/json") 
      .then((response) => {
        setData(response.data); // Stocker les données reçues
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);*/