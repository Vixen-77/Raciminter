"use client"

import { Outlet, NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png" // Assurez-vous que ce chemin est correct

const RootLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation();

  // Liste des chemins où la barre de navigation et le footer ne doivent PAS s'afficher
  const noNavbarPaths = [
    "/LoginSig", 
    "/PatientSignup", 
    "/ProSignup", 
    "/RespSignup",
    "/PatientSignin",
    "/ProSignin",
    "/RespSignin",
    "/Patient",
    "/ProS",
    "/Resp",
    "/RedirProS",
    "/Admin",
    "/Pros",
    "/RedirPros",
    "/LoginSig",
    "/ListProches",
    "/MedRec",
    "/HistPro"
  ];
  
  // Vérifiez si le chemin actuel est dans la liste des chemins sans navbar
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  // Effet pour détecter le défilement - Corrigé pour s'assurer que l'événement fonctionne
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll)
    
    // Vérifier immédiatement au chargement
    handleScroll()
    
    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

const toggleDarkMode = () => {
  // Optionnel : désactive le bouton (plus rien ne change)
  console.log("Dark mode désactivé.");
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full mb-4">
      {/* Header/Navigation - Affiché conditionnellement */}
      {shouldShowNavbar && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
            scrolled ? "bg-white shadow-md py-2" : "bg-[#f05050] py-4"
          }`}
        >
          {/* Reste du code du header... */}
          <div className="w-full px-4">
            <div className="flex items-center justify-between">
              {/* Logo et nom */}
              <div className="flex items-center">
                <div className="mr-2">
                  <img src={logo || "/placeholder.svg"} alt="E-mergency Logo" className="h-8 w-8" />
                </div>
                <span
                  className={`text-xl font-bold ${scrolled ? "text-[#f05050]" : isDark ? "text-black" : "text-white"}`}
                >
                  E-mergency
                </span>
              </div>

              {/* Navigation centrale - Desktop */}
              <nav className="hidden md:flex space-x-6">
                {/* Contenu de la navigation... */}
                <NavLink
                  to="/"
                  className={({ isActive }) => `
                    flex items-center hover:text-gray-200 transition duration-300
                    ${
                      scrolled
                        ? isActive
                          ? "text-[#f05050]"
                          : "text-gray-700 hover:text-[#f05050]"
                        : isActive
                          ? isDark
                            ? "text-black"
                            : "text-white"
                          : isDark
                            ? "text-black/90 hover:text-black"
                            : "text-white/90 hover:text-white"
                    }
                  `}
                >
                  <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </span>
                  Home
                </NavLink>
                {/* Autres liens de navigation... */}
              </nav>

              {/* Auth Buttons et Toggle */}
              <div className="hidden md:flex items-center">
                {/* Toggle dark mode button */}
                <button
                  onClick={toggleDarkMode}
                  className={`mr-4 ${isDark ? "bg-gray-700" : "bg-white"} rounded-full p-1 flex items-center w-12 h-6 relative transition-colors duration-300`}
                  aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                      isDark ? "bg-blue-400 translate-x-6" : "bg-yellow-400 translate-x-1"
                    }`}
                  ></div>
                </button>

                {/* Boutons de connexion */}
                <div
                  className={`rounded-full px-4 py-1 flex items-center transition-colors duration-300 ${
                    scrolled ? "bg-[#f05050] text-white" : isDark ? "bg-black text-white" : "bg-white text-[#f05050]"
                  }`}
                >
                  <Link to="/login" className="mr-1">
                    Log In
                  </Link>
                  <span className="mx-1">|</span>
                  <Link to="/LoginSig">Sign Up</Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}
            >
              {/* Contenu du menu mobile... */}
            </div>
          </div>
        </header>
      )}

      {/* Ajout d'un espace pour compenser le header fixe, seulement si la navbar est affichée */}
      {shouldShowNavbar && (
        <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>
      )}

      {/* Main Content */}
      <main className={`flex-grow w-full px-0 py-0 ${!shouldShowNavbar ? 'mt-0' : ''}`}>
        <Outlet />
      </main>

      {/* Footer - Affiché conditionnellement */}
      {shouldShowNavbar && (
        <footer className="bg-[#f05050] py-4 shadow-inner border-t border-red-400 transition-colors duration-300 w-full">
          {/* Contenu du footer... */}
          <div className="w-full px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo et nom */}
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-2">
                  <img src={logo || "/placeholder.svg"} alt="E-mergency Logo" className="h-8 w-8" />
                </div>
                <span className={`text-xl font-bold ${isDark ? "text-black" : "text-white"}`}>E-mergency</span>
              </div>

              {/* Navigation centrale */}
              <nav className="flex space-x-6 mb-4 md:mb-0">
                {/* Liens de navigation du footer... */}
              </nav>

              {/* Toggle et boutons auth */}
              <div className="flex items-center">
                {/* Contenu des boutons... */}
              </div>
            </div>

            <div
              className={`border-t border-red-400 mt-6 pt-4 text-center ${isDark ? "text-black/80" : "text-white/80"}`}
            >
              <p>&copy; {new Date().getFullYear()} E-mergency. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      )}

      {/* Indicateur de mode sombre (pour le débogage) */}
      <div className="fixed bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-white">
        {isDark ? "DARK" : "LIGHT"}
      </div>
    </div>
  )
}

export default RootLayout






