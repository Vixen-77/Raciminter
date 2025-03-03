import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 p-4 flex flex-col space-y-4">
        <div className="text-2xl font-bold text-center">Logo</div>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Menu 1</button>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Menu 2</button>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Menu 3</button>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Menu 4</button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-gray-800 p-4">
          <div className="text-xl font-bold">Dashboard</div>
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">⚙️</button>
        </nav>

        {/* Content */}
        <main className="flex flex-wrap gap-4 p-6">
          <div className="w-1/2 p-4 bg-gray-700 rounded-lg">⌚ Montre connectée</div>
          <div className="w-1/2 p-4 bg-gray-700 rounded-lg">🚗 Voiture</div>
          <div className="w-1/2 p-4 bg-gray-700 rounded-lg">📱 Téléphone</div>
          <div className="w-1/2 p-4 bg-gray-700 rounded-lg">🔍 Autre info</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
