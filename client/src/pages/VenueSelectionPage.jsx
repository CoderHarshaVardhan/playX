import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVenues } from "../services/metaService.js";
import VenueCard from "../components/VenueCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function VenueSelectionPage() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await getVenues();
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to load venues");
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venue) => {
    // Navigate to create slot page with venue data
    navigate("/slots/create", {
      state: {
        selectedVenue: venue,
        sport: venue.sport && venue.sport.length > 0 ? venue.sport[0] : "",
      },
    });
  };

  // Get unique sports from all venues
  const allSports = [...new Set(venues.flatMap((v) => v.sport || []))];

  // Filter venues by selected sport
  const filteredVenues =
    selectedSport === "all"
      ? venues
      : venues.filter((v) => v.sport && v.sport.includes(selectedSport));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-cyan-400 neon-glow">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="text-white font-semibold mt-4">Loading venues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto border-2 border-cyan-400 neon-glow">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              Select Your Venue
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Choose the perfect ground for your game
            </p>
          </div>
        </div>

        {/* Sport Filter */}
        {allSports.length > 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8 max-w-4xl mx-auto border-2 border-cyan-400/30">
            <label className="block text-gray-300 text-sm font-semibold mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
              </svg>
              Filter by Sport
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSport("all")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedSport === "all"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 border-2 border-cyan-300"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600"
                }`}
              >
                All Sports
              </button>
              {allSports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedSport === sport
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50 border-2 border-pink-300"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Venues Grid */}
        {error ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-2xl mx-auto border-2 border-pink-400">
            <div className="text-pink-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue._id}
                venue={venue}
                isSelected={false}
                onSelect={() => handleVenueSelect(venue)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-12 shadow-xl text-center max-w-2xl mx-auto border-2 border-cyan-400/30">
            <svg className="w-24 h-24 mx-auto text-gray-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No Venues Found</h3>
            <p className="text-gray-300">
              {selectedSport === "all"
                ? "No venues available at the moment"
                : `No venues available for ${selectedSport}`}
            </p>
          </div>
        )}

        {/* Skip Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/slots/create")}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-600 hover:border-yellow-400/50"
          >
            Skip & Create Without Venue
          </button>
        </div>
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
