"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginSig = ({ isDark }) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="relative w-[768px] max-w-full h-[480px] overflow-hidden">
      {/* Form Containers */}
      <div
        className={`absolute top-0 w-1/2 h-full transition-all duration-500 ${
          isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <Form type="signup" isDark={isDark} />
      </div>
      <div
        className={`absolute top-0 w-1/2 h-full transition-all duration-500 ${
          isSignUp ? "translate-x-full opacity-0 z-0" : "opacity-100 z-10"
        }`}
      >
        <Form type="signin" isDark={isDark} />
      </div>

      {/* Toggle Container */}
      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 rounded-r-[150px] ${
          isSignUp ? "-translate-x-full rounded-l-[150px]" : ""
        }`}
        style={{
          clipPath: isSignUp
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, calc(100% - 150px) 0, calc(100% - 150px) 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#F05050] to-[#D32F2F] rounded-tr-[150px] rounded-br-[150px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              {isSignUp ? <span className="text-white">Hello</span> : <span className="text-white">Welcome Back!</span>}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              {isSignUp ? "Choose your account type to register." : "Choose your account type to sign in."}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 px-6 py-2 border border-white text-white rounded-md uppercase text-xs hover:bg-white hover:text-[#F05050] transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>

      {/* Left Side Container */}
      <div
        className={`absolute top-0 right-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 rounded-l-[150px] ${
          isSignUp ? "" : "translate-x-full rounded-r-[150px]"
        }`}
        style={{
          clipPath: isSignUp
            ? "polygon(0 0, calc(100% - 150px) 0, calc(100% - 150px) 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#F05050] to-[#D32F2F] rounded-tl-[150px] rounded-bl-[150px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              {isSignUp ? <span className="text-white">Hello</span> : <span className="text-white">Welcome Back!</span>}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              {isSignUp ? "Choose your account type to register." : "Choose your account type to sign in."}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 px-6 py-2 border border-white text-white rounded-md uppercase text-xs hover:bg-white hover:text-[#F05050] transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Form Component
const Form = ({ type, isDark }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    accounttype: "",
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Navigation vers les pages d'inscription
  const handleSignUpNavigation = (accountType) => {
    if (accountType === "patient") {
      navigate("/PatientSignup")
    } else if (accountType === "pros") {
      navigate("/ProSignup")
    } else if (accountType === "resh") {
      navigate("/RespSignup")
    }
  }

  // Soumission du formulaire
  const handleSubmit = (e, accountType) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Redirection basée sur le type de compte
    if (accountType === "patient") {
      navigate("/PatientSignin")
    } else if (accountType === "pros") {
      navigate("/ProSignin")
    } else if (accountType === "resh") {
      navigate("/RespSignin")
    } else {
      navigate("/dashboard")
    }

    setLoading(false)
  }

  return (
    <div className={`flex flex-col items-center justify-center h-full p-10 ${isDark ? 'text-gray-200 bg-gray-800' : 'text-gray-800 bg-white'} rounded-[20px]`}>
      <h1 className="text-2xl font-bold text-[#F05050] mb-6">{type === "signup" ? "Create Account" : "Sign In"}</h1>

      {/* Boutons pour les différents types de comptes */}
      <div className="flex flex-col gap-4 w-full max-w-[250px]">
        {type === "signup" ? (
          <>
            <button
              onClick={() => handleSignUpNavigation("patient")}
              className="bg-[#F05050] text-white py-3 px-4 uppercase text-xs hover:bg-[#E04141] transition w-full rounded-lg"
            >
              Sign Up as Patient
            </button>
            <button
              onClick={() => handleSignUpNavigation("pros")}
              className="bg-[#E04141] text-white py-3 px-4 uppercase text-xs hover:bg-[#D32F2F] transition w-full rounded-lg"
            >
              Sign Up as Professional
            </button>
      
          </>
        ) : (
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            {error && <p className="text-red-500 text-xs mt-2 mb-2">{error}</p>}
            <button
              onClick={(e) => handleSubmit(e, "patient")}
              className="bg-[#F05050] text-white py-3 px-4 uppercase text-xs hover:bg-[#E04141] transition w-full mb-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In as Patient"}
            </button>
            <button
              onClick={(e) => handleSubmit(e, "pros")}
              className="bg-[#E04141] text-white py-3 px-4 uppercase text-xs hover:bg-[#D32F2F] transition w-full mb-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In as Professional"}
            </button>
   
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginSig




