"use client"

import { Outlet, NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  Home,
  Heart,
  Stethoscope,
  Shield,
  Users,
  Activity,
  Bell,
  FileText,
  MapPin,
  Brain,
  UserCheck,
  Phone,
  AlertTriangle,
} from "lucide-react"
import logo from "../../assets/logo.png"

const RootLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showPatientFeatures, setShowPatientFeatures] = useState(false)
  const [showProFeatures, setShowProFeatures] = useState(false)
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

  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)

    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full mb-4">
      {/* Header/Navigation */}
      {shouldShowNavbar && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
            scrolled ? "bg-white shadow-md py-2" : "bg-[#f05050] py-4"
          }`}
        >
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
                  <Home className="h-5 w-5 mr-1" />
                  Home
                </NavLink>

                {/* Patient Section avec dropdown */}
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowPatientFeatures(true)}
                    onMouseLeave={() => setShowPatientFeatures(false)}
                    className={`flex items-center hover:text-gray-200 transition duration-300 ${
                      scrolled
                        ? "text-gray-700 hover:text-[#f05050]"
                        : isDark
                          ? "text-black/90 hover:text-black"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    <Heart className="h-5 w-5 mr-1" />
                    Patient
                  </button>

                  {/* Dropdown Patient Features */}
                  {showPatientFeatures && (
                    <div
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
                      onMouseEnter={() => setShowPatientFeatures(true)}
                      onMouseLeave={() => setShowPatientFeatures(false)}
                    >
                      <h3 className="text-lg font-bold text-[#f05050] mb-3 flex items-center">
                        <Heart className="h-5 w-5 mr-2" />
                        Fonctionnalités Patient
                      </h3>

                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start space-x-2">
                          <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Détection automatique IoT</p>
                            <p className="text-xs text-gray-500">
                              Surveillance via montre connectée et CGM intelligent
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Brain className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Intelligence artificielle</p>
                            <p className="text-xs text-gray-500">Analyse prédictive des anomalies de santé</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Users className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Réseau de proches</p>
                            <p className="text-xs text-gray-500">
                              Alerte automatique des contacts en cas d'anomalie cardiovasculaire
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <FileText className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Dossier médical intelligent</p>
                            <p className="text-xs text-gray-500">
                              Envoi automatique du dossier comme indice diagnostique
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Shield className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Traçabilité santé</p>
                            <p className="text-xs text-gray-500">Vérification et enregistrement pour suivi médical</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Alertes géolocalisées</p>
                            <p className="text-xs text-gray-500">Réception des alertes médicales aux alentours</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/PatientSignup"
                        className="block w-full mt-4 bg-[#f05050] text-white text-center py-2 rounded-md hover:bg-[#d63384] transition-colors"
                      >
                        S'inscrire comme Patient
                      </Link>
                    </div>
                  )}
                </div>

                {/* Healthcare Professional Section avec dropdown */}
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowProFeatures(true)}
                    onMouseLeave={() => setShowProFeatures(false)}
                    className={`flex items-center hover:text-gray-200 transition duration-300 ${
                      scrolled
                        ? "text-gray-700 hover:text-[#f05050]"
                        : isDark
                          ? "text-black/90 hover:text-black"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    <Stethoscope className="h-5 w-5 mr-1" />
                    Healthcare Professional
                  </button>

                  {/* Dropdown Pro Features */}
                  {showProFeatures && (
                    <div
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
                      onMouseEnter={() => setShowProFeatures(true)}
                      onMouseLeave={() => setShowProFeatures(false)}
                    >
                      <h3 className="text-lg font-bold text-[#f05050] mb-3 flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2" />
                        Fonctionnalités Professionnel
                      </h3>

                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start space-x-2">
                          <Bell className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Réception d'alertes</p>
                            <p className="text-xs text-gray-500">Notifications en temps réel des urgences médicales</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <UserCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Prise en charge patients</p>
                            <p className="text-xs text-gray-500">Gestion complète des cas d'urgence</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Activity className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Gestion de statut</p>
                            <p className="text-xs text-gray-500">
                              Disponible/Indisponible pour consultations d'urgence
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Appels d'urgence</p>
                            <p className="text-xs text-gray-500">Réception d'appels prioritaires selon disponibilité</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Consultations d'urgence</p>
                            <p className="text-xs text-gray-500">Interventions médicales en temps réel</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Alertes géolocalisées</p>
                            <p className="text-xs text-gray-500">Réception des alertes médicales aux alentours</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/ProSignup"
                        className="block w-full mt-4 bg-[#f05050] text-white text-center py-2 rounded-md hover:bg-[#d63384] transition-colors"
                      >
                        S'inscrire comme Professionnel
                      </Link>
                    </div>
                  )}
                </div>
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
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
              <div className="space-y-4">
                <Link
                  to="/"
                  className={`block flex items-center ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Link>

                <div className="space-y-2">
                  <div
                    className={`font-medium flex items-center ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Patient
                  </div>
                  <Link to="/PatientSignup" className="block ml-7 text-sm bg-[#f05050] text-white px-3 py-1 rounded">
                    S'inscrire comme Patient
                  </Link>
                </div>

                <div className="space-y-2">
                  <div
                    className={`font-medium flex items-center ${scrolled ? "text-gray-700" : isDark ? "text-black" : "text-white"}`}
                  >
                    <Stethoscope className="h-5 w-5 mr-2" />
                    Healthcare Professional
                  </div>
                  <Link to="/ProSignup" className="block ml-7 text-sm bg-[#f05050] text-white px-3 py-1 rounded">
                    S'inscrire comme Professionnel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Espace pour compenser le header fixe */}
      {shouldShowNavbar && <div className={`${scrolled ? "h-16" : "h-20"} transition-all duration-300`}></div>}

      {/* Main Content */}
      <main className={`flex-grow w-full px-0 py-0 ${!shouldShowNavbar ? "mt-0" : ""}`}>
        <Outlet />
      </main>

      {/* Footer */}
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
                <p className={`text-sm ${isDark ? "text-black/80" : "text-white/80"}`}>
                  Plateforme de santé connectée pour une prise en charge médicale intelligente et rapide.
                </p>
              </div>

              {/* Liens rapides */}
              <div>
                <h3 className={`font-bold mb-4 ${isDark ? "text-black" : "text-white"}`}>Liens rapides</h3>
                <div className="space-y-2">
                  <Link
                    to="/PatientSignup"
                    className={`block text-sm hover:underline ${isDark ? "text-black/80" : "text-white/80"}`}
                  >
                    Inscription Patient
                  </Link>
                  <Link
                    to="/ProSignup"
                    className={`block text-sm hover:underline ${isDark ? "text-black/80" : "text-white/80"}`}
                  >
                    Inscription Professionnel
                  </Link>
                  <Link
                    to="/about"
                    className={`block text-sm hover:underline ${isDark ? "text-black/80" : "text-white/80"}`}
                  >
                    À propos
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className={`font-bold mb-4 ${isDark ? "text-black" : "text-white"}`}>Contact</h3>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center ${isDark ? "text-black/80" : "text-white/80"}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    +213 XXX XXX XXX
                  </div>
                  <div className={`flex items-center ${isDark ? "text-black/80" : "text-white/80"}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Alger, Algérie
                  </div>
                </div>
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
    </div>
  )
}

export default RootLayout
