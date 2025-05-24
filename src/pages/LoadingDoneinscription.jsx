import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from '/src/assets/LDanimation.gif';

const LoadingAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/fin'); // Redirige vers la page Home après 3 secondes
    }, 4000);

    return () => clearTimeout(timer); // Nettoyage si composant démonté
  }, [navigate]);

  return (
    <div className="flex items-center justify-center fixed inset-0 white">
      <img
        src={loadingGif}
        alt="Loading Animation"
        className="w-30 h-30"
      />
    </div>
  );
};

export default LoadingAnimation;
