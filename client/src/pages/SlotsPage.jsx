import React, { useState, useEffect } from "react";
import slotService from "../services/slotService.js";
import { getSports } from "../services/metaService.js";
import SlotCard from "../components/SlotCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const SlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state for dynamically loaded sports
  const [availableSports, setAvailableSports] = useState([]);

  const [filters, setFilters] = useState({
    sport: "", // Start with an empty string, will be set after fetching sports
    radiusKm: 10,
    lat: null,
    lng: null,
  });

  // 1. Fetch Sports metadata on component mount
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsRes = await getSports();
        const fetchedSports = sportsRes.data;
        setAvailableSports(fetchedSports);

        // Initialize the sport filter to the first available sport if needed
        if (fetchedSports.length > 0 && !filters.sport) {
          setFilters(prev => ({
            ...prev,
            sport: fetchedSports[0].name
          }));
        }
      } catch (error) {
        console.error("❌ Error fetching sports metadata:", error);
        setError("Failed to load sports list.");
      }
    };
    fetchSports();
  }, []); // Run only once

  // 2. Fetch user's current location once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("📍 User coordinates:", latitude, longitude);
          setFilters((prev) => ({
            ...prev,
            lat: latitude,
            lng: longitude,
          }));
        },
        (err) => {
          console.warn("⚠️ Location access denied or failed:", err.message);
          // Default to Hyderabad coordinates if denied
          setFilters((prev) => ({
            ...prev,
            lat: 17.3473792,
            lng: 78.4728064,
          }));
        }
      );
    } else {
      console.warn("❌ Geolocation not supported in this browser.");
      // Default fallback
      setFilters((prev) => ({
        ...prev,
        lat: 17.3473792,
        lng: 78.4728064,
      }));
    }
  }, []);

  // 3. Fetch slots whenever filters (including location and initialized sport) update
  useEffect(() => {
    // Wait until both location (lat/lng) AND an initial sport filter are set
    if (!filters.lat || !filters.lng || !filters.sport) return; 

    const fetchSlots = async () => {
      try {
        setLoading(true);
        // Note: Filters object is passed to the service, including lat, lng, and sport
        const data = await slotService.getSlots(filters);
        console.log("🎯 Slots fetched:", data);
        
        // Filter out slots user has already joined
        const userId = localStorage.getItem("userId");
        const availableSlots = data.filter(slot => {
          const isPlayer = slot.players?.some(player => {
            // Handle null/undefined players
            if (!player) return false;
            // Handle both string IDs and populated player objects
            const playerId = typeof player === 'string' ? player : player._id;
            return playerId === userId;
          });
          return !isPlayer; // Only show slots user hasn't joined
        });
        
        setSlots(availableSlots);
      } catch (err) {
        console.error("❌ Error fetching slots:", err);
        setError("Failed to fetch slots.");
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (loading && (!filters.lat || !filters.sport)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-cyan-400 neon-glow">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-cyan-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-white font-semibold">Loading Location and Sports Data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-pink-400">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-pink-400 font-semibold">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Navbar */}
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            🎮 Discover Play Slots
          </h1>
          <p className="text-white text-lg font-medium">
            Find and join games near you • {slots.length} slots available
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-8 max-w-4xl mx-auto border-2 border-cyan-400/30">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sport Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Sport
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all shadow-sm hover:shadow-md"
                value={filters.sport}
                onChange={(e) => handleFilterChange({ sport: e.target.value })}
                disabled={availableSports.length === 0}
              >
                <option value="" disabled>
                  {availableSports.length === 0 ? "Loading Sports..." : "Select Sport"}
                </option>
                {availableSports.map((s) => (
                  <option key={s._id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Radius Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Radius (km)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all shadow-sm hover:shadow-md"
                value={filters.radiusKm}
                onChange={(e) => handleFilterChange({ radiusKm: e.target.value })}
                placeholder="Radius (km)"
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Slots Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 border-cyan-400">
              <div className="flex items-center space-x-3">
                <svg className="animate-spin h-8 w-8 text-cyan-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-white font-semibold">Loading slots...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.length > 0 ? (
              slots.map((slot) => <SlotCard key={slot._id} slot={slot} />)
            ) : (
              <div className="col-span-full">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border-2 border-cyan-400/30">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-700 rounded-full p-6">
                      <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">No slots found</p>
                  <p className="text-gray-400">Try adjusting your filters or check back later</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 flex justify-center items-center space-x-8 text-white text-sm">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Verified Venues</span>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-semibold">Active Community</span>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Safe & Secure</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SlotsPage;