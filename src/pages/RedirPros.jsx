"use client"

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const RedirPros = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(null);

    // Effet pour charger les données du patient depuis le localStorage
    useEffect(() => {
        const storedPatient = localStorage.getItem('currentIntervention');
        
        if (!storedPatient) {
            // Si aucune intervention n'est en cours, rediriger vers le dashboard
            navigate('/ProS');
            return;
        }
        
        const patientData = JSON.parse(storedPatient);
        setPatient(patientData);
        setLoading(false);
        
        // Enregistrer l'heure de début de l'intervention si ce n'est pas déjà fait
        const storedStartTime = localStorage.getItem('interventionStartTime');
        if (!storedStartTime) {
            const now = new Date().getTime();
            localStorage.setItem('interventionStartTime', now.toString());
            setStartTime(now);
        } else {
            setStartTime(parseInt(storedStartTime));
        }
    }, [navigate]);

    // Effet pour détecter si le mode sombre est activé
    useEffect(() => {
        const checkDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };
        
        checkDarkMode();
        
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        
        return () => observer.disconnect();
    }, []);

    // Effet pour mettre à jour le temps écoulé
    useEffect(() => {
        if (!startTime) return;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const elapsed = Math.floor((now - startTime) / 1000); // en secondes
            setElapsedTime(elapsed);
        }, 1000);
        
        return () => clearInterval(timer);
    }, [startTime]);

    // Fonction pour formater le temps écoulé
    const formatElapsedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Fonction pour annuler l'intervention
    const handleCancel = () => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cette intervention ?')) {
            localStorage.removeItem('currentIntervention');
            localStorage.removeItem('interventionStartTime');
            navigate('/ProS');
        }
    };

    // Fonction pour terminer l'intervention
    const handleComplete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir terminer cette intervention ?')) {
            // Ici, vous pourriez ajouter du code pour enregistrer l'intervention dans l'historique
            
            localStorage.removeItem('currentIntervention');
            localStorage.removeItem('interventionStartTime');
            navigate('/ProS');
        }
    };

    // Fonction pour rendre une icône simple
    const renderIcon = (name) => {
        switch(name) {
            case 'user':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
            case 'map-pin':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
            case 'phone':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
            case 'mail':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
            case 'clock':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
            case 'alert-triangle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
            case 'ruler':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><path d="M8 4v16"></path><path d="M12 4v16"></path><path d="M16 4v16"></path></svg>;
            case 'weight':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
            case 'file-text':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
            case 'activity':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
            case 'x-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
            case 'check-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f05050] mx-auto mb-4"></div>
                    <p className="text-lg">Chargement de l'intervention...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <header className="bg-[#f05050] text-white py-4 px-6 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Intervention en cours</h1>
                    <div className="flex items-center space-x-2">
                        <span className="h-5 w-5">{renderIcon('clock')}</span>
                        <span className="font-mono text-lg">{formatElapsedTime(elapsedTime)}</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-6 px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="bg-[#f05050] text-white px-6 py-4">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#f05050] font-bold text-xl mr-4">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{patient.name}</h2>
                                <div className="flex items-center mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        patient.urgency === 'Haute' 
                                            ? 'bg-red-800 text-white' 
                                            : 'bg-yellow-500 text-white'
                                    }`}>
                                        Urgence {patient.urgency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-6">
                                    <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
                                        <div className="bg-[#f05050] text-white px-4 py-2 font-semibold">
                                            Patient Information
                                        </div>
                                        <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="font-semibold">Name:</div>
                                                <div>{patient.name}</div>
                                                
                                                <div className="font-semibold">Age:</div>
                                                <div>{patient.age}</div>
                                                
                                                <div className="font-semibold">Location:</div>
                                                <div>{patient.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
                                        <div className="bg-[#f05050] text-white px-4 py-2 font-semibold">
                                            Contact Information
                                        </div>
                                        <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="font-semibold">Phone:</div>
                                                <div>{patient.phone}</div>
                                                
                                                <div className="font-semibold">Email:</div>
                                                <div>{patient.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
                                        <div className="bg-[#f05050] text-white px-4 py-2 font-semibold">
                                            Physical Attributes
                                        </div>
                                        <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="font-semibold">Height:</div>
                                                <div>{patient.height}</div>
                                                
                                                <div className="font-semibold">Weight:</div>
                                                <div>{patient.weight}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <span className="h-5 w-5 mr-2">{renderIcon('activity')}</span>
                                        Symptômes actuels
                                    </h3>
                                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <p>{patient.currentSymptoms}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
                                    <div className="bg-[#f05050] text-white px-4 py-2 font-semibold">
                                        Medical Records
                                    </div>
                                    <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                        {patient.medicalRecords.map((record, index) => (
                                            <div key={index} className={`flex justify-between py-2 ${index !== patient.medicalRecords.length - 1 ? 'border-b' : ''} ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                                                <div>{record.condition}</div>
                                                <div className="text-gray-500">{record.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Carte pour la localisation */}
                                {patient.coordinates && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                                            <span className="h-5 w-5 mr-2">{renderIcon('map-pin')}</span>
                                            Localisation du patient
                                        </h3>
                                        <div className="h-[300px] rounded-lg overflow-hidden">
                                            <MapContainer 
                                                center={patient.coordinates} 
                                                zoom={13} 
                                                style={{ height: '100%', width: '100%' }}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                />
                                                <Marker position={patient.coordinates}>
                                                    <Popup>
                                                        {patient.name}<br />
                                                        {patient.location}
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-center space-x-6">
                    <button 
                        onClick={handleCancel}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                    >
                        <span className="h-5 w-5 mr-2">{renderIcon('x-circle')}</span>
                        Annuler l'intervention
                    </button>
                    <button 
                        onClick={handleComplete}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                        <span className="h-5 w-5 mr-2">{renderIcon('check-circle')}</span>
                        Terminer l'intervention
                    </button>
                </div>
            </main>
        </div>
    );
};

export default RedirPros;