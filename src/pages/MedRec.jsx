"use client"

import { useState, useEffect } from "react"
import { Plus, File, Trash2, Mail, Calendar, Upload, X, Eye, Loader2 } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/layouts/ui/button"
import { Input } from "@/components/layouts/ui/input"
import { Label } from "@/components/layouts/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/layouts/ui/card"
import { Badge } from "@/components/layouts/ui/badge"

const MedRec = () => {
  const [medicalRecords, setMedicalRecords] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

  // You'll need to get this from your authentication system
  const [patientId] = useState("123e4567-e89b-12d3-a456-426614174000") // Replace with actual patient ID

  // Form state
  const [newRecord, setNewRecord] = useState({
    title: "",
    doctorEmail: "",
    file: null,
  })

  // Error state
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")

  // Load medical records from API
  useEffect(() => {
    // Sample data for demonstration
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

    

    // Save to localStorage
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
        [name]: "",
      })
    }
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewRecord({
        ...newRecord,
        file: file,
      })

      // Create image preview if it's an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        setImagePreview(null)
      }

      // Clear error for this field
      if (errors.file) {
        setErrors({
          ...errors,
          file: "",
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

  // Upload medical record function
  const uploadMedicalRecord = async (formData) => {
    try {
      // Simulate API call - replace with actual endpoint
      console.log("Uploading medical record:", formData)

      // For demo purposes, we'll just return success
      return { success: true, message: "Record uploaded successfully" }
    } catch (error) {
      console.error("Erreur upload:", error)
      throw error
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        // Call your backend handler
        await handleUploadMedRec()

        // Create a new record for local display
        const newRecordData = {
          id: Date.now(),
          title: newRecord.title,
          doctorEmail: newRecord.doctorEmail,
          date: new Date().toISOString().split("T")[0],
          status: "pending",
          fileName: newRecord.file?.name,
        }

        // Add to state
        const updatedRecords = [...medicalRecords, newRecordData]
        setMedicalRecords(updatedRecords)

        // Save to localStorage
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
        setImagePreview(null)

        // Hide form
        setShowAddForm(false)
      } catch (error) {
        console.error("Error submitting form:", error)
      }
    }
  }

  // Handle record deletion
  const handleDeleteRecord = (id) => {
    setRecordToDelete(id)
    setIsDeleteModalOpen(true)
  }

  // Confirm deletion
 /* const confirmDelete = async () => {
    if (recordToDelete === null) return

    try {
      // Simulate API call for deletion
      console.log("Deleting record:", recordToDelete)

      // Update local state
      const updatedRecords = medicalRecords.filter((record) => record.id !== recordToDelete)
      setMedicalRecords(updatedRecords)

      // Save to localStorage
      try {
        localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
      } catch (error) {
        console.log("Erreur localStorage:", error)
      }

      // Close modal
      setIsDeleteModalOpen(false)
      setRecordToDelete(null)
    } catch (error) {
      console.error("Erreur suppression:", error)
    }
  }*/







  // Remplace ta fonction confirmDelete par celle-ci :
const confirmDelete = async () => {
  if (recordToDelete === null) return;

  try {
    setDeleting(true);
    
    // Appelle la nouvelle fonction avec l'ID spécifique
    await deleteSpecificRecord(recordToDelete);
    
  } catch (error) {
    console.error("Erreur suppression:", error);
  } finally {
    setDeleting(false);
  }
};





























  // Format date
  const formatDate = (dateString) => {
    try {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return new Date(dateString).toLocaleDateString("fr-FR", options)
    } catch (error) {
      return dateString
    }
  }

  // Render status badge
  const renderStatusBadge = (status) => {
    if (status === "validated") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Validé
        </Badge>
      )
    } else if (status === "rejected") {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Refusé
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          En attente
        </Badge>
      )
    }
  }

  //FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
  //FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:

  const handleUploadMedRec = async () => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return alert("Utilisateur non connecté")

    const user = JSON.parse(storedUser)
    const formData = new FormData()

    formData.append("ID", user.result.uid) // ID patient
    formData.append("MailMedecin", newRecord.doctorEmail) // Email du médecin
    formData.append("Title", newRecord.title) // Titre du dossier
    formData.append("file", newRecord.file) // Fichier sélectionné

    try {
      const response = await axios.post("http://192.168.1.4:5001/api/validationmail/PatientUploder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Succès :", response.data)
      alert("Dossier envoyé avec succès !")
      
       const idfDossier = response.data.idfdossier;
       if (idfDossier) {
       localStorage.setItem("idDossier", idfDossier);
       console.log("✅ idDossier enregistré :", idfDossier);

       }



      const newRecordData = {
      id: response.data, // ✅ ID du serveur, pas Date.now() !
      title: newRecord.title,
      doctorEmail: newRecord.doctorEmail,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      fileName: newRecord.file?.name,
    }
    const updatedRecords = [...medicalRecords, newRecordData]
    setMedicalRecords(updatedRecords)
    localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
    } catch (error) {
      console.error("Erreur upload :", error.response?.data || error.message)
      alert("Échec de l'envoi du dossier.")
    }
  }
   

  
   
 
