import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr"
import montreImage from "../assets/montretest.png";
import cgmImage from "../assets/cgmrouge.png";
import voitureImage from "../assets/voiturerouge.png";
import telImage from "../assets/tel.png";
import axios from 'axios';


const Patient = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Données dans localStorage :", storedUser);
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log("User récupéré :", userData);
          setUser(userData);
        } else {
          window.location.href = "/PatientSignin";
        }
    }, []);

    // Navigation item click handler
    const handleNavClick = (item) => {
        setActiveItem(item);
        setIsMobileMenuOpen(false);
        
        // Navigation logic
        switch(item) {
            case 'account':
                navigate('/AccountSettings');
                break;
            case 'help':
                navigate('/help');
                break;
            case 'history':
                navigate('/HistPat');
                break;
            case 'listproches':
                navigate('/ListProches');
                break;
            case 'medrec':
                navigate('/MedRec');
                break;
           /* case 'logout':
                // Implement logout logic
                console.log('Logging out...');
                break;*/
            default:
                // Just update the active state for other items
                break;
        }
    };






 const handleLogoutClick = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.warn("Aucun utilisateur connecté.");
      return;
    }
    const user = JSON.parse(storedUser);

    const formData = new FormData();
    formData.append("Id", user.result.uid);
    formData.append("Role", 10); // "10" pour patient, "20" pour pro

    try {
      const response = await axios.post("http://192.168.1.5:5001/api/auth/Logout", formData);
      console.log(response.data); // "Déconnexion réussie."

      // Nettoyage local
      localStorage.removeItem("user");

      // Redirection
      navigate("/Loading"); // Route de connexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };





 




















    // Données simplifiées pour les statistiques - uniquement signes vitaux
    const stats = [
        { label: 'Vital Signs', value: 'Normal', icon: 'activity', color: 'bg-green-100 text-green-600' },
    ];

    // Données simplifiées pour les cartes - avec toutes les images
    const cards = [
        { image: montreImage, title: "Montre" },
        { image: cgmImage, title: "CGM" },
        { image: voitureImage, title: "Voiture" },
        { image: telImage, title: "Téléphone" }
    ];

    // Fonction pour rendre une icône simple
    const renderIcon = (name) => {
        switch(name) {
            case 'user':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
            case 'settings':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
            case 'file-edit':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
            case 'history':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
            case 'help-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
            case 'log-out':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
            case 'bell':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
            case 'activity':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
            case 'chevron-right':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
            case 'menu':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
            case 'x':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
            case 'home':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
            default:
                return null;
        }
    };
    
    if (!user) {
        return <p>Chargement...</p>;
    }
    
    console.log("Nom du patient:", user.result.name);
    
    return (
        <div className={`flex flex-col md:flex-row h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Mobile Header */}
            <div className={`md:hidden flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mr-3"
                    >
                        {isMobileMenuOpen ? renderIcon('x') : renderIcon('menu')}
                    </button>
                    <h2 className="text-xl font-semibold">E-mergency</h2>
                </div>
                <div className="flex items-center">
                    <button className="relative p-2">
                        {renderIcon('bell')}
                        {notifications > 0 && (
                            <span className="absolute top-1 right-1 bg-[#f05050] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notifications}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Vertical Menu - Desktop - Amélioré */}
            <div className={`hidden md:flex flex-col w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg h-full`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#f05050] flex items-center justify-center text-white font-bold mr-3">
                        E
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">E-mergency</h2>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Patient Portal</p>
                    </div>
                </div>
                
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium text-lg">
                            {user.result.name.charAt(0)}   {user.result.lastName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-medium"> {user.result.name}</h3>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.result.lastName}</p>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-1 py-6 px-3">
                    <ul className="space-y-2">
                        <li>
                            <button 
                                onClick={() => handleNavClick('dashboard')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'dashboard' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('home')}</span>
                                <span className="font-medium">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('account')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'account' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('settings')}</span>
                                <span className="font-medium">Settings</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('listproches')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'user' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('user')}</span>
                                <span className="font-medium">Relatives</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('medrec')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'activity' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('activity')}</span>
                                <span className="font-medium">Medical Records</span>
                            </button>
                        </li>
                      
                        <li>
                            <button 
                                onClick={() => handleNavClick('history')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'history' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('history')}</span>
                                <span className="font-medium">History</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('help')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'help' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('help-circle')}</span>
                                <span className="font-medium">Help</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => handleLogoutClick()}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
                            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-all duration-200`}
                    >
                        <span className="mr-2 h-5 w-5">{renderIcon('log-out')}</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu - Slide in */}
            {isMobileMenuOpen && (
                <div className={`md:hidden fixed inset-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-black/50'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div 
                        className={`w-64 h-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg transform transition-transform duration-300 ease-in-out`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-[#f05050] flex items-center justify-center text-white font-bold mr-2">
                                        E
                                    </div>
                                    <h2 className="text-lg font-bold">E-mergency</h2>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    {renderIcon('x')}
                                </button>
                            </div>
                        </div>
                        
                        <nav className="mt-4 px-3">
                            <ul className="space-y-2">
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('dashboard')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'dashboard' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('home')}</span>
                                        <span className="font-medium">Dashboard</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('account')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'account' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('settings')}</span>
                                        <span className="font-medium">Settings</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('personal')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'personal' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('file-edit')}</span>
                                        <span className="font-medium">Profile</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('listproches')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'user' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('user')}</span>
                                        <span className="font-medium">Relatives</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('history')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'history' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('history')}</span>
                                        <span className="font-medium">History</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('help')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'help' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('help-circle')}</span>
                                        <span className="font-medium">Help</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('logout')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'logout' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('log-out')}</span>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
                        
            {/* Main Content */}
            <div className="flex-1 overflow-auto"> 
                <div className="p-6 mt-10">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold mb-6">Welcome, {user.result.name} {user.result.lastName}</h2>
                        
                        {/* Feature Cards - Using actual img elements instead of background-image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {cards.map((card, index) => (
                                <div 
                                    key={index} 
                                    className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-md overflow-hidden transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer h-64`}
                                >
                                    <div className="h-full w-full relative">
                                        <img 
                                            src={card.image || "/placeholder.svg"} 
                                            alt={card.title || `Image ${index + 1}`}
                                            className="w-full h-full object-contain p-4"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient;