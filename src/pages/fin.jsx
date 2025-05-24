import React from 'react';

export default function SignupConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Illustration */}
      <div className="w-64 mb-6">
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="256" cy="256" r="256" fill="#e63946" />
          <path
            d="M379 196L229 346l-96-96"
            stroke="#fff"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-[#e63946] mb-4">
        Compte enregistré avec succès !
      </h1>

      {/* Message */}
      <p className="text-center text-gray-700 max-w-md text-lg">
        Votre demande d'inscription a bien été envoyée pour étude. <br />
        Nous vous informerons du résultat par email une fois la validation terminée.
      </p>
    </div>
  );
}