const handleDeleteMedRec = async () => {
  try {
    const storedUser = localStorage.getItem("user")
    const idDossier = localStorage.getItem("idDossier") // <-- Récupère l'id du dossier à supprimer

    if (!storedUser || !idDossier) {
      console.error("Identifiants manquants (patient ou dossier).")
      alert("Suppression impossible : identifiants manquants.")
      return
    }

    const userData = JSON.parse(storedUser)

    const formData = new FormData()
    formData.append("patient", userData.result.uid)
    formData.append("idDossier", )

    const response = await axios.post("http://192.168.1.4:5001/api/validationmail/deleteListMedRec", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("✅ Dossier supprimé avec succès :", response.data)
    alert("Le dossier a été supprimé avec succès.")
    
    // Supprimer l'ID du localStorage (si utile)
    localStorage.removeItem("idDossier")
     
    // (Optionnel) recharger la liste
     setmedicalRecords(prev => prev.filter(p => p.id !== current.id));

  } catch (error) {
    if (error.response) {
      console.error("❌ Erreur serveur :", error.response.data)
      alert(`Erreur serveur : ${error.response.data.message || "inconnue"}`)
    } else {
      console.error("❌ Erreur réseau :", error.message)
      alert("Erreur de connexion au serveur.")
    }
  }
}

 


  

/*
  const ALLsuppr = async () =>{
   // localStorage.removeItem("medicalRecords");
   // localStorage.removeItem("idDossier");
   // setMedicalRecords([]);
   
   try {
    const storedUser = localStorage.getItem("user");
    const recordId= localStorage.getItem("idDossier")
    if (!storedUser || !recordId) {
      console.error("Identifiants manquants (utilisateur ou dossier).");
      alert("Suppression impossible : identifiants manquants.");
      return;
    }

    const userData = JSON.parse(storedUser);

    const formData = new FormData();
    formData.append("patient", userData.result.uid);
    formData.append("idDossier", recordId); // Utilise recordId passé en paramètre

    const response = await axios.post("http://192.168.1.4:5001/api/validationmail/deleteListMedRec", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Dossier supprimé avec succès :", response.data);
   // alert("Le dossier a été supprimé avec succès.");

    // Supprimer l'élément du localStorage "medicalRecords"
   // const storedRecords = JSON.parse(localStorage.getItem("medicalRecords")) || [];
  //  const updatedRecords = storedRecords.filter((rec) => rec.id !== recordId);
   // localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));

    // Supprimer dans l'état React
     setMedicalRecords((prev) => prev.filter((rec) => rec.id.toString() !== recordId));

    // Nettoyage localStorage
    localStorage.removeItem("idDossier");

    // Supprimer l’ID temporaire si stocké
    //localStorage.removeItem("idDossier");
  } 


  
 catch (error) {
    if (error.response) {
      console.error("❌ Erreur serveur :", error.response.data);
      alert(`Erreur serveur : ${error.response.data.message || "inconnue"}`);
    } else {
      console.error("❌ Erreur réseau :", error.message);
      alert("Erreur de connexion au serveur.");
    }
  }
 


};
*/














 const handleDeleteRecordBB = async () => {
  // Confirmation avant suppression
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce dossier médical ? Cette action est irréversible.")) {
    return;
  }

  try {
    setDeleting(true);
    
    const storedUser = localStorage.getItem("user");
    const storeIDdoc = localStorage.getItem("idDossier");
    if (!storedUser || !storeIDdoc) {
      console.error("Identifiants manquants (utilisateur ou dossier).");
      alert("Suppression impossible : identifiants manquants.");
      return;
    }

    console.log("Type de recordId:", typeof storeIDdoc);
    console.log("Valeur de recordId:", storeIDdoc);
    
    const userData = JSON.parse(storedUser);
    
    const formData = new FormData();
    formData.append("Patient", userData.result.uid);
    formData.append("IdDossier",storeIDdoc);

    const response = await axios.post("http://192.168.1.4:5001/api/validationmail/deleteListMedRec", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Dossier supprimé avec succès :", response.data);

    // Supprimer dans l'état React
    setMedicalRecords((prev) => prev.filter((rec) => rec.id !== recordId));

    // Mettre à jour le localStorage
    const storedRecords = JSON.parse(localStorage.getItem("medicalRecords") || "[]");
    const updatedRecords = storedRecords.filter((rec) => rec.id !== recordId);
    localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));

    alert("Le dossier a été supprimé avec succès.");

  } catch (error) {
    if (error.response) {
      console.error("❌ Erreur serveur :", error.response.data);
      alert(`Erreur serveur : ${error.response.data.message || "inconnue"}`);
    } else {
      console.error("❌ Erreur réseau :", error.message);
      alert("Erreur de connexion au serveur.");
    }
  } finally {
    setDeleting(false);
  }
};















   




 

  

  //FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
  //FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Mes Dossiers Médicaux</h1>
          <p className="text-gray-600 mt-2">Gérez vos dossiers médicaux et ordonnances</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* API Error Display */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{apiError}</p>
          </div>
        )}

        {/* Add Record Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={uploading}
            className={`${showAddForm ? "bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un dossier médical
              </>
            )}
          </Button>
        </div>

        {/* Add Record Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ajouter un nouveau dossier médical</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du dossier</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={newRecord.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Radiographie du genou"
                    className="mt-1"
                    disabled={uploading}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="doctorEmail">Email du médecin</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      id="doctorEmail"
                      name="doctorEmail"
                      value={newRecord.doctorEmail}
                      onChange={handleInputChange}
                      placeholder="docteur@example.com"
                      className="pl-10"
                      disabled={uploading}
                    />
                  </div>
                  {errors.doctorEmail && <p className="mt-1 text-sm text-red-500">{errors.doctorEmail}</p>}
                </div>

                <div>
                  <Label htmlFor="file">Image du dossier médical</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf"
                      disabled={uploading}
                    />

                    {/* Upload area or preview */}
                    {!imagePreview ? (
                      <label
                        htmlFor="file"
                        className={`cursor-pointer block text-center ${uploading ? "opacity-50" : ""}`}
                      >
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-red-500 mb-2" />
                          <span className="text-sm font-medium">
                            {newRecord.file ? newRecord.file.name : "Cliquez pour sélectionner une image"}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">PNG, JPG ou PDF jusqu'à 10MB</span>
                        </div>
                      </label>
                    ) : (
                      <div className="space-y-3">
                        {/* File info */}
                        <div className="text-center">
                          <span className="text-sm font-medium text-gray-700">{newRecord.file.name}</span>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG ou PDF jusqu'à 10MB</p>
                        </div>

                        {/* Image preview */}
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Aperçu du fichier"
                            className="w-full max-h-48 object-contain rounded-lg bg-gray-50 border"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="bg-white/90 hover:bg-white text-xs"
                              onClick={() => setShowImageModal(true)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Voir en grand
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="bg-white/90 hover:bg-white text-xs"
                              onClick={() => {
                                setNewRecord({ ...newRecord, file: null })
                                setImagePreview(null)
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Change file button */}
                        <div className="text-center">
                          <label htmlFor="file" className="cursor-pointer">
                            <span className="text-sm text-red-500 hover:text-red-600 underline">
                              Changer le fichier
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={uploading} className="bg-red-500 hover:bg-red-600">
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Upload en cours...
                      </>
                    ) : (
                      "Ajouter le dossier"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Medical Records List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Mes dossiers ({medicalRecords.length})</span>
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Chargement des dossiers médicaux...</p>
              </div>
            ) : medicalRecords.length === 0 ? (
              <div className="text-center py-12">
                <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dossier médical</h3>
                <p className="text-gray-500 mb-4">Vous n'avez pas encore ajouté de dossier médical.</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-red-500 hover:bg-red-600">
                  Ajouter votre premier dossier
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <File className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{record.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            <span>{record.doctorEmail}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{formatDate(record.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {renderStatusBadge(record.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                        disabled={deleting}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        {deleting && recordToDelete?.id === record.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Preview Modal */}
        {showImageModal && imagePreview && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Aperçu en grand"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={() => setShowImageModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Confirmer la suppression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Êtes-vous sûr de vouloir supprimer ce dossier médical ? Cette action est irréversible.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDeleteModalOpen(false)
                      setRecordToDelete(null)
                    }}
                    disabled={deleting}
                  >
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteRecordBB()} disabled={deleting}>
                    {deleting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Suppression...
                      </>
                    ) : (
                      "Supprimer"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedRec
