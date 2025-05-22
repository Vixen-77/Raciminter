"use client"

import { useState, useEffect } from "react"

const MedRec = () => {
  const [isDark, setIsDark] = useState(false)
  const [medicalRecords, setMedicalRecords] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state
  const [newRecord, setNewRecord] = useState({
    title: "",
    doctorEmail: "",
    file: null,
  })

  // Error state
  const [errors, setErrors] = useState({})

  // Load medical records
  useEffect(() => {
    // Données d'exemple pour démonstration - pas de dépendance au back-end
    const sampleRecords = [
      {
        id: 1,
        title: "Radiographie du genou",
        doctorEmail: "dr.martin@example.com",
        date: "2023-05-15",
        status: "validated",
      },
      {
        id: 2,
        title: "Analyse de sang",
        doctorEmail: "dr.dupont@example.com",
        date: "2023-06-10",
        status: "pending",
      },
      {
        id: 3,
        title: "Ordonnance médicale",
        doctorEmail: "dr.bernard@example.com",
        date: "2023-06-20",
        status: "pending",
      },
    ]

    // Utiliser les données d'exemple directement
    setMedicalRecords(sampleRecords)

    // Optionnel: sauvegarder dans localStorage
    try {
      localStorage.setItem("medicalRecords", JSON.stringify(sampleRecords))
    } catch (error) {
      console.log("Erreur localStorage:", error)
    }
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRecord({
      ...newRecord,
      [name]: value,
    })

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord({
        ...newRecord,
        file: e.target.files[0],
      })

      // Clear error for this field
      if (errors.file) {
        setErrors({
          ...errors,
          file: null,
        })
      }
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!newRecord.title.trim()) {
      newErrors.title = "Le titre est requis"
    }

    if (!newRecord.doctorEmail.trim()) {
      newErrors.doctorEmail = "L'email du médecin est requis"
    } else if (!/\S+@\S+\.\S+/.test(newRecord.doctorEmail)) {
      newErrors.doctorEmail = "L'email n'est pas valide"
    }

    if (!newRecord.file) {
      newErrors.file = "Le fichier est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Create a new record
      const newRecordData = {
        id: Date.now(),
        title: newRecord.title,
        doctorEmail: newRecord.doctorEmail,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      }

      // Pour exécution sans back-end, on met à jour directement
      // Add to state
      const updatedRecords = [...medicalRecords, newRecordData]
      setMedicalRecords(updatedRecords)

      // Optionnel: sauvegarder dans localStorage
      try {
        localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
      } catch (error) {
        console.log("Erreur localStorage:", error)
      }

      // Reset form
      setNewRecord({
        title: "",
        doctorEmail: "",
        file: null,
      })

      // Hide form
      setShowAddForm(false)
    }
  }

  // Handle record deletion
  const handleDeleteRecord = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dossier médical ?")) {
      // Pour exécution sans back-end, on met à jour directement
      const updatedRecords = medicalRecords.filter((record) => record.id !== id)
      setMedicalRecords(updatedRecords)

      // Optionnel: sauvegarder dans localStorage
      try {
        localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
      } catch (error) {
        console.log("Erreur localStorage:", error)
      }
    }
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString("fr-FR", options)
    } catch (error) {
      return dateString
    }
  }

  // Render status badge
  const renderStatusBadge = (status) => {
    if (status === "validated") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Validé
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
          En attente
        </span>
      )
    }
  }

  // Render icons
  const renderIcon = (name) => {
    switch (name) {
      case "plus":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        )
      case "file":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        )
      case "trash":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        )
      case "mail":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        )
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
      case "upload":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        )
      case "x":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Header */}
      <div className={`${isDark ? "bg-gray-800" : "bg-white"} shadow-md p-4`}>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Mes Dossiers Médicaux</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Gérez vos dossiers médicaux et ordonnances
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Add Record Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              showAddForm ? "bg-gray-500 hover:bg-gray-600" : "bg-[#f05050] hover:bg-[#e04040]"
            } text-white transition-colors`}
          >
            <span className="mr-2">{showAddForm ? renderIcon("x") : renderIcon("plus")}</span>
            <span>{showAddForm ? "Annuler" : "Ajouter un dossier médical"}</span>
          </button>
        </div>

        {/* Add Record Form */}
        {showAddForm && (
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6 mb-6`}>
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau dossier médical</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  Titre du dossier
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newRecord.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                  placeholder="Ex: Radiographie du genou"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="doctorEmail">
                  Email du médecin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {renderIcon("mail")}
                  </div>
                  <input
                    type="email"
                    id="doctorEmail"
                    name="doctorEmail"
                    value={newRecord.doctorEmail}
                    onChange={handleInputChange}
                    className={`pl-10 w-full px-3 py-2 rounded-lg border ${
                      isDark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                    placeholder="docteur@example.com"
                  />
                </div>
                {errors.doctorEmail && <p className="mt-1 text-sm text-red-500">{errors.doctorEmail}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="file">
                  Image du dossier médical
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    isDark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center py-3">
                      <span className="mb-2 text-[#f05050]">{renderIcon("upload")}</span>
                      <span className="text-sm font-medium">
                        {newRecord.file ? newRecord.file.name : "Cliquez pour sélectionner une image"}
                      </span>
                      <span className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        PNG, JPG ou PDF jusqu'à 10MB
                      </span>
                    </div>
                  </label>
                </div>
                {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#f05050] text-white px-4 py-2 rounded-lg hover:bg-[#e04040] transition-colors"
                >
                  Ajouter le dossier
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Medical Records List */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md overflow-hidden`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Mes dossiers ({medicalRecords.length})</h2>
          </div>

          {medicalRecords.length === 0 ? (
            <div className="p-6 text-center">
              <div className={`text-5xl mb-4 ${isDark ? "text-gray-600" : "text-gray-300"}`}>{renderIcon("file")}</div>
              <h3 className="text-lg font-medium mb-2">Aucun dossier médical</h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Vous n'avez pas encore ajouté de dossier médical.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 bg-[#f05050] text-white px-4 py-2 rounded-lg hover:bg-[#e04040] transition-colors"
              >
                Ajouter votre premier dossier
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {medicalRecords.map((record) => (
                <li key={record.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center text-white ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        } mr-3`}
                      >
                        {renderIcon("file")}
                      </div>
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <div className="flex items-center mr-4">
                            <span className="mr-1">{renderIcon("mail")}</span>
                            <span>{record.doctorEmail}</span>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0">
                            <span className="mr-1">{renderIcon("calendar")}</span>
                            <span>{formatDate(record.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">{renderStatusBadge(record.status)}</div>
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Supprimer"
                      >
                        {renderIcon("trash")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedRec;
