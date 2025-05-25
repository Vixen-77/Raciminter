"use client"
import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import { signupPatient } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

/* Removed duplicate default export PatientSignupDoucble */


const PatientSignup = () => {
    const navigate = useNavigate(); // ✅ ICI c’est bon : dans le corps du composant
  const [showPassword, setShowPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  const calculateAge = (birthDate ) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    if (age <= 17) return -1
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  
  const [age, setage] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const birthDate = new Date(e.target.DateOfBirth.value);
    const agee = calculateAge(birthDate);
  
    if (agee === -1) {

      return;
    }
  
    setage(agee);
    formData.append('Age',agee.toString());
    formData.append('Role', "10");
     
    try {  
      console.log(formData)
      const response = await signupPatient(formData)
      console.log(response);
      navigate('/LoadingDoneinscription'); 
    } catch (error) {
      console.error(error);
      // Optionally, show an error message to the user here
    }
   
}
  
  const handleClick = () => {
    console.log('Composant monté !');
  };
  




return (
    <div className="flex items-center justify-center pt-180 pb-16 px-4">
        <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-xl">
            {/* Left Section - Image/Banner */}
            <div className="hidden md:block w-2/5 bg-gradient-to-b from-[#F05050] to-[#D32F2F] p-12 text-white">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Welcome to E-mergency</h2>
                        <p className="text-white/90 mb-8">Create your patient account to access our services.</p>
                    </div>
                  
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-3/5 bg-white p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#F05050] mb-2">Patient Signup</h1>
                    <p className="text-gray-500">Fill out the form to create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Last Name and First Name - Highlighted at the top of the form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="LastName"
                                name="LastName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                pattern="^[^0-9]*$"
                                title="The last name must not contain numbers"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                pattern="^[^0-9]*$"
                                title="The first name must not contain numbers"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Adress" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="adress"
                            name="adress"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="PostalCode" className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="PostalCode"
                                name="PostalCode"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                pattern="^[0-9]{1,5}$"
                                title="The postal code must contain only numbers and not exceed 5 characters"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                placeholder="Ex: 06 12 34 56 78"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                pattern="^[0-9]{1,10}$"
                                title="The phone number must contain only numbers and not exceed 10 characters"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="Gender" className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                id="Gender"
                                name="Gender"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                required
                            >
                                <option value="">Select</option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="DateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="DateOfBirth"
                                name="DateOfBirth"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="Weight" className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                id="Weight"
                                name="Weight"
                                step="0.1"
                                min="0"
                                placeholder="Example: 70.5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Height" className="block text-sm font-medium text-gray-700 mb-1">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                id="Height"
                                name="Height"
                                min="0"
                                placeholder="Example: 175"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all text-black"
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
                                maxLength="16"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F05050] focus:border-transparent transition-all pr-10 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F05050] transition-colors"
                            >
                                {showPassword ? (
                              
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                   <path
                                       fillRule="evenodd"
                                       d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                       clipRule="evenodd"
                                    />
                                  </svg>
                                       ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 </svg>20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                                 
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">The password must contain at least 8 characters and at most 16 characters</p>
                    </div>
                    <div>
                        <label htmlFor="File" className="block text-sm font-medium text-gray-700 mb-1">
                            Identity Card
                        </label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#F05050] transition-colors"
                            onClick={() => fileInputRef.current.click()}
                        >
                            {previewImage ? (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={previewImage || "/placeholder.svg"}
                                        alt="Identity card preview"
                                        className="h-32 object-contain mb-2 rounded"
                                    />
                                    <p className="text-sm text-gray-500">Click to change the image</p>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 mx-auto text-gray-400 mb-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500">Click to upload your identity card</p>
                                    <p className="text-xs text-gray-400 mt-1">Accepted formats: JPG, PNG, PDF</p>
                                </div>
                            )}
                            <input
                                type="file"
                                id="File"
                                name="File"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="h-4 w-4 text-[#F05050] focus:ring-[#F05050] border-gray-300 rounded"
                required
              />

                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                        I accept the{" "}
                        <a href="#" className="text-[#F05050] hover:underline">
                            terms of use
                        </a>{" "}
                        and the{" "}
                        <a href="#" className="text-[#F05050] hover:underline">
                            privacy policy
                        </a>
                        .
                    </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#F05050] text-white font-medium rounded-lg hover:bg-[#D32F2F] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Create my account
                    </button>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        Already have an account?{" "}
                        <a href="/PatientSignin" className="text-[#F05050] hover:underline font-medium">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    </div>
)
}

export default PatientSignup







