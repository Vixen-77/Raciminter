import React, { useState, useEffect } from 'react';

const AccountSettings = ({ isDark }) => {
    const [activeTab, setActiveTab] = useState('profile');
    
    // États pour les différentes sections
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890'
    });
    
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    // Gestionnaires de changement
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };
    
    const handleSecurityChange = (e) => {
        const { name, value } = e.target;
        setSecurityData({
            ...securityData,
            [name]: value
        });
    };
    
    // Gestionnaires de soumission
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profileData);
        alert('Profile updated successfully!');
    };
    
    const handleSecuritySubmit = (e) => {
        e.preventDefault();
        console.log('Security settings updated:', securityData);
        alert('Password changed successfully!');
        setSecurityData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };
    
    return (
        <div className={`min-h-screen p-4 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
            <div className="max-w-3xl mx-auto">
                <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Paramètres du compte</h1>
                
                {/* Onglets de navigation */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-t-lg shadow border-b flex mb-0`}>
                    <button 
                        className={`px-6 py-3 font-medium transition-colors duration-200 ${
                            activeTab === 'profile' 
                                ? 'border-b-2 border-[#F05050] text-[#F05050]' 
                                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profil
                    </button>
                    <button 
                        className={`px-6 py-3 font-medium transition-colors duration-200 ${
                            activeTab === 'security' 
                                ? 'border-b-2 border-[#F05050] text-[#F05050]' 
                                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab('security')}
                    >
                        Sécurité
                    </button>
                    <button 
                        className={`px-6 py-3 font-medium transition-colors duration-200 ${
                            activeTab === 'notifications' 
                                ? 'border-b-2 border-[#F05050] text-[#F05050]' 
                                : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                </div>
                
                {/* Contenu des onglets */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-b-lg shadow p-6`}>
                    {/* Onglet Profil */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Nom complet</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Adresse email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Numéro de téléphone</label>
                                <input 
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                            >
                                Enregistrer les modifications
                            </button>
                        </form>
                    )}
                    
                    {/* Onglet Sécurité */}
                    {activeTab === 'security' && (
                        <form onSubmit={handleSecuritySubmit} className="space-y-4">
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Mot de passe actuel</label>
                                <input 
                                    type="password"
                                    name="currentPassword"
                                    value={securityData.currentPassword}
                                    onChange={handleSecurityChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Nouveau mot de passe</label>
                                <input 
                                    type="password"
                                    name="newPassword"
                                    value={securityData.newPassword}
                                    onChange={handleSecurityChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <div>
                                <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Confirmer le nouveau mot de passe</label>
                                <input 
                                    type="password"
                                    name="confirmPassword"
                                    value={securityData.confirmPassword}
                                    onChange={handleSecurityChange}
                                    className={`w-full p-2 rounded border ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300'
                                    } focus:ring-2 focus:ring-[#F05050] focus:border-transparent outline-none transition-colors duration-200`}
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                            >
                                Changer le mot de passe
                            </button>
                        </form>
                    )}
                    
                    {/* Onglet Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 mr-2 text-[#F05050] focus:ring-[#F05050] rounded transition-colors duration-200"
                                        defaultChecked
                                    />
                                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Notifications par email</span>
                                </label>
                                <p className={`text-sm mt-1 ml-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Recevoir des emails concernant votre activité et vos rendez-vous
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 mr-2 text-[#F05050] focus:ring-[#F05050] rounded transition-colors duration-200"
                                    />
                                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Notifications SMS</span>
                                </label>
                                <p className={`text-sm mt-1 ml-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Recevoir des SMS pour les rappels de rendez-vous
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 mr-2 text-[#F05050] focus:ring-[#F05050] rounded transition-colors duration-200"
                                        defaultChecked
                                    />
                                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Communications marketing</span>
                                </label>
                                <p className={`text-sm mt-1 ml-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Recevoir des mises à jour sur les nouvelles fonctionnalités et promotions
                                </p>
                            </div>
                            
                            <button 
                                className="px-4 py-2 bg-[#F05050] text-white font-medium rounded hover:bg-[#e04040] transition-colors duration-200"
                            >
                                Enregistrer les préférences
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;