import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";

const PatientPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-md">
        <h1 className="text-xl font-bold text-green-600 mb-5">Welcome Nom-Prenom Patient</h1>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-2 cursor-pointer hover:text-green-500"><IoIosNotificationsOutline size={20} /> Notification</li>
          <li className="cursor-pointer hover:text-green-500">Ajouter un dossier</li>
          <li className="cursor-pointer hover:text-green-500">Quick Share</li>
          <li className="cursor-pointer hover:text-green-500">Amis Proches</li>
          <li className="cursor-pointer hover:text-green-500">État du Réseau</li>
          <li className="cursor-pointer hover:text-green-500">Archive</li>
          <li className="cursor-pointer hover:text-green-500">Historique d'accident</li>
          <li className="cursor-pointer bg-green-500 text-white p-2 rounded-md">Contact médicale</li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
            <BiSearch size={20} className="text-gray-600" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent ml-2 outline-none" />
          </div>
          <FaUserCircle size={30} className="text-green-500" />
        </div>
        
        {/* Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {['watch', 'circuit', 'car', 'phone'].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
              {/* Indicator Icons */}
              <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">{item.toUpperCase()}</span>
              </div>
              {/* Action Icons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <AiOutlinePlus size={18} className="text-green-500 cursor-pointer" />
                <AiOutlineQuestionCircle size={18} className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PatientPage;
