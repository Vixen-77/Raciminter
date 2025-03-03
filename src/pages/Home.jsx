import React from 'react';
import { Link } from 'react-router-dom';
import "@fontsource/barlow/100.css"; // Ultra Thin (100)

const Home = () => {
  return (
    <div className="">
      
      {/* Premier titre */}
      <h1 className="text-5xl font-bold mb-4 animate-fade-in" 
          style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Votre Santé, Votre Contrôle
      </h1>

      {/* Deuxième titre */}
      <h1 className="text-3xl font-semibold mb-4 animate-fade-in" 
          style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Bienvenue sur notre plateforme
      </h1>

      {/* Paragraphe */}
      <p className="text-lg mb-8 max-w-2xl text-center animate-fade-in opacity-80" 
         style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Suivez vos performances, surveillez vos statistiques vitales et prenez le contrôle 
        de votre bien-être avec notre technologie avancée.
      </p>

      {/* Image */}
      <div className="relative w-80 h-80 flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
        <img src="/images/smartwatch.png" alt="Smartwatch" className="w-full h-full object-cover rounded-2xl" />
      </div>
      {/* Bouton */}
      <Link to="/dashboard" 
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
            style={{ fontFamily: 'Barlow, sans-serif', fontWeight: '100' }}>
        Accéder au Dashboard
      </Link>

    </div>
  );
};

export default Home;
