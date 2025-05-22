"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Correction pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Icônes personnalisées pour les alertes
const alertIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Composant pour centrer la carte sur la position de l'administrateur
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const map = useMap()

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 13 })
    
    map.on('locationfound', (e) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 13)
    })
    
    map.on('locationerror', (e) => {
      console.log('Erreur de localisation:', e.message)
      setLocationError(e.message)
      // Centrer sur Paris par défaut en cas d'erreur
      map.flyTo([48.8566, 2.3522], 13)
    })
    
    return () => {
      map.off('locationfound')
      map.off('locationerror')
    }
  }, [map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Votre position (Admin) <br />
        Latitude: {position.lat.toFixed(4)}, Longitude: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  )
}

// Fonction pour créer un patient
const createPatient = (
  firstname,
  lastname,
  dateOfBirth,
  gender,
  height,
  weight,
  address,
  postalCode,
  phoneNumber,
  email,
  password,
  imageFile
) => {
  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime()
    const ageDate = new Date(diff)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return {
    firstname,
    lastname,
    dateOfBirth,
    age: calculateAge(dateOfBirth),
    gender: gender === true ? "male" : gender === false ? "female" : gender,
    height: parseFloat(height),
    weight: parseFloat(weight),
    address,
    postalCode,
    phoneNumber,
    email,
    password,
    image: imageFile, 
  }
}

// Création de plusieurs patients
const patients = [
  createPatient(
    "Melinda",
    "Belabbas",
    "2004-04-18",
    false,
    1.70,                     
    62.5,                     
    "123 Rue des Lilas, Paris",
    "75015",
    "+33 6 12 34 56 78",
    "melinda.bananini@email.com",
    "superSecure123",
    ""   
  ),
  createPatient(
    "Thomas",
    "Dubois",
    "1985-09-22",
    true,
    1.82,                     
    78.3,                     
    "45 Avenue Victor Hugo, Paris",
    "75016",
    "+33 6 98 76 54 32",
    "thomas.dubois@email.com",
    "password456",
    ""   
  ),
  createPatient(
    "Sophia",
    "Martin",
    "1992-03-15",
    false,
    1.65,                     
    58.0,                     
    "78 Boulevard Saint-Germain, Paris",
    "75006",
    "+33 6 23 45 67 89",
    "sophie.martin@email.com",
    "securePass789",
    ""   
  )
]

