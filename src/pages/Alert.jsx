"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Alerts = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("taken-care")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
    } else {
      navigate("/PatientSignin")
    }
  }, [navigate])

  // Données pour "Taken Care Of" - mes alertes
  const takenCareAlerts = [
    {
      id: 1,
      type: "Cardiovascular Anomaly",
      time: "23 minutes ago",
      color: "bg-red-500",
    },
    {
      id: 2,
      type: "Hypoglycemia",
      time: "about 3 hours ago",
      color: "bg-orange-500",
    },
    {
      id: 3,
      type: "Cardiovascular Anomaly",
      time: "about 1 hour ago",
      color: "bg-red-500",
    },
  ]

  // Données pour "Others" - alertes aux alentours
  const othersAlerts = [
    {
      id: 4,
      type: "Emergency Alert",
      location: "16045, Hydra",
      
      color: "bg-red-500",
    },
    {
      id: 5,
      type: "Medical Assistance",
      location: "Rue Didouche Mourad, 16000, Alger",
    
      color: "bg-yellow-500",
    },
  ]

  const renderIcon = (name) => {
    switch (name) {
      case "arrow-left":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        )
      default:
        return null
    }
  }

  if (!user) {
    return <p>Chargement...</p>
  }

  const currentAlerts = activeTab === "taken-care" ? takenCareAlerts : othersAlerts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/Patient")}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {renderIcon("arrow-left")}
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <h1 className="text-xl font-bold"> Alertes</h1>
                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark mode toggle button can be added here if needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab("taken-care")}
            className={`pb-2 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "taken-care"
                ? "text-red-400 border-red-400"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            Mine
          </button>
          <button
            onClick={() => setActiveTab("others")}
            className={`pb-2 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "others"
                ? "text-red-400 border-red-400"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            Others
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {currentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                {/* Colored dot */}
                <div className={`w-3 h-3 rounded-full ${alert.color} mt-2 flex-shrink-0`}></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{alert.type}</h3>
                      <p className="text-gray-600 text-sm">
                        {alert.location && `Location: ${alert.location}`}
                        {alert.patient && `Patient: ${alert.patient}`}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm ml-4 flex-shrink-0">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {currentAlerts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Aucune notification</div>
            <div className="text-gray-500 text-sm">
              {activeTab === "taken-care"
                ? "Aucune alerte prise en charge pour le moment"
                : "Aucune alerte des autres patients dans votre zone"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alerts  
