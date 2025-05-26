"use client"

import { Outlet, NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png" // Assurez-vous que ce chemin est correct

const RootLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Liste des chemins où la barre de navigation et le footer DOIVENT s'afficher
  const showNavbarPaths = ["/", "/features"]

  // Vérifiez si le chemin actuel est dans la liste des chemins avec navbar
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname)

  // Effet pour détecter le défilement
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

  // Fonction pour faire défiler vers le footer
  const scrollToFooter = () => {
    const footer = document.querySelector("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Fonction pour gérer le clic sur Contact
  const handleContactClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault()
      scrollToFooter()
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
          <div className="w-full px-4">
            <div className="relative flex items-center justify-center">
              {/* Logo et nom - Positioned absolutely on the left */}
              <div className="absolute left-0 flex items-center">
                <div className="mr-2">
                  <img src={logo || "/placeholder.svg"} alt="E-mergency Logo" className="h-8 w-8" />
                </div>
                <span className={`text-xl font-bold ${scrolled ? "text-[#f05050]" : "text-white"}`}>E-mergency</span>
              </div>

              {/* Navigation centrale - Centered */}
              <nav className="hidden md:flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) => `
                    flex items-center hover:text-gray-200 transition duration-300 px-4 py-2 rounded-lg
                    ${
                      scrolled
                        ? isActive
                          ? "text-[#f05050] bg-red-50"
                          : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                        : isActive
                          ? "text-white bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </span>
                  Home
                </NavLink>

                <NavLink
                  to="/features"
                  className={({ isActive }) => `
                    flex items-center hover:text-gray-200 transition duration-300 px-4 py-2 rounded-lg
                    ${
                      scrolled
                        ? isActive
                          ? "text-[#f05050] bg-red-50"
                          : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                        : isActive
                          ? "text-white bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Features
                </NavLink>

                {location.pathname === "/" ? (
                  <button
                    onClick={handleContactClick}
                    className={`
                      flex items-center hover:text-gray-200 transition duration-300 px-4 py-2 rounded-lg
                      ${
                        scrolled
                          ? "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    Contact
                  </button>
                ) : (
                  <NavLink
                    to="/#footer"
                    className={({ isActive }) => `
                      flex items-center hover:text-gray-200 transition duration-300 px-4 py-2 rounded-lg
                      ${
                        scrolled
                          ? isActive
                            ? "text-[#f05050] bg-red-50"
                            : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                          : isActive
                            ? "text-white bg-white/10"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    Contact
                  </NavLink>
                )}
              </nav>

              {/* Mobile Menu Button - Positioned absolutely on the right */}
              <button
                className="absolute right-0 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${scrolled ? "text-gray-700" : "text-white"}`}
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
              <nav className="flex flex-col space-y-4 items-center">
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center transition duration-300 px-4 py-2 rounded-lg
                    ${
                      scrolled
                        ? isActive
                          ? "text-[#f05050] bg-red-50"
                          : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                        : isActive
                          ? "text-white bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </span>
                  Home
                </NavLink>

                <NavLink
                  to="/features"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center transition duration-300 px-4 py-2 rounded-lg
                    ${
                      scrolled
                        ? isActive
                          ? "text-[#f05050] bg-red-50"
                          : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                        : isActive
                          ? "text-white bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Features
                </NavLink>

                {location.pathname === "/" ? (
                  <button
                    onClick={() => {
                      handleContactClick()
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      flex items-center transition duration-300 text-left px-4 py-2 rounded-lg
                      ${
                        scrolled
                          ? "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    Contact
                  </button>
                ) : (
                  <NavLink
                    to="/#footer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center transition duration-300 px-4 py-2 rounded-lg
                      ${
                        scrolled
                          ? isActive
                            ? "text-[#f05050] bg-red-50"
                            : "text-gray-700 hover:text-[#f05050] hover:bg-gray-50"
                          : isActive
                            ? "text-white bg-white/10"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    Contact
                  </NavLink>
                )}
              </nav>
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
        <footer
          id="footer"
          className="bg-[#f05050] py-4 shadow-inner border-t border-red-400 transition-colors duration-300 w-full"
        >
          <div className="w-full px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo et nom */}
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-2">
                  <img src={logo || "/placeholder.svg"} alt="E-mergency Logo" className="h-8 w-8" />
                </div>
                <span className="text-xl font-bold text-white">E-mergency</span>
              </div>

              {/* Navigation centrale */}
              <nav className="flex space-x-6 mb-4 md:mb-0">
                <Link to="/" className="text-white/80 hover:text-white transition duration-300">
                  Home
                </Link>
                <Link to="/features" className="text-white/80 hover:text-white transition duration-300">
                  Features
                </Link>
                <button onClick={scrollToFooter} className="text-white/80 hover:text-white transition duration-300">
                  Contact
                </button>
              </nav>

              {/* Contact Information */}
              <div className="flex flex-col items-center md:items-end text-white/80 text-sm">
                <p>contact@e-mergency.com</p>
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="border-t border-red-400 mt-6 pt-4 text-center text-white/80">
              <p>&copy; {new Date().getFullYear()} E-mergency. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default RootLayout
