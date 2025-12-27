import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b-2 border-cyan-400 neon-border-bottom">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/home")}>
        <div className="p-1 hover:scale-110 transition-all duration-300">
          <img
            src="/playX-tab-logo.png"
            alt="PlayX Logo"
            className="h-10 w-auto"
          />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform duration-300">PlayX</h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6">
        <button
          onClick={() => navigate("/home")}
          className="text-gray-300 font-semibold hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-cyan-400/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate("/slots")}
          className="text-gray-300 font-semibold hover:text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-pink-400/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span>Find Slots</span>
        </button>
        <button
          onClick={() => navigate("/my-slots")}
          className="text-gray-300 font-semibold hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-yellow-400/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>My Slots</span>
        </button>
        <button
          onClick={() => navigate("/slots/select-venue")}
          className="text-gray-300 font-semibold hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-cyan-400/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Create Slot</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-300 font-semibold hover:text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-transparent hover:border-pink-400/50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Profile</span>
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 px-5 py-2 rounded-xl text-white font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-pink-500/50 hover:shadow-pink-400/70 transform hover:scale-105 border-2 border-pink-400"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
        </svg>
        <span>Logout</span>
      </button>

      <style jsx>{`
        .neon-border-bottom {
          box-shadow: 0 2px 15px rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </header>
  );
}
