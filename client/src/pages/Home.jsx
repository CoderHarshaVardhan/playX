import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user name from localStorage (set after login/profile)
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements with Neon Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-cyan-400 neon-glow">
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-4">
            Welcome, {userName || "Player"}! 👋
          </h2>
          <p className="text-white text-xl font-semibold max-w-2xl mx-auto mb-2">
            Find local matches, create new slots, or challenge your friends
          </p>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Join the ultimate sports community platform
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <button
            onClick={() => navigate("/slots/select-venue")}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden animate-float border-2 border-cyan-400 hover:border-cyan-300 neon-border-cyan" style={{ animationDelay: '0s' }}
          >
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-4 mb-4 shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-300 group-hover:rotate-6">
                  <svg className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">Create Slot</h3>
                <p className="text-gray-300 text-sm font-medium">Set up a new game</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-950 to-blue-950 p-4 border-t border-cyan-500/30">
              <p className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors flex items-center justify-center">
                Start organizing 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/slots")}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden animate-float border-2 border-pink-400 hover:border-pink-300 neon-border-pink" style={{ animationDelay: '0.2s' }}
          >
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 opacity-30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-4 mb-4 shadow-lg shadow-pink-500/50 group-hover:shadow-pink-400/70 transition-all duration-300 group-hover:rotate-6">
                  <svg className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">View Slots</h3>
                <p className="text-gray-300 text-sm font-medium">Discover nearby games</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-950 to-purple-950 p-4 border-t border-pink-500/30">
              <p className="text-pink-400 font-semibold group-hover:text-pink-300 transition-colors flex items-center justify-center">
                Explore now 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden animate-float border-2 border-yellow-400 hover:border-yellow-300 neon-border-yellow" style={{ animationDelay: '0.4s' }}
          >
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative flex flex-col items-center">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-4 mb-4 shadow-lg shadow-yellow-500/50 group-hover:shadow-yellow-400/70 transition-all duration-300 group-hover:rotate-6">
                  <svg className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">My Profile</h3>
                <p className="text-gray-300 text-sm font-medium">Manage your account</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-950 to-orange-950 p-4 border-t border-yellow-500/30">
              <p className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors flex items-center justify-center">
                View profile 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
          </button>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl border-2 border-cyan-400 neon-glow text-center">
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">Why Choose PlayX?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up neon-border-cyan" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50 hover:shadow-xl transition-shadow duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Find Nearby Games</h4>
              <p className="text-gray-300">Discover sports activities happening around you in real-time</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-pink-400 hover:border-pink-300 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up neon-border-pink" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50 hover:shadow-xl transition-shadow duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Connect with Players</h4>
              <p className="text-gray-300">Join a vibrant community of sports enthusiasts</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-yellow-400 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up neon-border-yellow" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/50 hover:shadow-xl transition-shadow duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Easy Scheduling</h4>
              <p className="text-gray-300">Create and manage game slots with just a few clicks</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
        }
        .neon-border-cyan {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
        }
        .neon-border-cyan:hover {
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.6), 0 0 50px rgba(34, 211, 238, 0.4);
        }
        .neon-border-pink {
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
        }
        .neon-border-pink:hover {
          box-shadow: 0 0 25px rgba(236, 72, 153, 0.6), 0 0 50px rgba(236, 72, 153, 0.4);
        }
        .neon-border-yellow {
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
        }
        .neon-border-yellow:hover {
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.4);
        }
      `}</style>
    </div>
  );
}
