import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function ViewProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.response?.data?.msg || "Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-cyan-400 neon-glow">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400 mx-auto"></div>
          <p className="text-white font-semibold mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center border-2 border-pink-400">
          <div className="text-pink-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/50"
          >
            Go Home
          </button>
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
      <main className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-400 neon-glow">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-center">
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{profile?.name}</h1>
            <p className="text-cyan-100 text-lg">{profile?.email}</p>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Gender */}
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border-2 border-cyan-400/50">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Gender</h3>
                </div>
                <p className="text-2xl font-bold text-white">{profile?.gender || "Not specified"}</p>
              </div>

              {/* Age */}
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border-2 border-pink-400/50">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 text-pink-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Age</h3>
                </div>
                <p className="text-2xl font-bold text-white">{profile?.age || "Not specified"} years</p>
              </div>

              {/* Skill Level */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border-2 border-yellow-400/50">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Skill Level</h3>
                </div>
                <p className="text-2xl font-bold text-white">{profile?.skillLevel || "Not specified"}</p>
              </div>

              {/* Preferred Sports */}
              <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl p-6 border-2 border-pink-400/50">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 text-pink-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase">Preferred Sports</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(() => {
                    const sports = Array.isArray(profile?.preferredSports) 
                      ? profile.preferredSports 
                      : profile?.preferredSports?.split(',') || [];
                    
                    return sports.length > 0 ? (
                      sports.map((sport, index) => (
                        <span key={index} className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                          {typeof sport === 'string' ? sport.trim() : sport}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">No sports specified</p>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile?.bio && (
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border-2 border-gray-600 mb-8">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-bold text-white">About Me</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/create-profile")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-105 flex items-center border-2 border-cyan-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/home")}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Back to Home
              </button>
            </div>
          </div>
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
