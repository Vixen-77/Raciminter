import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "@fontsource/barlow/100.css"; // Ultra Thin (100)
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null); // Stocker les données de l'API
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  useEffect(() => {
    //  l'URL par celle de ton API ASP.NET
    axios.get("http://localhost:5002/api/test/json") 
      .then((response) => {
        setData(response.data); // Stocker les données reçues
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
   
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black-900 text-white">
      
      <h1 className="text-5xl font-bold mb-4 animate-fade-in" 
          style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Votre Santé, Votre Contrôle
      </h1>

      <h1 className="text-3xl font-semibold mb-4 animate-fade-in" 
          style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Bienvenue sur notre plateforme
      </h1>

      <p className="text-lg mb-8 max-w-2xl text-center animate-fade-in opacity-80" 
         style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Suivez vos performances, surveillez vos statistiques vitales et prenez le contrôle 
        de votre bien-être avec notre technologie avancée.
      </p>

      {/* Affichage des données de l'API */}
      {loading ? (
        <p>Chargement des données...</p>
      ) : error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Données reçues :</h2>
          <pre className="text-green-400">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <Link to="/dashboard" 
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
            style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Accéder au Dashboard
      </Link>
    </div>
  );
};

export default Home;
