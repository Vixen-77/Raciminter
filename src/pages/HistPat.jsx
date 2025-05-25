"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HistPat = () => {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [selectedIntervention, setSelectedIntervention] = useState(null)
  const [currentPatient, setCurrentPatient] = useState(null)

  // Fonction pour créer un professionnel de santé
  const createHealthPro = (
    name,
    lastName,
    phoneNumber,
    email,
    age,
    gender,
    profilePic,
  ) => {
    return {
      name,
      lastName,
      phoneNumber,
      email,
      age,
      gender,
      profilePic,
      fullName: `Dr. ${name} ${lastName}`,
    }
  }

  // Liste des professionnels de santé
  const healthPros = [
    createHealthPro(
      "Mezaoui",
      "Damya",
      "+33 6 12 34 56 78",
      "dr.durand@clinique.fr",
      45,
      "F",
      "",
    ),
    createHealthPro(
      "Belabbas",
      "Melinda",
      "+33 6 23 45 67 89",
      "dr.laurent@clinique.fr",
      52,
      "M",
      "",
    ),
    createHealthPro(
      "Redjah",
      "yousra sarah",
      "+33 6 34 56 78 90",
      "dr.moreau@clinique.fr",
      38,
      "F",
      "",
    ),
    createHealthPro(
      "Amrouche",
      "Racim",
      "+33 6 45 67 89 01",
      "dr.petit@clinique.fr",
      41,
      "M",
      "",
    ),
  ]

  // Simulation de l'utilisateur connecté (le patient)
  useEffect(() => {
    // Dans une application réelle, ces informations viendraient d'un système d'authentification
    const loggedInPatient = {
      id: 1,
      name: "Melinda",
      lastName: "Belabbas",
      birthDate: "2004-04-18",
      gender: "F",
      height: 1.7,  // m
      weight: 62.5, // kg
      fullName: "Melinda Belabbas",
    }
    setCurrentPatient(loggedInPatient)
  }, [])

  // Historique des interventions du patient connecté
  const [interventions] = useState([
    {
      id: 1,
      healthProIndex: 0, // Dr. Marie Durand
      date: "2023-06-15T10:30:00",
      symptoms: ["Douleur thoracique", "Essoufflement"],
      diagnosis: "Crise d'angoisse",
      treatment: "Anxiolytique prescrit: Alprazolam 0.25mg, 1 comprimé matin et soir pendant 7 jours",
      notes: "Éviter les situations stressantes, pratiquer des exercices de respiration",
      status: "completed",
      urgency: "Moyenne",
      location: "Cabinet médical, Paris",
      followUpDate: "2023-06-30T11:00:00",
    },
    {
      id: 5,
      healthProIndex: 1, // Dr. Philippe Laurent
      date: "2023-04-20T11:30:00",
      symptoms: ["Fièvre", "Toux"],
      diagnosis: "Bronchite",
      treatment: "Antibiotiques: Amoxicilline 500mg, 1 comprimé 3 fois par jour pendant 7 jours",
      notes: "Boire beaucoup d'eau, se reposer, revenir si les symptômes persistent après le traitement",
      status: "completed",
      urgency: "Moyenne",
      location: "Clinique Saint-Joseph, Paris",
      followUpDate: null,
    },
    {
      id: 8,
      healthProIndex: 2, // Dr. Isabelle Moreau
      date: "2023-02-05T14:15:00",
      symptoms: ["Difficulté à respirer", "Sifflement respiratoire"],
      diagnosis: "Crise d'asthme légère",
      treatment: "Ventoline en inhalation: 2 bouffées toutes les 4 à 6 heures selon besoin",
      notes: "Éviter les allergènes connus, garder l'inhalateur à portée de main",
      status: "completed",
      urgency: "Haute",
      location: "Urgences, Hôpital Saint-Louis, Paris",
      followUpDate: "2023-02-20T09:30:00",
    },
    {
      id: 12,
      healthProIndex: 3, // Dr. Nicolas Petit
      date: "2023-01-10T16:00:00",
      symptoms: ["Anxiété", "Troubles du sommeil"],
      diagnosis: "Trouble anxieux",
      treatment: "Thérapie cognitivo-comportementale recommandée, techniques de relaxation",
      notes: "Séances hebdomadaires pendant 2 mois, réévaluation prévue après cette période",
      status: "follow-up",
      urgency: "Basse",
      location: "Cabinet de psychiatrie, Paris",
      followUpDate: "2023-02-10T16:00:00",
    },
    {
      id: 15,
      healthProIndex: 0, // Dr. Marie Durand
      date: "2022-11-05T09:45:00",
      symptoms: ["Fatigue", "Perte d'appétit"],
      diagnosis: "Carence en fer",
      treatment: "Supplément de fer: 1 comprimé par jour pendant 3 mois",
      notes: "Alimentation riche en fer recommandée, contrôle sanguin dans 3 mois",
      status: "completed",
      urgency: "Basse",
      location: "Cabinet médical, Paris",
      followUpDate: "2023-02-05T10:00:00",
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
    if (!dateString) return "Non programmé"
    
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

  // Calcul des statistiques
  const getYearToDateCount = () => {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    return interventions.filter(i => new Date(i.date) >= startOfYear).length
  }

  const getRecentInterventionsCount = () => {
    const now = new Date()
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
    return interventions.filter(i => new Date(i.date) >= threeMonthsAgo).length
  }

  const getPendingFollowUpsCount = () => {
    const now = new Date()
    return interventions.filter(i => 
      i.status === "follow-up" && 
      i.followUpDate && 
      new Date(i.followUpDate) > now
    ).length
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
            <h1 className="text-xl font-bold">Mon historique médical</h1>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4">
        {currentPatient && (
          <>
            {/* Informations patient */}
            <div className={`mb-6 ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium text-xl">
                  {currentPatient.name.charAt(0)}
                  {currentPatient.lastName.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{currentPatient.fullName}</h2>
                  <div className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    <span className="inline-block mr-4">{calculateAge(currentPatient.birthDate)} ans</span>
                    <span className="inline-block mr-4">Genre: {currentPatient.gender === "F" ? "Femme" : "Homme"}</span>
                    <span className="inline-block mr-4">Taille: {currentPatient.height} m</span>
                    <span className="inline-block">Poids: {currentPatient.weight} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques simples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
                <h3 className="text-lg font-semibold">Consultations (année)</h3>
                <p className="text-2xl font-bold mt-2">{getYearToDateCount()}</p>
              </div>
              <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
                <h3 className="text-lg font-semibold">Consultations récentes</h3>
                <p className="text-2xl font-bold mt-2">{getRecentInterventionsCount()}</p>
                <p className="text-xs text-gray-500">3 derniers mois</p>
              </div>
              <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-4`}>
                <h3 className="text-lg font-semibold">Suivis à venir</h3>
                <p className="text-2xl font-bold mt-2">{getPendingFollowUpsCount()}</p>
              </div>
            </div>
          </>
        )}

        {/* Tableau des interventions */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead className={`${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-600"} text-left`}>
              <tr>
                <th className="px-4 py-3 text-xs font-medium uppercase">Professionnel</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Urgence</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Statut</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {interventions.map((intervention) => {
                const healthPro = healthPros[intervention.healthProIndex]
                return (
                  <tr key={intervention.id} className={`${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-medium">
                          {healthPro.name.charAt(0)}
                          {healthPro.lastName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{healthPro.fullName}</div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {healthPro.age} ans • {healthPro.gender === "F" ? "Femme" : "Homme"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(intervention.date)}</td>
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
                        className="text-[#3b82f6] hover:text-[#2563eb]"
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
                <h2 className="text-xl font-bold">Détails de la consultation</h2>
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

              {/* Informations professionnel de santé */}
              {(() => {
                const healthPro = healthPros[selectedIntervention.healthProIndex]
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Professionnel de santé</h3>
                      <div className={`${isDark ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-4`}>
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-medium text-lg mr-4">
                            {healthPro.name.charAt(0)}
                            {healthPro.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-lg">{healthPro.fullName}</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              {healthPro.age} ans • {healthPro.gender === "F" ? "Femme" : "Homme"}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Téléphone</p>
                            <p className="font-medium">{healthPro.phoneNumber}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email</p>
                            <p className="font-medium">{healthPro.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Détails de la consultation */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Détails de la consultation</h3>
                      <div className={`${isDark ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-4`}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</p>
                            <p className="font-medium">{formatDate(selectedIntervention.date)}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Lieu</p>
                            <p className="font-medium">{selectedIntervention.location}</p>
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
                          <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prochain rendez-vous</p>
                            <p className="font-medium">{formatDate(selectedIntervention.followUpDate)}</p>
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
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Traitement prescrit</p>
                          <p className="mt-1">{selectedIntervention.treatment}</p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Notes et recommandations</p>
                          <p className="mt-1">{selectedIntervention.notes}</p>
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
                  className="px-4 py-2 rounded-md bg-[#3b82f6] text-white hover:bg-[#2563eb]"
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

export default HistPat