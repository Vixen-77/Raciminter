"use client"

import { useNavigate } from "react-router-dom"

const Features = () => {
  const navigate = useNavigate()

  const userTypes = [
    {
      icon: (
        <svg className="w-12 h-12 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 4.1 11 3 11S1 10.1 1 9V7C1 6.4 1.4 6 2 6L11 6.5V4C11 2.3 9.7 1 8 1S5 2.3 5 4V6C5 6.6 4.6 7 4 7S3 6.6 3 6V4C3 1.8 4.8 0 7 0S11 1.8 11 4V6.5L20 6C20.6 6 21 6.4 21 7V9C21 10.1 20.1 11 19 11S17 10.1 17 9ZM7.5 12C8.3 12 9 12.7 9 13.5V22H7V14H6V22H4V13.5C4 12.7 4.7 12 5.5 12H7.5ZM16.5 12C17.3 12 18 12.7 18 13.5V22H16V14H15V22H13V13.5C13 12.7 13.7 12 14.5 12H16.5Z" />
        </svg>
      ),
      title: "Patient",
      titleColor: "text-[#f05050]",
      features: ["automatic anomaly detection, leveraging advanced analytics with IOT and IA to identify unusual health patterns or potential risks", "In the event of an issue, your pre-selected close contacts are immediately alerted. This ensures your trusted network is informed and can provide support when you need it most, facilitating a coordinated response.","Medical Record Management Maintain comprehensive digital health record, including physician's orders, to ensure a detailed and traceable health history. This vital feature supports ongoing health management and provides critical information during emergencies.","Localized Hazard Alerts Stay informed with real-time alerts about local hazards and emergency situations in your vicinity. Our system keeps you updated on surrounding events, empowering you to take timely precautions and ensure your safety."],
    },
    {
      icon: (
        <svg className="w-12 h-12 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C13.1 8 14 8.9 14 10V11H16C17.1 11 18 11.9 18 13V21C18 22.1 17.1 23 16 23H8C6.9 23 6 22.1 6 21V13C6 11.9 6.9 11 8 11H10V10C10 8.9 10.9 8 12 8ZM8 13V21H16V13H8ZM11 14H13V16H15V18H13V20H11V18H9V16H11V14Z" />
        </svg>
      ),
      title: "Healthcare professional",
      titleColor: "text-[#f05050]",
      features: ["Healthcare professionals can define their real-time availability status,for urgent calls or Pateint in an imiment alert", "Upon an alert, professionals gain instant access to the patient's precise GPS location, enabling rapid deployment and targeted assistance. They are also immediately notified of any alerts declared in their vicinity.","Leveraging cutting-edge IoT capabilities, healthcare providers can seamlessly connect their smartphones and vehicles to the platform","Beyond availability, professionals can manage their operational status and utilize robust tools for comprehensive care management."]
    },
   
  ]

  const handleGetStarted = () => {
    navigate("/LoginSig")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-260 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#f05050] mb-6">OUR FEATURES:</h1>
          <p className="text-2xl md:text-3xl text-[#ff7b7b] mb-16">What type of user are you ?</p>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {userTypes.map((userType, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300 relative min-w-[300px]"
                >
                  {/* Red accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#f05050] rounded-b-2xl"></div>

                  {/* Icon and Title */}
                  <div className="flex items-center mb-6">
                    <div className="mr-4">{userType.icon}</div>
                    <h3 className={`text-xl font-bold ${userType.titleColor}`}>{userType.title}</h3>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {userType.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-[#f05050] mr-2 mt-1">•</span>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Wave Element */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            className="w-full h-24 text-[#f05050]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose E-mergency?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             Our platform delivers comprehensive emergency management solutions,
              meticulously designed to cater to the unique demands of every user type.
               This bespoke approach ensures rapid response capabilities are always at hand,
                minimizing critical delays. Furthermore, it facilitates seamless and effective care 
                coordination, transforming chaotic situations into managed events. From initial 
                alert to full recovery, our system optimizes every step, providing the clarity
                 and control needed to save lives and mitigate damage. We're committed to empowering
                  users with the tools for exceptional preparedness and decisive action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚨",
                title: "Real-time Alerts",
                description: "eceive instant notifications as emergency situations unfold. Our system ensures you're immediately aware, allowing for swift and informed decision-making.",
              },
              {
                icon: "📍",
                title: "GPS Tracking",
                description: "Benefit from precise location tracking, enabling faster response times when every second counts. This critical feature helps first responders pinpoint exact locations quickly.",
              },
              {
                icon: "🔒",
                title: "Secure Platform",
                description: "Your data is protected with HIPAA-compliant security measures. We prioritize the confidentiality and integrity of your information, ensuring a trustworthy environment.",
              },
              {
                icon: "📱",
                title: "Mobile Ready",
                description: "Access our platform from any device, anywhere, anytime. This flexibility ensures you're always connected and in control, whether in the office or in the field.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#f05050] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals Or patients who trust E-mergency for their emergency management
            needs.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Features

