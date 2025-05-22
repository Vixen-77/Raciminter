import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Moderation = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('patients');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDark, setIsDark] = useState(false);
    const [patients, setPatients] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [banReason, setBanReason] = useState('');
    const [admin, setAdmin] = useState(null);

    // Charger les données de l'administrateur et des utilisateurs
    useEffect(() => {
        // Vérifier si l'utilisateur est un administrateur
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        } else {
            // Rediriger si non admin
            window.location.href = "/AdminLogin";
            return;
        }

        // Charger les patients (données fictives)
        const samplePatients = [
            { id: 1, name: 'Jean', lastName: 'Dupont', email: 'jean.dupont@example.com', status: 'active', registeredDate: '2023-01-15' },
            { id: 2, name: 'Marie', lastName: 'Martin', email: 'marie.martin@example.com', status: 'active', registeredDate: '2023-02-20' },
            { id: 3, name: 'Pierre', lastName: 'Durand', email: 'pierre.durand@example.com', status: 'suspended', registeredDate: '2023-03-10', suspensionReason: 'Comportement inapproprié' },
            { id: 4, name: 'Sophie', lastName: 'Lefebvre', email: 'sophie.lefebvre@example.com', status: 'active', registeredDate: '2023-04-05' },
            { id: 5, name: 'Thomas', lastName: 'Moreau', email: 'thomas.moreau@example.com', status: 'active', registeredDate: '2023-05-12' },
        ];
        setPatients(samplePatients);

        // Charger les professionnels (données fictives)
        const sampleProfessionals = [
            { id: 1, name: 'Dr. Robert', lastName: 'Petit', email: 'dr.petit@example.com', specialty: 'Cardiologue', status: 'active', registeredDate: '2023-01-10' },
            { id: 2, name: 'Dr. Claire', lastName: 'Dubois', email: 'claire.dubois@example.com', specialty: 'Pédiatre', status: 'suspended', registeredDate: '2023-02-15', suspensionReason: 'Informations incorrectes' },
            { id: 3, name: 'Dr. Michel', lastName: 'Bernard', email: 'michel.bernard@example.com', specialty: 'Généraliste', status: 'active', registeredDate: '2023-03-20' },
            { id: 4, name: 'Dr. Isabelle', lastName: 'Thomas', email: 'isabelle.thomas@example.com', specialty: 'Dermatologue', status: 'active', registeredDate: '2023-04-25' },
            { id: 5, name: 'Dr. Philippe', lastName: 'Richard', email: 'philippe.richard@example.com', specialty: 'Neurologue', status: 'active', registeredDate: '2023-05-30' },
        ];
        setProfessionals(sampleProfessionals);
    }, []);

    // Filtrer les utilisateurs en fonction du terme de recherche
    const filteredUsers = activeTab === 'patients' 
        ? patients.filter(patient => {
            const fullName = `${patient.name} ${patient.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase()) || 
                   patient.email.toLowerCase().includes(searchTerm.toLowerCase());
        })
        : professionals.filter(pro => {
            const fullName = `${pro.name} ${pro.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase()) || 
                   pro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   pro.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        });

    // Gérer la suspension d'un utilisateur
    const handleSuspendUser = (user) => {
        setSelectedUser(user);
        setBanReason('');
        setIsModalOpen(true);
    };

    // Gérer la levée de suspension d'un utilisateur
    const handleUnsuspendUser = (user) => {
        if (activeTab === 'patients') {
            const updatedPatients = patients.map(p => 
                p.id === user.id ? { ...p, status: 'active', suspensionReason: null } : p
            );
            setPatients(updatedPatients);
        } else {
            const updatedProfessionals = professionals.map(p => 
                p.id === user.id ? { ...p, status: 'active', suspensionReason: null } : p
            );
            setProfessionals(updatedProfessionals);
        }
    };

    // Confirmer la suspension
    const confirmSuspension = () => {
        if (!banReason.trim()) {
            alert("Veuillez fournir une raison pour la suspension");
            return;
        }

        if (activeTab === 'patients') {
            const updatedPatients = patients.map(p => 
                p.id === selectedUser.id ? { ...p, status: 'suspended', suspensionReason: banReason } : p
            );
            setPatients(updatedPatients);
        } else {
            const updatedProfessionals = professionals.map(p => 
                p.id === selectedUser.id ? { ...p, status: 'suspended', suspensionReason: banReason } : p
            );
            setProfessionals(updatedProfessionals);
        }

        setIsModalOpen(false);
        setSelectedUser(null);
        setBanReason('');
    };

    // Formater la date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Rendu des icônes
    const renderIcon = (name) => {
        switch(name) {
            case 'search':
                return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
            case 'ban':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>;
            case 'check':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
            case 'user':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
            case 'users':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            case 'briefcase':
                return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
            case 'calendar':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
            case 'mail':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
            case 'x':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
            case 'alert-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
            default:
                return null;
        }
    };

    if (!admin) {
        return <p>Chargement...</p>;
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Header */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Panneau de Modération</h1>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Connecté en tant qu'administrateur
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                    <button
                        className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                            activeTab === 'patients'
                                ? `border-b-2 border-[#f05050] ${isDark ? 'text-white' : 'text-gray-900'}`
                                : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab('patients')}
                    >
                        <div className="flex items-center">
                            <span className="mr-2">{renderIcon('users')}</span>
                            <span>Modérer Patients</span>
                        </div>
                    </button>
                    <button
                        className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                            activeTab === 'professionals'
                                ? `border-b-2 border-[#f05050] ${isDark ? 'text-white' : 'text-gray-900'}`
                                : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab('professionals')}
                    >
                        <div className="flex items-center">
                            <span className="mr-2">{renderIcon('briefcase')}</span>
                            <span>Modérer Professionnels</span>
                        </div>
                    </button>
                </div>

                {/* Search Bar */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {renderIcon('search')}
                        </div>
                        <input
                            type="text"
                            placeholder={`Rechercher un ${activeTab === 'patients' ? 'patient' : 'professionnel'}...`}
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

                {/* Users List */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                    {filteredUsers.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm ? `Aucun ${activeTab === 'patients' ? 'patient' : 'professionnel'} trouvé` : `Aucun ${activeTab === 'patients' ? 'patient' : 'professionnel'} disponible`}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Utilisateur
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Email
                                        </th>
                                        {activeTab === 'professionals' && (
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Spécialité
                                            </th>
                                        )}
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Date d'inscription
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium">
                                                        {user.name.charAt(0)}{user.lastName.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium">{user.name} {user.lastName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{renderIcon('mail')}</span>
                                                    <span>{user.email}</span>
                                                </div>
                                            </td>
                                            {activeTab === 'professionals' && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.specialty}
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{renderIcon('calendar')}</span>
                                                    <span>{formatDate(user.registeredDate)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.status === 'active' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}>
                                                    {user.status === 'active' ? 'Actif' : 'Suspendu'}
                                                </span>
                                                {user.status === 'suspended' && (
                                                    <div className="mt-1 flex items-center text-xs text-red-500">
                                                        <span className="mr-1">{renderIcon('alert-circle')}</span>
                                                        <span>{user.suspensionReason}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.status === 'active' ? (
                                                    <button
                                                        onClick={() => handleSuspendUser(user)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                                                    >
                                                        <span className="mr-1">{renderIcon('ban')}</span>
                                                        <span>Suspendre</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUnsuspendUser(user)}
                                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 flex items-center"
                                                    >
                                                        <span className="mr-1">{renderIcon('check')}</span>
                                                        <span>Réactiver</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Suspension Modal with Blurred Background */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg w-full max-w-md mx-4`}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                                Suspendre l'utilisateur
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {renderIcon('x')}
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="mb-4">
                                Vous êtes sur le point de suspendre <strong>{selectedUser?.name} {selectedUser?.lastName}</strong>. 
                                Veuillez fournir une raison pour cette suspension.
                            </p>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Raison de la suspension</label>
                                <textarea
                                    value={banReason}
                                    onChange={(e) => setBanReason(e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-700 text-white border-gray-600' 
                                            : 'bg-white text-gray-900 border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                    placeholder="Expliquez la raison de la suspension..."
                                    rows={4}
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
                                Annuler
                            </button>
                            <button
                                onClick={confirmSuspension}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Confirmer la suspension
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Moderation;