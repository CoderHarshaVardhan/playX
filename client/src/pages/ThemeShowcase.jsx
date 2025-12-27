import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ThemeShowcase() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themes = [
    {
      id: 1,
      name: "Current Vibrant Gradient",
      description: "Energetic, playful, and modern with vibrant gradients",
      colors: ["#4ade80", "#3b82f6", "#a855f7"],
      bgClass: "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600",
      cardBg: "from-white to-gray-50",
      primaryGradient: "from-blue-600 via-purple-600 to-pink-600",
      accentColors: {
        create: { gradient: "from-blue-500 to-purple-600", border: "border-blue-200 hover:border-blue-400", footer: "from-blue-50 to-purple-50", text: "text-blue-600" },
        view: { gradient: "from-green-500 to-blue-600", border: "border-green-200 hover:border-green-400", footer: "from-green-50 to-blue-50", text: "text-green-600" },
        profile: { gradient: "from-purple-500 to-pink-600", border: "border-purple-200 hover:border-purple-400", footer: "from-purple-50 to-pink-50", text: "text-purple-600" }
      }
    },
    {
      id: 2,
      name: "Dark Neon",
      description: "Futuristic gaming-inspired with neon accents",
      colors: ["#00f5ff", "#ff006e", "#ffbe0b"],
      bgClass: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      cardBg: "from-gray-800 to-gray-900",
      primaryGradient: "from-cyan-400 via-pink-500 to-yellow-400",
      accentColors: {
        create: { gradient: "from-cyan-500 to-blue-500", border: "border-cyan-400 hover:border-cyan-300", footer: "from-cyan-950 to-blue-950", text: "text-cyan-400" },
        view: { gradient: "from-pink-500 to-purple-500", border: "border-pink-400 hover:border-pink-300", footer: "from-pink-950 to-purple-950", text: "text-pink-400" },
        profile: { gradient: "from-yellow-500 to-orange-500", border: "border-yellow-400 hover:border-yellow-300", footer: "from-yellow-950 to-orange-950", text: "text-yellow-400" }
      },
      isDark: true
    },
    {
      id: 3,
      name: "Minimal Monochrome",
      description: "Professional, elegant, and timeless",
      colors: ["#000000", "#6b7280", "#3b82f6"],
      bgClass: "bg-gradient-to-br from-white via-gray-50 to-gray-100",
      cardBg: "from-white to-white",
      primaryGradient: "from-gray-900 via-gray-700 to-blue-600",
      accentColors: {
        create: { gradient: "from-gray-800 to-gray-900", border: "border-gray-300 hover:border-gray-400", footer: "from-gray-50 to-gray-100", text: "text-gray-900" },
        view: { gradient: "from-gray-700 to-blue-600", border: "border-gray-300 hover:border-blue-400", footer: "from-gray-50 to-blue-50", text: "text-blue-600" },
        profile: { gradient: "from-blue-600 to-gray-800", border: "border-gray-300 hover:border-gray-400", footer: "from-blue-50 to-gray-100", text: "text-gray-800" }
      }
    },
    {
      id: 4,
      name: "Sunset Warm",
      description: "Energetic, friendly, and inviting",
      colors: ["#f97316", "#ef4444", "#fbbf24"],
      bgClass: "bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400",
      cardBg: "from-white to-orange-50",
      primaryGradient: "from-orange-600 via-red-600 to-yellow-600",
      accentColors: {
        create: { gradient: "from-orange-500 to-red-500", border: "border-orange-200 hover:border-orange-400", footer: "from-orange-50 to-red-50", text: "text-orange-600" },
        view: { gradient: "from-red-500 to-pink-500", border: "border-red-200 hover:border-red-400", footer: "from-red-50 to-pink-50", text: "text-red-600" },
        profile: { gradient: "from-yellow-500 to-orange-500", border: "border-yellow-200 hover:border-yellow-400", footer: "from-yellow-50 to-orange-50", text: "text-yellow-600" }
      }
    },
    {
      id: 5,
      name: "Ocean Cool",
      description: "Calm, refreshing, and trustworthy",
      colors: ["#14b8a6", "#0ea5e9", "#06b6d4"],
      bgClass: "bg-gradient-to-br from-teal-400 via-blue-500 to-cyan-500",
      cardBg: "from-white to-cyan-50",
      primaryGradient: "from-teal-600 via-blue-600 to-cyan-600",
      accentColors: {
        create: { gradient: "from-teal-500 to-cyan-500", border: "border-teal-200 hover:border-teal-400", footer: "from-teal-50 to-cyan-50", text: "text-teal-600" },
        view: { gradient: "from-blue-500 to-cyan-500", border: "border-blue-200 hover:border-blue-400", footer: "from-blue-50 to-cyan-50", text: "text-blue-600" },
        profile: { gradient: "from-cyan-500 to-teal-500", border: "border-cyan-200 hover:border-cyan-400", footer: "from-cyan-50 to-teal-50", text: "text-cyan-600" }
      }
    }
  ];

  const ThemePreview = ({ theme }) => {
    const textColor = theme.isDark ? "text-white" : "text-gray-800";
    const cardTextColor = theme.isDark ? "text-gray-200" : "text-gray-600";
    const cardBgOpacity = theme.isDark ? "bg-opacity-20" : "bg-opacity-90";

    return (
      <div className={`${theme.bgClass} relative overflow-hidden rounded-3xl shadow-2xl`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-5 w-36 h-36 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 w-48 h-48 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Hero Section */}
          <div className={`mb-6 bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-2xl p-6 shadow-xl`}>
            <h2 className={`text-3xl font-extrabold bg-gradient-to-r ${theme.primaryGradient} bg-clip-text text-transparent mb-2`}>
              Welcome, Player! 👋
            </h2>
            <p className={`${textColor} text-sm font-semibold mb-1`}>
              Find local matches, create new slots, or challenge your friends
            </p>
            <p className={`${cardTextColor} text-xs`}>
              Join the ultimate sports community platform
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Create Slot */}
            <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl shadow-lg border-2 ${theme.accentColors.create.border} overflow-hidden transform hover:scale-105 transition-all duration-300`}>
              <div className="p-4">
                <div className={`bg-gradient-to-br ${theme.accentColors.create.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold bg-gradient-to-r ${theme.accentColors.create.gradient} bg-clip-text text-transparent mb-1`}>Create Slot</h3>
                <p className={`${cardTextColor} text-xs`}>Set up a new game</p>
              </div>
              <div className={`bg-gradient-to-r ${theme.accentColors.create.footer} p-2 border-t ${theme.isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`${theme.accentColors.create.text} font-semibold text-xs flex items-center justify-center`}>
                  Start organizing →
                </p>
              </div>
            </div>

            {/* View Slots */}
            <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl shadow-lg border-2 ${theme.accentColors.view.border} overflow-hidden transform hover:scale-105 transition-all duration-300`}>
              <div className="p-4">
                <div className={`bg-gradient-to-br ${theme.accentColors.view.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold bg-gradient-to-r ${theme.accentColors.view.gradient} bg-clip-text text-transparent mb-1`}>View Slots</h3>
                <p className={`${cardTextColor} text-xs`}>Discover nearby games</p>
              </div>
              <div className={`bg-gradient-to-r ${theme.accentColors.view.footer} p-2 border-t ${theme.isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`${theme.accentColors.view.text} font-semibold text-xs flex items-center justify-center`}>
                  Explore now →
                </p>
              </div>
            </div>

            {/* My Profile */}
            <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl shadow-lg border-2 ${theme.accentColors.profile.border} overflow-hidden transform hover:scale-105 transition-all duration-300`}>
              <div className="p-4">
                <div className={`bg-gradient-to-br ${theme.accentColors.profile.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold bg-gradient-to-r ${theme.accentColors.profile.gradient} bg-clip-text text-transparent mb-1`}>My Profile</h3>
                <p className={`${cardTextColor} text-xs`}>Manage your account</p>
              </div>
              <div className={`bg-gradient-to-r ${theme.accentColors.profile.footer} p-2 border-t ${theme.isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`${theme.accentColors.profile.text} font-semibold text-xs flex items-center justify-center`}>
                  View profile →
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h3 className={`text-lg font-bold bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl p-3 mb-3 shadow-lg text-center`}>
              <span className={`bg-gradient-to-r ${theme.primaryGradient} bg-clip-text text-transparent`}>Why Choose PlayX?</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl p-4 border-2 ${theme.accentColors.create.border} hover:shadow-xl transition-all duration-300`}>
                <div className={`bg-gradient-to-br ${theme.accentColors.create.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className={`text-xs font-bold ${textColor} mb-1`}>Find Nearby Games</h4>
                <p className={`${cardTextColor} text-xs`}>Discover sports activities around you</p>
              </div>

              <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl p-4 border-2 ${theme.accentColors.view.border} hover:shadow-xl transition-all duration-300`}>
                <div className={`bg-gradient-to-br ${theme.accentColors.view.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h4 className={`text-xs font-bold ${textColor} mb-1`}>Connect with Players</h4>
                <p className={`${cardTextColor} text-xs`}>Join a vibrant community</p>
              </div>

              <div className={`bg-gradient-to-br ${theme.cardBg} ${cardBgOpacity} backdrop-blur-sm rounded-xl p-4 border-2 ${theme.accentColors.profile.border} hover:shadow-xl transition-all duration-300`}>
                <div className={`bg-gradient-to-br ${theme.accentColors.profile.gradient} rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2 shadow-md`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className={`text-xs font-bold ${textColor} mb-1`}>Easy Scheduling</h4>
                <p className={`${cardTextColor} text-xs`}>Manage game slots easily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎨 Theme Showcase
          </h1>
          <p className="text-gray-700 text-lg font-medium mb-2">
            Choose your favorite theme for PlayX
          </p>
          <p className="text-gray-600 mb-4">
            Preview 5 premium theme variations and select the one that best fits your vision
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Theme Grid */}
      <div className="max-w-7xl mx-auto space-y-12">
        {themes.map((theme) => (
          <div key={theme.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Theme Info */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {theme.id}. {theme.name}
                  </h2>
                  <p className="text-gray-600 text-lg">{theme.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    selectedTheme === theme.id
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {selectedTheme === theme.id ? "✓ Selected" : "Select This Theme"}
                </button>
              </div>

              {/* Color Palette */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">Color Palette:</span>
                {theme.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>

            {/* Theme Preview */}
            <div className="p-8 bg-gray-50">
              <ThemePreview theme={theme} />
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedTheme && (
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-sm animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Theme Selected!</h3>
              <p className="text-gray-600 text-sm">
                {themes.find(t => t.id === selectedTheme)?.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
