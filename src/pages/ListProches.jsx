import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 

const ListProches = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [proches, setProches] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProche, setCurrentProche] = useState(null);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [addFormData, setAddFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });


    // Load user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            
            // Load proches from localStorage or initialize empty array
            const storedProches = localStorage.getItem("proches");
            if (storedProches) {
                setProches(JSON.parse(storedProches));
            } else {
                // Sample data for demonstration
                const sampleProches = [
                    { id: 1, firstName: 'Jean', lastName: 'Dupont', phoneNumber: '0612345678' },
                    { id: 2, firstName: 'Marie', lastName: 'Martin', phoneNumber: '0687654321' },
                    { id: 3, firstName: 'Pierre', lastName: 'Durand', phoneNumber: '0698765432' }
                ];
                setProches(sampleProches);
                localStorage.setItem("proches", JSON.stringify(sampleProches));
            }
        } else {
            window.location.href = "/PatientSignin";
        }
    }, []);

    // Filter proches based on search term
    const filteredProches = proches.filter(proche => {
        const fullName = `${proche.firstName} ${proche.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) || 
               proche.phoneNumber.includes(searchTerm);
    });

    // Handle form input changes for modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form input changes for add form
    const handleAddFormInputChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({
            ...addFormData,
            [name]: value
        });
    };

    // Toggle add form visibility
    const toggleAddForm = () => {
        setIsAddFormVisible(!isAddFormVisible);
        // Reset form data when opening
        if (!isAddFormVisible) {
            setAddFormData({
                firstName: '',
                lastName: '',
                phoneNumber: ''
            });
        }
    };

    // Open modal for adding new proche
    const handleAddProche = () => {
        setCurrentProche(null);
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        });
        setIsModalOpen(true);
    };

    // Open modal for editing proche
    const handleEditProche = (proche) => {
        setCurrentProche(proche);
        setFormData({
            firstName: proche.firstName,
            lastName: proche.lastName,
            phoneNumber: proche.phoneNumber
        });
        setIsModalOpen(true);
    };




    // Open confirmation modal for deleting proche
   const handleDeleteClick = (proche) => {
    
        setCurrentProche(proche);
        setIsDeleteModalOpen(true); // Ouvre le modal de confirmation visuel (ou de feedback)

};



    // Confirm deletion of proche
    const confirmDelete = () => {
        if (currentProche) {
            const updatedProches = proches.filter(p => p.id !== currentProche.id);
            setProches(updatedProches);
            localStorage.setItem("proches", JSON.stringify(updatedProches));
            setIsDeleteModalOpen(false);
        }
    };

    // Save proche from modal (add or update)
    const handleSaveProche = () => {
        // Validate form

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        let updatedProches;
        
        if (currentProche) {
            // Update existing proche
            updatedProches = proches.map(p => 
                p.id === currentProche.id ? { ...p, ...formData } : p
            );
        } else {
            // Add new proche
            const newProche = {
                id: Date.now(), // Simple way to generate unique ID
                ...formData
            };
            updatedProches = [...proches, newProche];
        }
        
        setProches(updatedProches);
        localStorage.setItem("proches", JSON.stringify(updatedProches));
        setIsModalOpen(false);
    };

    // Save proche from add form
    const handleAddFormSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!addFormData.firstName || !addFormData.lastName || !addFormData.phoneNumber) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        // Add new proche
        const newProche = {
            id: Date.now(), // Simple way to generate unique ID
            ...addFormData
        };
        
        const updatedProches = [...proches, newProche];
        setProches(updatedProches);
        localStorage.setItem("proches", JSON.stringify(updatedProches));
        
        // Reset form and hide it
        setAddFormData({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        });
        setIsAddFormVisible(false);
    };





























                                                        //TODO:YOUSRA CODE TODO:
        //FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:                                                                  CE QUE JAI RAJOUYTERRRR
 const handleAddProcheB = async (e) => {
    e.preventDefault();

    try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            console.error("Aucun utilisateur trouvé dans localStorage");
            return;
        }

        const userData = JSON.parse(storedUser);
        const generatedID = Date.now().toString();
        const formDataToSend = new FormData();
        formDataToSend.append('ProcheID',generatedID);
        formDataToSend.append('PatientUID', userData.result.uid);
        formDataToSend.append('PhoneNumber', addFormData.phoneNumber);
        formDataToSend.append('Name', `${addFormData.firstName} ${addFormData.lastName}`);

        // DEBUG: afficher ce qu'on envoie
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post('http://192.168.1.5:5001/api/procheaddsupp/addedit', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log("Réponse du serveur :", response.data);

         const nouveauProche = {
    id: generatedID ,
    firstName: addFormData.firstName,
    lastName: addFormData.lastName,
    phoneNumber: addFormData.phoneNumber
};
    localStorage.setItem('dernierProcheAjoute', nouveauProche.id);
        // Met à jour la liste des proches
        setProches(prev => [...prev, nouveauProche]);

        // Reset form
        setAddFormData({ firstName: '', lastName: '', phoneNumber: '' });

    } catch (error) {
        console.error("Erreur lors de l'ajout du proche :", error);
    }
};

    //FIXME: /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  /FIXME:FIXME: FIXME: FIXME: FIXME: FIXME:  ce que j'ai rajouterrrrr










    const confirmDeleteSure = async () => {
    if (!currentProche || !currentProche.id) return;

    try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            console.error("Aucun utilisateur trouvé dans localStorage");
            return;
        }
        const storeProche = localStorage.getItem("dernierProcheAjoute");
        if(!storeProche){
            console.error("eeerrr");
            return;
        }
        const userData = JSON.parse(storedUser);
        const formData = new FormData();
        formData.append("PatientUID",userData.result.uid);      // Variable que tu dois avoir dans ton composant
         formData.append("ProcheID", storeProche); //

        console.log(userData.result.uid);
        console.log(currentProche.id);

        const response = await axios.post("http://192.168.1.5:5001/api/procheaddsupp/delete", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("Suppression réussie :", response.data);

        // Supprimer le proche dans l’état local
        setProches(prev => prev.filter(p => p.id !== currentProche.id));

        // Fermer le modal
        setIsDeleteModalOpen(false);
        setCurrentProche(null);

        // Tu peux aussi ajouter un toast ici si tu veux
    } catch (error) {
        console.error("Erreur suppression :", error.response?.data || error.message);
    }
};








const handleSaveProcheDone = async () => {
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
        alert("Vous aver rien changé");
        return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        alert("Utilisateur non connecté");
        return;
    }

    const userData = JSON.parse(storedUser);
    const fullName = `${formData.firstName} ${formData.lastName}`;

    const formToSend = new FormData();
    
    if (currentProche?.id) {
        formToSend.append("ProcheID", currentProche.id); // modification
    }
    
    formToSend.append("PatientUID", userData.result.uid);
    formToSend.append("Name", fullName);
    formToSend.append("PhoneNumber", formData.phoneNumber);

    try {
        const response = await axios.post("http://192.168.1.5:5001/api/procheaddsupp/addedit", formToSend, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Réponse du serveur :", response.data);

        let updatedProches;

        if (currentProche) {
            // mise à jour locale
            updatedProches = proches.map(p =>
                p.id === currentProche.id
                    ? { ...p, ...formData }
                    : p
            );
        } else {
            // nouveau proche
            const newProche = {
                id: Date.now(), // ou idéalement utiliser l'ID retourné par le backend
                ...formData
            };
            updatedProches = [...proches, newProche];
        }

        setProches(updatedProches);
        localStorage.setItem("proches", JSON.stringify(updatedProches));
        setIsModalOpen(false);
        setCurrentProche(null);
        setFormData({ firstName: "", lastName: "", phoneNumber: "" });

    } catch (error) {
        console.error("Erreur lors de l'enregistrement du proche :", error);
        alert("Erreur serveur : impossible d'enregistrer le proche.");
    }
};




































    // Go back to dashboard
    const handleBack = () => {
        navigate('/Patient');
    };

    // Render icons
    const renderIcon = (name) => {
        switch(name) {
            case 'search':
                return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
            case 'edit':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
            case 'delete':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
            case 'plus':
                return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
            case 'back':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
            case 'phone':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
            case 'user':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
            case 'x':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
            case 'chevron-down':
                return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
            case 'chevron-up':
                return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>;
            default:
                return null;
        }
    };

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Header */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <button 
                            onClick={handleBack}
                            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {renderIcon('back')}
                        </button>
                        <h1 className="text-xl font-bold">My Contacts</h1>
                    </div>
                    <button 
                        onClick={toggleAddForm}
                        className="bg-[#f05050] text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        {renderIcon(isAddFormVisible ? 'chevron-up' : 'plus')}
                        <span className="ml-2">{isAddFormVisible ? 'Close' : 'Add'}</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                {/* Add Form - Collapsible */}
                {isAddFormVisible && (
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6 transition-all duration-300`}>
                        <h2 className="text-lg font-semibold mb-4">Add a Contact</h2>
                        <form onSubmit={handleAddFormSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={addFormData.firstName}
                                        onChange={handleAddFormInputChange}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDark 
                                                ? 'bg-gray-700 text-white border-gray-600' 
                                                : 'bg-white text-gray-900 border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={addFormData.lastName}
                                        onChange={handleAddFormInputChange}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDark 
                                                ? 'bg-gray-700 text-white border-gray-600' 
                                                : 'bg-white text-gray-900 border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={addFormData.phoneNumber}
                                        onChange={handleAddFormInputChange}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDark 
                                                ? 'bg-gray-700 text-white border-gray-600' 
                                                : 'bg-white text-gray-900 border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#f05050] text-white px-4 py-2 rounded-lg hover:bg-[#e04040]"
                                    onClick={handleAddProcheB} //FIXME: appelle ta fonction au clic
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Search Bar */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {renderIcon('search')}
                        </div>
                        <input
                            type="text"
                            placeholder="Search a contact..."
                            className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                                isDark 
                                    ? 'bg-gray-700 text-white border-gray-600 focus:border-gray-500' 
                                    : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500'
                            } border focus:ring-2 focus:ring-opacity-50 focus:outline-none`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Contacts List */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                    {filteredProches.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm ? "No contact found" : "No contact added"}
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProches.map((proche) => (
                                <li key={proche.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <span className="mr-2">{renderIcon('user')}</span>
                                                <h3 className="font-medium">{proche.firstName} {proche.lastName}</h3>
                                            </div>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                <span className="mr-2">{renderIcon('phone')}</span>
                                                <p>{proche.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => handleEditProche(proche)}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                aria-label="Edit"
                                            >
                                                {renderIcon('edit')}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(proche)}
                                                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-500 transition-colors"
                                                aria-label="Delete"
                                            >
                                                {renderIcon('delete')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal with Blurred Background */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg w-full max-w-md mx-4`}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold">
                                {currentProche ? "Edit a contact" : "Add a contact"}
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {renderIcon('x')}
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-white text-gray-900 border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-white text-gray-900 border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-white text-gray-900 border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-[#f05050]`}
                                    placeholder="Phone Number"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`px-4 py-2 rounded-lg mr-2 ${
                                    isDark 
                                        ? 'bg-gray-700 hover:bg-gray-600' 
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProcheDone}
                                className="bg-[#f05050] text-white px-4 py-2 rounded-lg hover:bg-[#e04040]"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal with Blurred Background */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg w-full max-w-md mx-4`}>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="mb-4">
                                Are you sure you want to delete {currentProche?.firstName} {currentProche?.lastName} from your contacts?
                            </p>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                 onClick={() => setIsDeleteModalOpen(false)}
                                  className={`px-4 py-2 rounded-lg mr-2 ${
                                isDark 
                                   ? 'bg-gray-700 hover:bg-gray-600' 
                                   : 'bg-gray-200 hover:bg-gray-300'
    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteSure}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListProches;




//       <form onSubmit={handleAddFormSubmit}>