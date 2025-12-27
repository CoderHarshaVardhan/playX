import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slotService from "../services/slotService.js";
import SlotCard from "../components/SlotCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MySlotsPage() {
  const navigate = useNavigate();
  const [mySlots, setMySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, joined, created

  useEffect(() => {
    fetchMySlots();
  }, []);

  const fetchMySlots = async () => {
    try {
      // Use the new dedicated endpoint
      const userSlots = await slotService.getMySlots();
      setMySlots(userSlots);
    } catch (error) {
      console.error("Error fetching my slots:", error);
      setError("Failed to load your slots");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSlots = () => {
    const userId = localStorage.getItem("userId");
    
    if (filter === "created") {
      return mySlots.filter(slot => 
        (typeof slot.creatorId === 'string' ? slot.creatorId : slot.creatorId?._id) === userId
      );
    } else if (filter === "joined") {
      return mySlots.filter(slot => {
        const userId = localStorage.getItem("userId");
        const creatorId = typeof slot.creatorId === 'string' ? slot.creatorId : slot.creatorId?._id;
        const isCreator = creatorId === userId;
        const isPlayer = slot.players?.some(player => {
          if (!player) return false;
          const playerId = typeof player === 'string' ? player : player._id;
          return playerId === userId;
        });
        return isPlayer && !isCreator;
      });
    }
    return mySlots;
  };

  const filteredSlots = getFilteredSlots();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-cyan-400 neon-glow">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="text-white font-semibold mt-4">Loading your slots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto border-2 border-cyan-400 neon-glow">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              My Slots
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              View all your created and joined game slots
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-8 max-w-4xl mx-auto border-2 border-cyan-400/30">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 transform scale-105 border-2 border-cyan-300"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600 hover:border-cyan-400/50"
              }`}
            >
              All Slots ({mySlots.length})
            </button>
            <button
              onClick={() => setFilter("created")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "created"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50 transform scale-105 border-2 border-pink-300"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600 hover:border-pink-400/50"
              }`}
            >
              Created ({mySlots.filter(s => (typeof s.creatorId === 'string' ? s.creatorId : s.creatorId?._id) === localStorage.getItem("userId")).length})
            </button>
            <button
              onClick={() => setFilter("joined")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "joined"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50 transform scale-105 border-2 border-yellow-300"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600 hover:border-yellow-400/50"
              }`}
            >
              Joined ({mySlots.filter(s => {
                const userId = localStorage.getItem("userId");
                const creatorId = typeof s.creatorId === 'string' ? s.creatorId : s.creatorId?._id;
                const isCreator = creatorId === userId;
                const isPlayer = s.players?.some(player => {
                  if (!player) return false;
                  const playerId = typeof player === 'string' ? player : player._id;
                  return playerId === userId;
                });
                return isPlayer && !isCreator;
              }).length})
            </button>
          </div>
        </div>

        {/* Slots Grid */}
        {error ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-2xl mx-auto border-2 border-pink-400">
            <div className="text-pink-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : filteredSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlots.map((slot) => (
              <SlotCard key={slot._id} slot={slot} />
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-12 shadow-xl text-center max-w-2xl mx-auto border-2 border-cyan-400/30">
            <svg className="w-24 h-24 mx-auto text-gray-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No Slots Found</h3>
            <p className="text-gray-300 mb-6">
              {filter === "all" && "You haven't created or joined any slots yet"}
              {filter === "created" && "You haven't created any slots yet"}
              {filter === "joined" && "You haven't joined any slots yet"}
            </p>
            <button
              onClick={() => navigate("/slots/select-venue")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 border-2 border-cyan-300"
            >
              Create Your First Slot
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
}