const Admin = () => {
  // État pour les alertes des utilisateurs
  const [alerts, setAlerts] = useState([])
  // État pour l'alerte sélectionnée
  const [selectedAlert, setSelectedAlert] = useState(null)
  // État pour les statistiques
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedAlerts: 0,
    pendingVerifications: 0
  })

  // Charger des données d'exemple au démarrage
  useEffect(() => {
    // Créer des alertes basées sur les patients
    const exampleAlerts = [
      {
      id: "ALERT001",
      userId: "USR123",
      patient: patients[0], // Melinda
      status: "active",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      location: {
        latitude: 36.7372,
        longitude: 3.0863,
        address: patients[0].address
      },
      description: "Douleur thoracique intense",
      urgencyLevel: "high"
      },
      {
      id: "ALERT002",
      userId: "USR456",
      patient: patients[1], // Thomas
      status: "active",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      location: {
        latitude: 36.7525,
        longitude: 3.0419,
        address: patients[1].address
      },
      description: "Difficulté à respirer",
      urgencyLevel: "medium"
      },
      {
      id: "ALERT003",
      userId: "USR789",
      patient: patients[2], // Sophie
      status: "resolved",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      location: {
        latitude: 36.7642,
        longitude: 3.0588,
        address: patients[2].address
      },
      description: "Fracture possible au bras",
      urgencyLevel: "low"
      },
    ]

    setAlerts(exampleAlerts)
    
    // Mettre à jour les statistiques
    setStats({
      totalAlerts: exampleAlerts.length,
      activeAlerts: exampleAlerts.filter(a => a.status === "active").length,
      resolvedAlerts: exampleAlerts.filter(a => a.status === "resolved").length,
      pendingVerifications: 12 // Nombre fictif pour l'exemple
    })
  }, [])

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Obtenir la classe de badge en fonction du niveau d'urgence
  const getUrgencyBadgeClass = (level) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Traduire le niveau d'urgence
  const translateUrgencyLevel = (level) => {
    switch (level) {
      case "high":
        return "Élevée"
      case "medium":
        return "Moyenne"
      case "low":
        return "Faible"
      default:
        return "Inconnue"
    }
  }

  // Marquer une alerte comme résolue
  const resolveAlert = (alertId) => {
    if (window.confirm("Êtes-vous sûr de vouloir marquer cette alerte comme résolue ?")) {
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "resolved" } 
          : alert
      ))
      
      // Mettre à jour les statistiques
      setStats(prev => ({
        ...prev,
        activeAlerts: prev.activeAlerts - 1,
        resolvedAlerts: prev.resolvedAlerts + 1
      }))
      
      // Désélectionner l'alerte si elle était sélectionnée
      if (selectedAlert && selectedAlert.id === alertId) {
        setSelectedAlert(null)
      }
    }
  }

  // Obtenir le nom complet du patient
  const getPatientFullName = (patient) => {
    return `${patient.firstname} ${patient.lastname}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord Administrateur</h1>

      {/* Cartes de statistiques */}
      

      {/* Onglets de navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button className="px-6 py-3 font-medium text-[#F05050] border-b-2 border-[#F05050]">
            Alertes
          </button>
          <Link to="/verifpat" className="px-6 py-3 font-medium text-gray-600 hover:text-[#F05050]">
            Vérifier comptes patients
          </Link>
          <Link to="/verifpro" className="px-6 py-3 font-medium text-gray-600 hover:text-[#F05050]">
            Vérifier comptes professionnels
          </Link>
          <Link to="/Moderation" className="px-6 py-3 font-medium text-gray-600 hover:text-[#F05050]">
            Modération
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section carte */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Carte des alertes</h2>

          {/* Conteneur de carte avec hauteur fixe */}
          <div className="h-[500px] rounded-lg overflow-hidden border border-gray-300">
            <MapContainer 
              center={[48.8566, 2.3522]} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Composant qui gère la localisation de l'administrateur */}
              <LocationMarker />

              {/* Marqueurs pour chaque alerte */}
              {alerts.map((alert) => (
                <Marker 
                  key={alert.id} 
                  position={[alert.location.latitude, alert.location.longitude]}
                  icon={alertIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedAlert(alert)
                    }
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold text-[#F05050]">{getPatientFullName(alert.patient)}</h3>
                      <p className="mb-1">{alert.description}</p>
                      <p className="text-xs text-gray-600">{formatDate(alert.timestamp)}</p>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyBadgeClass(alert.urgencyLevel)}`}>
                          Urgence: {translateUrgencyLevel(alert.urgencyLevel)}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedAlert(alert)}
                        className="mt-2 w-full text-center px-2 py-1 bg-[#F05050] text-white rounded-md text-xs hover:bg-[#D32F2F]"
                      >
                        Voir détails
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Section détails de l'alerte */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedAlert ? "Détails de l'alerte" : "Liste des alertes"}
          </h2>

          {selectedAlert ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{getPatientFullName(selectedAlert.patient)}</h3>
                  <p className="text-sm text-gray-600">ID: {selectedAlert.userId}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedAlert.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {selectedAlert.status === "active" ? "Active" : "Résolue"}
                </span>
              </div>
              
              {/* Informations du patient */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Informations du patient</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Âge:</p>
                    <p>{selectedAlert.patient.age} ans</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Genre:</p>
                    <p>{selectedAlert.patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Taille:</p>
                    <p>{selectedAlert.patient.height} m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Poids:</p>
                    <p>{selectedAlert.patient.weight} kg</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Téléphone:</p>
                    <p>{selectedAlert.patient.phoneNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Email:</p>
                    <p>{selectedAlert.patient.email}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Description de l'alerte</h4>
                <p>{selectedAlert.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Niveau d'urgence</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyBadgeClass(selectedAlert.urgencyLevel)}`}>
                  {translateUrgencyLevel(selectedAlert.urgencyLevel)}
                </span>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Localisation</h4>
                <p className="text-sm">{selectedAlert.location.address}</p>
                <p className="text-xs text-gray-500">
                  Lat: {selectedAlert.location.latitude.toFixed(4)}, 
                  Long: {selectedAlert.location.longitude.toFixed(4)}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Horodatage</h4>
                <p className="text-sm">{formatDate(selectedAlert.timestamp)}</p>
              </div>
              
              <div className="pt-4 flex space-x-2">
                {selectedAlert.status === "active" && (
                  <button 
                    onClick={() => resolveAlert(selectedAlert.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Marquer comme résolue
                  </button>
                )}
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Retour à la liste
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {alerts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune alerte enregistrée</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border border-gray-200 rounded-md p-3 ${
                      alert.status === "active" ? "bg-red-50" : "bg-gray-50"
                    } cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{getPatientFullName(alert.patient)}</div>
                        <div className="text-sm text-gray-600">{alert.description}</div>
                        <div className="text-xs text-gray-500">{formatDate(alert.timestamp)}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs px-2 py-1 rounded-full mb-1 ${
                          alert.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {alert.status === "active" ? "Active" : "Résolue"}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyBadgeClass(alert.urgencyLevel)}`}>
                          {translateUrgencyLevel(alert.urgencyLevel)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin