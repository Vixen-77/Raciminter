"use client"

import { useState, useEffect } from "react"
import { Plus, File, Trash2, Mail, Calendar, Upload, X } from "lucide-react"
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

    setMedicalRecords(sampleRecords)

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
      setNewRecord({
        ...newRecord,
        file: e.target.files[0],
      })

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
        // Create FormData for file upload
        const formData = new FormData()
        formData.append("title", newRecord.title)
        formData.append("doctorEmail", newRecord.doctorEmail)
        if (newRecord.file) {
          formData.append("file", newRecord.file)
        }

        // Upload the record
        await uploadMedicalRecord(formData)

        // Create a new record
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
  const confirmDelete = async () => {
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
  }

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
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Validé
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
          En attente
        </Badge>
      )
    }
  }

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
        {/* Add Record Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
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
                    />
                  </div>
                  {errors.doctorEmail && <p className="mt-1 text-sm text-red-500">{errors.doctorEmail}</p>}
                </div>

                <div>
                  <Label htmlFor="file">Image du dossier médical</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-red-500 mb-2" />
                        <span className="text-sm font-medium">
                          {newRecord.file ? newRecord.file.name : "Cliquez pour sélectionner une image"}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG ou PDF jusqu'à 10MB</span>
                      </div>
                    </label>
                  </div>
                  {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-red-500 hover:bg-red-600">
                    Ajouter le dossier
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Medical Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Mes dossiers ({medicalRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {medicalRecords.length === 0 ? (
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
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
                  >
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Supprimer
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
