"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HistPro = () => {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [selectedIntervention, setSelectedIntervention] = useState(null)

  // Fonction pour créer un patient
  const createPatient = (
    firstName,
    lastName,
    birthDate,
    isMale,
    height,
    weight,
    address,
    postalCode,
    phone,
    email,
    password,
    profilePic,
  ) => {
    return {
      firstName,
      lastName,
      birthDate,
      isMale,
      height,
      weight,
      address,
      postalCode,
      phone,
      email,
      password,
      profilePic,
      fullName: `${firstName} ${lastName}`,
    }
  }

  // Liste des patients (basée sur l'exemple fourni)
  const patients = [
    createPatient(
      "Melinda",
      "Belabbas",
      "2004-04-18",
      false,
      1.7,
      62.5,
      "123 Rue des Lilas, Paris",
      "75015",
      "+33 6 12 34 56 78",
      "melinda.bananini@email.com",
      "superSecure123",
      "",
    ),
    createPatient(
      "Thomas",
      "Dupont",
      "1985-07-22",
      true,
      1.82,
      78.0,
      "45 Avenue Victor Hugo, Lyon",
      "69003",
      "+33 6 98 76 54 32",
      "thomas.dupont@email.com",
      "password123",
      "",
    ),
    createPatient(
      "Sophie",
      "Martin",
      "1992-11-05",
      false,
      1.65,
      58.0,
      "8 Rue de la Paix, Marseille",
      "13001",
      "+33 6 45 67 89 10",
      "sophie.martin@email.com",
      "sophie1992",
      "",
    ),
    createPatient(
      "Lucas",
      "Bernard",
      "1978-03-14",
      true,
      1.75,
      80.0,
      "27 Boulevard Haussmann, Paris",
      "75009",
      "+33 6 23 45 67 89",
      "lucas.bernard@email.com",
      "lucasB78",
      "",
    ),
  ]

  // Historique des interventions
  const [interventions] = useState([
    {
      id: 1,
      patientIndex: 0, // Melinda
      date: "2023-06-15T10:30:00",
      symptoms: ["Douleur thoracique", "Essoufflement"],
      diagnosis: "Crise d'angoisse",
      treatment: "Anxiolytique prescrit",
      status: "completed",
      urgency: "Moyenne",
    },
    {
      id: 2,
      patientIndex: 1, // Thomas
      date: "2023-06-10T14:15:00",
      symptoms: ["Douleur abdominale", "Nausées"],
      diagnosis: "Gastro-entérite",
      treatment: "Hydratation, repos",
      status: "completed",
      urgency: "Basse",
    },
    {
      id: 3,
      patientIndex: 2, // Sophie
      date: "2023-05-28T09:00:00",
      symptoms: ["Maux de tête sévères", "Sensibilité à la lumière"],
      diagnosis: "Migraine",
      treatment: "Analgésiques, repos",
      status: "completed",
      urgency: "Moyenne",
    },
    {
      id: 4,
      patientIndex: 3, // Lucas
      date: "2023-05-15T16:45:00",
      symptoms: ["Douleur au dos", "Difficulté à marcher"],
      diagnosis: "Lombalgie",
      treatment: "Anti-inflammatoires, repos",
      status: "follow-up",
      urgency: "Basse",
    },
    {
      id: 5,
      patientIndex: 0, // Melinda (deuxième intervention)
      date: "2023-04-20T11:30:00",
      symptoms: ["Fièvre", "Toux"],
      diagnosis: "Bronchite",
      treatment: "Antibiotiques",
      status: "completed",
      urgency: "Moyenne",
    },
  ])

  // Effet pour détecter si le mode sombre est activé
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      return dateString
    }
  }

  // Fonction pour calculer l'âge à partir de la date de naissance
  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  // Fonction pour obtenir la couleur en fonction de l'urgence
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Haute":
        return "bg-red-100 text-red-800"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800"
      case "Basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Terminée"
      case "referred":
        return "Référé"
      case "follow-up":
        return "Suivi prévu"
      default:
        return status
    }
  }

  // Fonction pour afficher les détails d'une intervention
  const showInterventionDetails = (intervention) => {
    setSelectedIntervention(intervention)
  }

  // Fonction pour fermer les détails
  const closeInterventionDetails = () => {
    setSelectedIntervention(null)
  }

  // Fonction pour naviguer vers la page précédente
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* En-tête */}
      <header className={`p-4 ${isDark ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="container mx-auto">
          <div className="flex items-center">
            <button
              onClick={goBack}
              className={`mr-4 p-2 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Historique des interventions</h1>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4">
        {/* Statistiques simples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
            <h3 className="text-lg font-semibold">Total des interventions</h3>
            <p className="text-2xl font-bold mt-2">{interventions.length}</p>
          </div>
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
            <h3 className="text-lg font-semibold">Patients différents</h3>
            <p className="text-2xl font-bold mt-2">{new Set(interventions.map((i) => i.patientIndex)).size}</p>
          </div>
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
            <h3 className="text-lg font-semibold">Ce mois-ci</h3>
            <p className="text-2xl font-bold mt-2">
              {
                interventions.filter((i) => {
                  const date = new Date(i.date)
                  const now = new Date()
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                }).length
              }
            </p>
          </div>
        </div>

        {/* Tableau des interventions */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead className={`${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-600"} text-left`}>
              <tr>
                <th className="px-4 py-3 text-xs font-medium uppercase">Patient</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Diagnostic</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Urgence</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Statut</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {interventions.map((intervention) => {
                const patient = patients[intervention.patientIndex]
                return (
                  <tr key={intervention.id} className={`${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium">
                          {patient.firstName.charAt(0)}
                          {patient.lastName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{patient.fullName}</div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {calculateAge(patient.birthDate)} ans
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(intervention.date)}</td>
                    <td className="px-4 py-3">{intervention.diagnosis}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(
                          intervention.urgency,
                        )}`}
                      >
                        {intervention.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          intervention.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : intervention.status === "follow-up"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {getStatusText(intervention.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => showInterventionDetails(intervention)}
                        className="text-[#f05050] hover:text-[#e04040]"
                      >
                        Voir détails
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de détails */}
      {selectedIntervention && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeInterventionDetails}></div>
          <div className={`relative ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Détails de l'intervention</h2>
                <button onClick={closeInterventionDetails} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Informations patient */}
              {(() => {
                const patient = patients[selectedIntervention.patientIndex]
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Informations patient</h3>
                      <div className={`${isDark ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-4`}>
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium text-lg mr-4">
                            {patient.firstName.charAt(0)}
                            {patient.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-lg">{patient.fullName}</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              {calculateAge(patient.birthDate)} ans • {patient.isMale ? "Homme" : "Femme"}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Téléphone</p>
                            <p className="font-medium">{patient.phone}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email</p>
                            <p className="font-medium">{patient.email}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Adresse</p>
                            <p className="font-medium">{patient.address}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Code postal</p>
                            <p className="font-medium">{patient.postalCode}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Taille</p>
                            <p className="font-medium">{patient.height} m</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Poids</p>
                            <p className="font-medium">{patient.weight} kg</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Détails de l'intervention */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Détails de l'intervention</h3>
                      <div className={`${isDark ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-4`}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</p>
                            <p className="font-medium">{formatDate(selectedIntervention.date)}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Urgence</p>
                            <p>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(
                                  selectedIntervention.urgency,
                                )}`}
                              >
                                {selectedIntervention.urgency}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Symptômes</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedIntervention.symptoms.map((symptom, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 text-sm rounded-full ${
                                  isDark ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Diagnostic</p>
                          <p className="font-medium mt-1">{selectedIntervention.diagnosis}</p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Traitement</p>
                          <p className="mt-1">{selectedIntervention.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}

              {/* Bouton de fermeture */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeInterventionDetails}
                  className="px-4 py-2 rounded-md bg-[#f05050] text-white hover:bg-[#e04040]"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HistPro


