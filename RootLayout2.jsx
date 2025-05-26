"use client"

import { Outlet, NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png" // Assurez-vous que ce chemin est correct

const RootLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

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
    "/VerifPros",
    "/VerifPat",
    "/Pros",
    "/RedirPros",
    "/HistPro",
    "/RepForm",
    "/Moderation",
  ]

  // Vérifiez si le chemin actuel est dans la liste des chemins sans navbar
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname)

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark)

    // Appliquer la classe 'dark' au document pour permettre aux autres composants de détecter le mode sombre
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

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
                  Accueil
                </NavLink>

                <NavLink
                  to="/patient-features"
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
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Patient IoT & IA
                </NavLink>

                <NavLink
                  to="/professional-features"
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
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Professionnel Urgences
                </NavLink>

                <NavLink
                  to="/about"
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
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  À propos
                </NavLink>
              </nav>

              {/* Auth Buttons et Toggle */}
              <div className="hidden md:flex items-center">
                {/* Boutons de connexion */}
                <div
                  className={`rounded-full px-4 py-1 flex items-center transition-colors duration-300 ${
                    scrolled ? "bg-[#f05050] text-white" : isDark ? "bg-black text-white" : "bg-white text-[#f05050]"
                  }`}
                >
                  <Link to="/login" className="mr-1">
                    Connexion
                  </Link>
                  <span className="mx-1">|</span>
                  <Link to="/LoginSig">Inscription</Link>
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
              <div className="space-y-3">
                <Link to="/" className={`block ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}>
                  🏠 Accueil
                </Link>
                <Link
                  to="/patient-features"
                  className={`block ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                >
                  ❤️ Patient IoT & IA
                </Link>
                <Link
                  to="/professional-features"
                  className={`block ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                >
                  🩺 Professionnel Urgences
                </Link>
                <Link
                  to="/about"
                  className={`block ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                >
                  ℹ️ À propos
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Ajout d'un espace pour compenser le header fixe, seulement si la navbar est affichée */}
      {shouldShowNavbar && <div className={`${scrolled ? "h-16" : "h-20"} transition-all duration-300`}></div>}

      {/* Main Content */}
      <main className={`flex-grow w-full px-0 py-0 ${!shouldShowNavbar ? "mt-0" : ""}`}>
        <Outlet />
      </main>

      {/* Footer - Affiché conditionnellement */}
      {shouldShowNavbar && (
        <footer className="bg-[#f05050] py-8 shadow-inner border-t border-red-400 transition-colors duration-300 w-full">
          <div className="w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo et description */}
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-4">
                  <img src={logo || "/placeholder.svg"} alt="E-mergency Logo" className="h-8 w-8 mr-2" />
                  <span className={`text-xl font-bold ${isDark ? "text-black" : "text-white"}`}>E-mergency</span>
                </div>
                <p className={`text-sm ${isDark ? "text-black/80" : "text-white/80"} leading-relaxed`}>
                  Plateforme de santé connectée révolutionnaire combinant IoT, Intelligence Artificielle et réseau
                  médical pour une prise en charge d'urgence optimale et une traçabilité complète de votre santé.
                </p>
              </div>

              {/* Fonctionnalités Patient */}
              <div>
                <h3 className={`font-bold mb-4 ${isDark ? "text-black" : "text-white"} flex items-center`}>
                  <span className="mr-2">❤️</span>
                  Fonctionnalités Patient
                </h3>
                <div className={`space-y-2 text-sm ${isDark ? "text-black/80" : "text-white/80"}`}>
                  <div>
                    🔄 <strong>Détection automatique IoT</strong> - Surveillance continue via montre connectée et CGM
                    intelligent
                  </div>
                  <div>
                    🧠 <strong>Intelligence Artificielle</strong> - Analyse prédictive des anomalies cardiovasculaires
                  </div>
                  <div>
                    👥 <strong>Réseau de proches</strong> - Alerte automatique de vos contacts en cas d'urgence
                  </div>
                  <div>
                    📄 <strong>Dossier médical intelligent</strong> - Envoi automatique aux professionnels pour
                    diagnostic rapide
                  </div>
                  <div>
                    🛡️ <strong>Traçabilité santé</strong> - Historique complet et sécurisé de votre état de santé
                  </div>
                  <div>
                    📍 <strong>Alertes géolocalisées</strong> - Notifications des urgences médicales aux alentours
                  </div>
                </div>
              </div>

              {/* Fonctionnalités Professionnel */}
              <div>
                <h3 className={`font-bold mb-4 ${isDark ? "text-black" : "text-white"} flex items-center`}>
                  <span className="mr-2">🩺</span>
                  Fonctionnalités Professionnel
                </h3>
                <div className={`space-y-2 text-sm ${isDark ? "text-black/80" : "text-white/80"}`}>
                  <div>
                    🔔 <strong>Réception d'alertes</strong> - Notifications temps réel des urgences médicales
                  </div>
                  <div>
                    ✅ <strong>Prise en charge patients</strong> - Gestion complète des cas d'urgence avec dossiers
                  </div>
                  <div>
                    ⚡ <strong>Gestion de statut</strong> - Disponible/Indisponible pour consultations d'urgence
                  </div>
                  <div>
                    📞 <strong>Appels d'urgence</strong> - Réception d'appels prioritaires selon votre disponibilité
                  </div>
                  <div>
                    🚨 <strong>Consultations d'urgence</strong> - Interventions médicales en temps réel
                  </div>
                  <div>
                    📍 <strong>Alertes géolocalisées</strong> - Notifications des urgences dans votre zone
                    d'intervention
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`border-t border-red-400 mt-8 pt-6 text-center ${isDark ? "text-black/80" : "text-white/80"}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} E-mergency. Tous droits réservés.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <Link to="/PatientSignup" className="hover:underline">
                    Inscription Patient
                  </Link>
                  <Link to="/ProSignup" className="hover:underline">
                    Inscription Professionnel
                  </Link>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default RootLayout
