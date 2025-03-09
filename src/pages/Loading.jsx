import React from 'react';
import loadingGif from '/src/assets/LDanimation.gif'; // Importation de l'image

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 white">
      <img
        src={loadingGif}  // Utilise la variable d'importation
        alt="Loading Animation"
        className="w-30 h-30"  // Ajuste la taille selon tes besoins
      />
    </div>
  );
};

export default LoadingAnimation;
