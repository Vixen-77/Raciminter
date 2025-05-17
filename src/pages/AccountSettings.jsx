"use client"

import { useState, useEffect, useRef } from "react"

const AccountSettings = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState("profile")

  // Modifier l'état initial de profileData pour séparer nom et prénom
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weight: "",
    height: "",
    address: "",
    postalcode: "",
    role: 0,
  })
  const [passwordData, setPasswordData] = useState({
    email: "",
    emailSent: false,
    code0: "",
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    codeVerified: false,
    codeError: "",
    passwordError: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [phoneData, setPhoneData] = useState({
    email: "",
    emailSent: false,
    code0: "",
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    codeVerified: false,
    codeError: "",
    newPhone: "",
  })

  const [emailData, setEmailData] = useState({
    phone: "",
    codeSent: false,
    code0: "",
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    codeVerified: false,
    codeError: "",
    newEmail: "",
  })
  // Modifier la partie useEffect pour séparer le nom et prénom
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      const data = userData.result // 👈 on récupère directement l'objet patient

      setProfileData({
        firstName: data.name || "",
        lastName: data.lastName || "",
        email: data.email,
        phone: data.phonenumber,
        weight: data.weight,
        height: data.height,
        address: data.address,
        birthdate: data.birthdate,
        postalcode: data.postalcode,
        role: data.role || 0,
      })
    }
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handlePhoneChange = (e) => {
    const { name, value } = e.target
    setPhoneData({
      ...phoneData,
      [name]: value,
    })
  }

  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setEmailData({
      ...emailData,
      [name]: value,
    })
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated:", profileData)
    alert("Profile updated successfully!")
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible.")
    if (confirmed) {
      // A AJOUTER Ici tu peux ajouter ta requête vers l'API de suppression
      console.log("Compte supprimé.")
      alert("Ton compte a été supprimé.")
      // A AJOUTER Rediriger ou nettoyer les données utilisateur ici
    }
  }

  // References for code input fields
  const passwordCodeRefs = useRef([])
  const phoneCodeRefs = useRef([])
  const emailCodeRefs = useRef([])

  // Handle verification code input for password change
  const handlePasswordCodeChange = (e, index) => {
    const value = e.target.value
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return
    // Update the state
    setPasswordData((prev) => ({
      ...prev,
      [`code${index}`]: value,
    }))
    // Move to next input if value is entered
    if (value && index < 5 && passwordCodeRefs.current[index + 1]) {
      passwordCodeRefs.current[index + 1].focus()
    }
  }

  // Handle backspace and arrow keys in code input for password change
  const handlePasswordCodeKeyDown = (e, index) => {
    // If backspace is pressed and the field is empty, focus on the previous field
    if (e.key === "Backspace" && !passwordData[`code${index}`] && index > 0) {
      passwordCodeRefs.current[index - 1].focus()
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      passwordCodeRefs.current[index - 1].focus()
    }
    if (e.key === "ArrowRight" && index < 5) {
      passwordCodeRefs.current[index + 1].focus()
    }
  }

  // Handle verification code input for phone change
  const handlePhoneCodeChange = (e, index) => {
    const value = e.target.value
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return
    // Update the state
    setPhoneData((prev) => ({
      ...prev,
      [`code${index}`]: value,
    }))
    // Move to next input if value is entered
    if (value && index < 5 && phoneCodeRefs.current[index + 1]) {
      phoneCodeRefs.current[index + 1].focus()
    }
  }

  // Handle backspace and arrow keys in code input for phone change
  const handlePhoneCodeKeyDown = (e, index) => {
    // If backspace is pressed and the field is empty, focus on the previous field
    if (e.key === "Backspace" && !phoneData[`code${index}`] && index > 0) {
      phoneCodeRefs.current[index - 1].focus()
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      phoneCodeRefs.current[index - 1].focus()
    }
    if (e.key === "ArrowRight" && index < 5) {
      phoneCodeRefs.current[index + 1].focus()
    }
  }

  // Handle verification code input for email change
  const handleEmailCodeChange = (e, index) => {
    const value = e.target.value
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return
    // Update the state
    setEmailData((prev) => ({
      ...prev,
      [`code${index}`]: value,
    }))
    // Move to next input if value is entered
    if (value && index < 5 && emailCodeRefs.current[index + 1]) {
      emailCodeRefs.current[index + 1].focus()
    }
  }

  // Handle backspace and arrow keys in code input for email change
  const handleEmailCodeKeyDown = (e, index) => {
    // If backspace is pressed and the field is empty, focus on the previous field
    if (e.key === "Backspace" && !emailData[`code${index}`] && index > 0) {
      emailCodeRefs.current[index - 1].focus()
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      emailCodeRefs.current[index - 1].focus()
    }
    if (e.key === "ArrowRight" && index < 5) {
      emailCodeRefs.current[index + 1].focus()
    }
  }

  // Password change handlers
  const handleSendPasswordCode = (e) => {
    e.preventDefault()
    // Validate email
    if (!passwordData.email && !profileData.email) {
      alert("Veuillez entrer votre adresse email")
      return
    }
    // TODO: Add API call to send verification code
    console.log("Sending verification code to:", passwordData.email || profileData.email)
    // Update state to show verification code input
    setPasswordData((prev) => ({
      ...prev,
      emailSent: true,
    }))
    // Focus on first code input after a short delay
    setTimeout(() => {
      if (passwordCodeRefs.current[0]) {
        passwordCodeRefs.current[0].focus()
      }
    }, 100)
  }

  const handleResendPasswordCode = () => {
    // TODO: Add API call to resend verification code
    console.log("Resending password verification code")
    alert("Un nouveau code a été envoyé à votre adresse email")
  }

  const handleVerifyPasswordCode = (e) => {
    e.preventDefault()
    // Combine all code digits
    const fullCode = [0, 1, 2, 3, 4, 5].map((index) => passwordData[`code${index}`]).join("")
    // Validate code length
    if (fullCode.length !== 6) {
      setPasswordData((prev) => ({
        ...prev,
        codeError: "Veuillez entrer le code complet à 6 chiffres",
      }))
      return
    }
    // TODO: Add API call to verify code
    console.log("Verifying password code:", fullCode)
    // For demo purposes, accept any 6-digit code
    setPasswordData((prev) => ({
      ...prev,
      codeVerified: true,
      codeError: "",
    }))
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    // Validate passwords
    if (!passwordData.newPassword) {
      setPasswordData((prev) => ({
        ...prev,
        passwordError: "Veuillez entrer un nouveau mot de passe",
      }))
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordData((prev) => ({
        ...prev,
        passwordError: "Les mots de passe ne correspondent pas",
      }))
      return
    }
    // TODO: Add API call to update password
    console.log("Updating password")
    // Reset form and show success message
    alert("Votre mot de passe a été changé avec succès!")
    setPasswordData({
      email: "",
      emailSent: false,
      code0: "",
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      codeVerified: false,
      codeError: "",
      passwordError: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Phone change handlers
  const handleSendPhoneCode = (e) => {
    e.preventDefault()
    // Validate email
    if (!phoneData.email && !profileData.email) {
      alert("Veuillez entrer votre adresse email")
      return
    }
    // TODO: Add API call to send verification code
    console.log("Sending verification code to:", phoneData.email || profileData.email)
    // Update state to show verification code input
    setPhoneData((prev) => ({
      ...prev,
      emailSent: true,
    }))
    // Focus on first code input after a short delay
    setTimeout(() => {
      if (phoneCodeRefs.current[0]) {
        phoneCodeRefs.current[0].focus()
      }
    }, 100)
  }

  const handleResendPhoneCode = () => {
    // TODO: Add API call to resend verification code
    console.log("Resending phone verification code")
    alert("Un nouveau code a été envoyé à votre adresse email")
  }

  const handleVerifyPhoneCode = (e) => {
    e.preventDefault()
    // Combine all code digits
    const fullCode = [0, 1, 2, 3, 4, 5].map((index) => phoneData[`code${index}`]).join("")
    // Validate code length
    if (fullCode.length !== 6) {
      setPhoneData((prev) => ({
        ...prev,
        codeError: "Veuillez entrer le code complet à 6 chiffres",
      }))
      return
    }
    // TODO: Add API call to verify code
    console.log("Verifying phone code:", fullCode)
    // For demo purposes, accept any 6-digit code
    setPhoneData((prev) => ({
      ...prev,
      codeVerified: true,
      codeError: "",
    }))
  }

  const handleUpdatePhone = (e) => {
    e.preventDefault()
    // Validate new phone
    if (!phoneData.newPhone) {
      setPhoneData((prev) => ({
        ...prev,
        codeError: "Veuillez entrer un nouveau numéro de téléphone",
      }))
      return
    }
    // TODO: Add API call to update phone
    console.log("Updating phone to:", phoneData.newPhone)
    // Reset form and show success message
    alert("Votre numéro de téléphone a été changé avec succès!")
    setPhoneData({
      email: "",
      emailSent: false,
      code0: "",
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      codeVerified: false,
      codeError: "",
      newPhone: "",
    })
  }

  // Email change handlers
  const handleSendEmailCode = (e) => {
    e.preventDefault()
    // Validate phone
    if (!emailData.phone && !profileData.phone) {
      alert("Veuillez entrer votre numéro de téléphone")
      return
    }
    // TODO: Add API call to send verification code
    console.log("Sending verification code to phone:", emailData.phone || profileData.phone)
    // Update state to show verification code input
    setEmailData((prev) => ({
      ...prev,
      codeSent: true,
    }))
    // Focus on first code input after a short delay
    setTimeout(() => {
      if (emailCodeRefs.current[0]) {
        emailCodeRefs.current[0].focus()
      }
    }, 100)
  }

  const handleResendEmailCode = () => {
    // TODO: Add API call to resend verification code
    console.log("Resending email verification code")
    alert("Un nouveau code a été envoyé à votre numéro de téléphone")
  }

  const handleVerifyEmailCode = (e) => {
    e.preventDefault()
    // Combine all code digits
    const fullCode = [0, 1, 2, 3, 4, 5].map((index) => emailData[`code${index}`]).join("")
    // Validate code length
    if (fullCode.length !== 6) {
      setEmailData((prev) => ({
        ...prev,
        codeError: "Veuillez entrer le code complet à 6 chiffres",
      }))
      return
    }
    // TODO: Add API call to verify code
    console.log("Verifying email code:", fullCode)
    // For demo purposes, accept any 6-digit code
    setEmailData((prev) => ({
      ...prev,
      codeVerified: true,
      codeError: "",
    }))
  }

  const handleUpdateEmail = (e) => {
    e.preventDefault()
    // Validate new email
    if (!emailData.newEmail) {
      setEmailData((prev) => ({
        ...prev,
        codeError: "Veuillez entrer une nouvelle adresse email",
      }))
      return
    }
    // TODO: Add API call to update email
    console.log("Updating email to:", emailData.newEmail)
    // Reset form and show success message
    alert("Votre adresse email a été changée avec succès!")
    setEmailData({
      phone: "",
      codeSent: false,
      code0: "",
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      codeVerified: false,
      codeError: "",
      newEmail: "",
    })
  }

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>Paramètres du compte</h1>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-t-lg shadow border-b flex mb-0 flex-wrap`}>
          <button
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === "profile"
                ? "border-b-2 border-[#F05050] text-[#F05050]"
                : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profil
          </button>
          <button
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === "password"
                ? "border-b-2 border-[#F05050] text-[#F05050]"
                : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Changer MDP
          </button>
          <button
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === "phone"
                ? "border-b-2 border-[#F05050] text-[#F05050]"
                : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("phone")}
          >
            Changer Tel
          </button>
          <button
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === "email"
                ? "border-b-2 border-[#F05050] text-[#F05050]"
                : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Changer Email
          </button>
        </div>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-b-lg shadow p-6`}>
          {/* Remplacer la partie du formulaire de profil dans le rendu */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prénom - non modifiable */}
                <div>
                  <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    disabled
                    className={`w-full p-2 rounded border ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-300 border-gray-300"
                    } outline-none transition-colors duration-200 cursor-not-allowed`}
                  />
                </div>

                {/* Nom - non modifiable */}
                <div>
                  <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    disabled
                    className={`w-full p-2 rounded border ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-300 border-gray-300"
                    } outline-none transition-colors duration-200 cursor-not-allowed`}
                  />
                </div>
                  {/* date naissance- non modifiable */}
                  <div>
                  <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>Date naissance</label>
                  <input
                    type="text"
                    name="birthdate"
                    value={profileData.birthdate}
                    disabled
                    className={`w-full p-2 rounded border ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-300 border-gray-300"
                    } outline-none transition-colors duration-200 cursor-not-allowed`}
                  />
                </div>

                {/* Afficher poids et taille uniquement si role=10 */}
                {profileData.role === 10 && (
                  <>
                    {/* Height */}
                    <div>
                      <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        Taille
                      </label>
                      <input
                        type="text"
                        name="height"
                        value={profileData.height}
                        onChange={handleProfileChange}
                        className={`w-full p-2 rounded border ${
                          isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        Poids
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={profileData.weight}
                        onChange={handleProfileChange}
                        className={`w-full p-2 rounded border ${
                          isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      />
                    </div>
                  </>
                )}

                {/* Address */}
                <div>
                  <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    className={`w-full p-2 rounded border ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                  />
                </div>

                {/* Postal code */}
                <div>
                  <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    Code postal
                  </label>
                  <input
                    type="text"
                    name="postalcode"
                    value={profileData.postalcode}
                    onChange={handleProfileChange}
                    className={`w-full p-2 rounded border ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
              >
                Enregistrer les modifications
              </button>
            </form>
          )}

          {activeTab === "password" && (
            <div className="space-y-6">
              {/* Step 1: Email Input */}
              {!passwordData.emailSent && (
                <form onSubmit={handleSendPasswordCode} className="space-y-6">
                  <div className="md:col-span-2">
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Adresse email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={passwordData.email || profileData.email}
                      onChange={handlePasswordChange}
                      className={`w-full p-2 rounded border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      placeholder="Entrez votre adresse email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Envoyer le code de vérification
                  </button>
                </form>
              )}

              {/* Step 2: Verification Code Input */}
              {passwordData.emailSent && !passwordData.codeVerified && (
                <form onSubmit={handleVerifyPasswordCode} className="space-y-6">
                  <div>
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Code de vérification
                    </label>
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Un code à 6 chiffres a été envoyé à votre adresse email. Veuillez l'entrer ci-dessous.
                    </p>

                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          name={`code${index}`}
                          value={passwordData[`code${index}`] || ""}
                          onChange={(e) => handlePasswordCodeChange(e, index)}
                          onKeyDown={(e) => handlePasswordCodeKeyDown(e, index)}
                          ref={(el) => (passwordCodeRefs.current[index] = el)}
                          className={`w-12 h-12 text-center text-xl font-bold rounded border ${
                            isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                          } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                        />
                      ))}
                    </div>
                  </div>

                  {passwordData.codeError && <p className="text-red-500 text-sm">{passwordData.codeError}</p>}

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleResendPasswordCode}
                      className="text-[#F05050] text-sm hover:underline"
                    >
                      Renvoyer le code
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                    >
                      Vérifier le code
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: New Password Input */}
              {passwordData.codeVerified && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full p-2 rounded border ${
                          isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      />
                    </div>

                    <div>
                      <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full p-2 rounded border ${
                          isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                        } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      />
                    </div>
                  </div>

                  {passwordData.passwordError && <p className="text-red-500 text-sm">{passwordData.passwordError}</p>}

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Changer le mot de passe
                  </button>
                </form>
              )}

              {/* Supprimer le compte */}
              <div className="pt-4 border-t border-gray-400">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="text-red-500 font-medium hover:underline"
                >
                  Supprimer le compte
                </button>
              </div>
            </div>
          )}

          {activeTab === "phone" && (
            <div className="space-y-6">
              {/* Step 1: Email Input */}
              {!phoneData.emailSent && (
                <form onSubmit={handleSendPhoneCode} className="space-y-6">
                  <div className="md:col-span-2">
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Adresse email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={phoneData.email || profileData.email}
                      onChange={handlePhoneChange}
                      className={`w-full p-2 rounded border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      placeholder="Entrez votre adresse email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Envoyer le code de vérification
                  </button>
                </form>
              )}

              {/* Step 2: Verification Code Input */}
              {phoneData.emailSent && !phoneData.codeVerified && (
                <form onSubmit={handleVerifyPhoneCode} className="space-y-6">
                  <div>
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Code de vérification
                    </label>
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Un code à 6 chiffres a été envoyé à votre adresse email. Veuillez l'entrer ci-dessous.
                    </p>

                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          name={`code${index}`}
                          value={phoneData[`code${index}`] || ""}
                          onChange={(e) => handlePhoneCodeChange(e, index)}
                          onKeyDown={(e) => handlePhoneCodeKeyDown(e, index)}
                          ref={(el) => (phoneCodeRefs.current[index] = el)}
                          className={`w-12 h-12 text-center text-xl font-bold rounded border ${
                            isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                          } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                        />
                      ))}
                    </div>
                  </div>

                  {phoneData.codeError && <p className="text-red-500 text-sm">{phoneData.codeError}</p>}

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleResendPhoneCode}
                      className="text-[#F05050] text-sm hover:underline"
                    >
                      Renvoyer le code
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                    >
                      Vérifier le code
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: New Phone Input */}
              {phoneData.codeVerified && (
                <form onSubmit={handleUpdatePhone} className="space-y-6">
                  <div>
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Nouveau numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      name="newPhone"
                      value={phoneData.newPhone}
                      onChange={handlePhoneChange}
                      className={`w-full p-2 rounded border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      placeholder="Entrez votre nouveau numéro de téléphone"
                    />
                  </div>

                  {phoneData.codeError && <p className="text-red-500 text-sm">{phoneData.codeError}</p>}

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Mettre à jour le numéro de téléphone
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-6">
              {/* Step 1: Phone Input */}
              {!emailData.codeSent && (
                <form onSubmit={handleSendEmailCode} className="space-y-6">
                  <div className="md:col-span-2">
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={emailData.phone || profileData.phone}
                      onChange={handleEmailChange}
                      className={`w-full p-2 rounded border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      placeholder="Entrez votre numéro de téléphone"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Envoyer le code de vérification
                  </button>
                </form>
              )}

              {/* Step 2: Verification Code Input */}
              {emailData.codeSent && !emailData.codeVerified && (
                <form onSubmit={handleVerifyEmailCode} className="space-y-6">
                  <div>
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Code de vérification
                    </label>
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Un code à 6 chiffres a été envoyé à votre numéro de téléphone. Veuillez l'entrer ci-dessous.
                    </p>

                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          name={`code${index}`}
                          value={emailData[`code${index}`] || ""}
                          onChange={(e) => handleEmailCodeChange(e, index)}
                          onKeyDown={(e) => handleEmailCodeKeyDown(e, index)}
                          ref={(el) => (emailCodeRefs.current[index] = el)}
                          className={`w-12 h-12 text-center text-xl font-bold rounded border ${
                            isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                          } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                        />
                      ))}
                    </div>
                  </div>

                  {emailData.codeError && <p className="text-red-500 text-sm">{emailData.codeError}</p>}

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleResendEmailCode}
                      className="text-[#F05050] text-sm hover:underline"
                    >
                      Renvoyer le code
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                    >
                      Vérifier le code
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: New Email Input */}
              {emailData.codeVerified && (
                <form onSubmit={handleUpdateEmail} className="space-y-6">
                  <div>
                    <label className={`block font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Nouvelle adresse email
                    </label>
                    <input
                      type="email"
                      name="newEmail"
                      value={emailData.newEmail}
                      onChange={handleEmailChange}
                      className={`w-full p-2 rounded border ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                      } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                      placeholder="Entrez votre nouvelle adresse email"
                    />
                  </div>

                  {emailData.codeError && <p className="text-red-500 text-sm">{emailData.codeError}</p>}

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                  >
                    Mettre à jour l'adresse email
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountSettings


