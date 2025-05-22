"use client"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { signinPatient } from '../../services/auth';

const PatientSignin = () => {
    
   const navigate = useNavigate(); // ✅ Doit être ici, dans le composant
  const [showPassword, setShowPassword] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('Role', "10");
  
  try{
         
         console.log("ici")
     const response = await signinPatient(formData)
     const data = response.data; // 👈 axios retourne { data: ... }

     console.log("Réponse du back :", data);
     localStorage.setItem('user', JSON.stringify(data));
     
     alert('Succès ✅');
     navigate("/Patient");
     } catch (error) {
        if(error.status === 500){
         alert(`Erreur : mail or password incorrect`);
         console.log("erreur", error);}
         else if(error.status === 403){
            alert(`Erreur : your account is not validated yet`);
            console.log("erreur", error);}
     }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-xl">
            {/* Section gauche - Image/Bannière */}
            <div className="hidden md:block w-2/5 bg-gradient-to-b from-[#F05050] to-[#D32F2F] p-12 text-white">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Welcome to E-mergency</h2>
                        <p className="text-white/90 mb-8">
                            Create your patient account to access our services.
                        </p>
                    </div>
               
                </div>
            </div>

            {/* Section droite - Formulaire */}
            <div className="w-full md:w-3/5 bg-white p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#F05050] mb-2">Sign in as a patient</h1>
                    <p className="text-gray-500">Enter your details to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                   

                   

                 

                    <div className="grid grid-cols-1  gap-5">
                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all"
                                required
                            />
                        </div>
                         </div>

                
                    <div>
                        <label htmlFor="PasswordHash" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="PasswordHash"
                                name="PasswordHash"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F05050] transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                    </div>

                    

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#F05050] text-white font-medium rounded-lg hover:bg-[#D32F2F] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Sign in
                    </button>
                    <a href="/Patient" className="text-[#F05050] hover:underline font-medium">
                        Launch patient
                    </a>
                </form>

              
            </div>
        </div>
    </div>
)
}

export default PatientSignin
