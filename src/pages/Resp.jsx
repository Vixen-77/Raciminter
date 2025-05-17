"use client"
import { useState, useEffect, useRef } from "react"
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

// Composant pour centrer la carte sur la position de l'utilisateur
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
    })
    
    return () => {
      map.off('locationfound')
      map.off('locationerror')
    }
  }, [map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Vous êtes ici <br />
        Latitude: {position.lat.toFixed(4)}, Longitude: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  )
}

const Resp = () => {
  // État pour stocker la liste des ambulances
  const [ambulances, setAmbulances] = useState([])
  const [userLocation, setUserLocation] = useState({ lat: 48.8566, lng: 2.3522 }) // Paris par défaut
  const [locationPermission, setLocationPermission] = useState("pending")

  // État pour le formulaire d'ajout d'ambulance
  const [newAmbulance, setNewAmbulance] = useState({
    id: "",
    immatriculation: "",
    modele: "",
    statut: "disponible",
    latitude: 48.8566, // Paris par défaut
    longitude: 2.3522,
  })

  // État pour les erreurs de formulaire
  const [formError, setFormError] = useState("")

  // Charger des données d'exemple au démarrage
  useEffect(() => {
    // Simuler le chargement de données depuis une API
    const exampleAmbulances = [
      {
        id: "AMB001",
        immatriculation: "AB-123-CD",
        modele: "Mercedes Sprinter",
        statut: "disponible",
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: "AMB002",
        immatriculation: "EF-456-GH",
        modele: "Ford Transit",
        statut: "en mission",
        latitude: 48.8606,
        longitude: 2.3376,
      },
      {
        id: "AMB003",
        immatriculation: "IJ-789-KL",
        modele: "Renault Master",
        statut: "en maintenance",
        latitude: 48.8496,
        longitude: 2.364,
      },
    ]

    setAmbulances(exampleAmbulances)
  }, [])

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAmbulance({
      ...newAmbulance,
      [name]: value,
    })
  }

  // Ajouter une nouvelle ambulance
  const handleAddAmbulance = (e) => {
    e.preventDefault()

    // Validation basique
    if (!newAmbulance.id || !newAmbulance.immatriculation || !newAmbulance.modele) {
      setFormError("Tous les champs sont obligatoires")
      return
    }

    // Vérifier si l'ID existe déjà
    if (ambulances.some((amb) => amb.id === newAmbulance.id)) {
      setFormError("Cet identifiant d'ambulance existe déjà")
      return
    }

    // Ajouter la nouvelle ambulance à la liste
    setAmbulances([...ambulances, newAmbulance])

    // Réinitialiser le formulaire
    setNewAmbulance({
      id: "",
      immatriculation: "",
      modele: "",
      statut: "disponible",
      latitude: userLocation.lat,
      longitude: userLocation.lng,
    })

    setFormError("")
  }

  // Supprimer une ambulance
  const handleDeleteAmbulance = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ambulance ?")) {
      setAmbulances(ambulances.filter((ambulance) => ambulance.id !== id))
    }
  }

  // Obtenir le style de badge en fonction du statut
  const getStatusBadgeClass = (statut) => {
    switch (statut) {
      case "disponible":
        return "bg-green-100 text-green-800"
      case "en mission":
        return "bg-blue-100 text-blue-800"
      case "en maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
     
     
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord - Responsable d'hôpital</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section carte */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md pt-20 p-4">
          <h2 className="text-2xl font-bold text-[#F05050] mb-2">Carte </h2>

          {/* Conteneur de carte avec hauteur fixe */}
          <div className="h-[500px] rounded-lg overflow-hidden border border-gray-300">
            <MapContainer 
              center={[userLocation.lat, userLocation.lng]} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Composant qui gère la localisation de l'utilisateur */}
              <LocationMarker />

              {/* Marqueurs pour chaque ambulance */}
              {ambulances.map((ambulance) => (
                <Marker key={ambulance.id} position={[ambulance.latitude, ambulance.longitude]}>
                  <Popup>
                    <div>
                      <h3 className="font-bold">{ambulance.id}</h3>
                      <p>Modèle: {ambulance.modele}</p>
                      <p>Immatriculation: {ambulance.immatriculation}</p>
                      <p>Statut: {ambulance.statut}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Section gestion des ambulances */}
        <div className="bg-white rounded-lg shadow-md pt-5 p-4 mt-10">
          <h2 className="text-2xl font-bold text-[#F05050] mb-2">Gestion des ambulances</h2>

          {/* Formulaire d'ajout d'ambulance */}
          <form onSubmit={handleAddAmbulance} className="">
            <div className="space-y-4">
            <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={newAmbulance.id}
                  onChange={handleInputChange}
                  placeholder="Ex: 12345"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent"
                  required
                />
              </div>
            <div>
                <label htmlFor="immatriculation" className="block text-sm font-medium text-gray-700 mb-1">
                  Immatriculation
                </label>
                <input
                  type="text"
                  id="immatriculation"
                  name="immatriculation"
                  value={newAmbulance.immatriculation}
                  onChange={handleInputChange}
                  placeholder="Ex: AB-123-CD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="modele" className="block text-sm font-medium text-gray-700 mb-1">
                  Modèle
                </label>
                <input
                  type="text"
                  id="modele"
                  name="modele"
                  value={newAmbulance.modele}
                  onChange={handleInputChange}
                  placeholder="Ex: Mercedes Sprinter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={newAmbulance.statut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent"
                >
                  <option value="disponible">Disponible</option>
                  <option value="en mission">En mission</option>
                  <option value="en maintenance">En maintenance</option>
                </select>
              </div>

              {formError && <div className="text-red-500 text-sm">{formError}</div>}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#F05050] text-white font-medium rounded-md hover:bg-[#D32F2F] transition-colors"
              >
                Ajouter une ambulance
              </button>
            </div>
          </form>

          {/* Liste des ambulances */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Liste des ambulances</h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {ambulances.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune ambulance enregistrée</p>
              ) : (
                ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="border border-gray-200 rounded-md p-3 bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{ambulance.id}</div>
                      <div className="text-sm text-gray-600">{ambulance.modele}</div>
                      <div className="text-xs text-gray-500">{ambulance.immatriculation}</div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getStatusBadgeClass(ambulance.statut)}`}
                      >
                        {ambulance.statut}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteAmbulance(ambulance.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Supprimer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resp