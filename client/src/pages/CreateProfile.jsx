import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        gender: "",
        age: "",
        preferredSports: "",
        skillLevel: "",
        bio: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Set profile data from API response
                const userData = response.data;
                setProfile({
                    name: userData.name || "",
                    email: userData.email || "",
                    gender: userData.gender || "",
                    age: userData.age || "",
                    preferredSports: Array.isArray(userData.preferredSports) 
                        ? userData.preferredSports.join(", ") 
                        : userData.preferredSports || "",
                    skillLevel: userData.skillLevel || "",
                    bio: userData.bio || "",
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Fallback to localStorage if API call fails
                const name = localStorage.getItem("userName") || "";
                const email = localStorage.getItem("userEmail") || "";
                setProfile((prev) => ({ ...prev, name, email }));
            }
        };
        
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!profile.gender) newErrors.gender = "Please select your gender";
        if (!profile.age || profile.age < 10 || profile.age > 100) {
            newErrors.age = "Please enter a valid age (10-100)";
        }
        if (!profile.preferredSports.trim()) {
            newErrors.preferredSports = "Please enter at least one sport";
        }
        if (!profile.skillLevel) {
            newErrors.skillLevel = "Please select your skill level";
        }
        if (profile.bio.length > 200) {
            newErrors.bio = "Bio must be less than 200 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${API_URL}/users/profile`,
                profile,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Profile created successfully!");
            navigate("/home");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || "Error creating profile");
        } finally {
            setLoading(false);
        }
    };

    const sportsSuggestions = [
        { name: "Cricket", icon: "🏏" },
        { name: "Football", icon: "⚽" },
        { name: "Badminton", icon: "🏸" },
        { name: "Tennis", icon: "🎾" },
        { name: "Basketball", icon: "🏀" },
        { name: "Volleyball", icon: "🏐" },
        { name: "Table Tennis", icon: "🏓" },
        { name: "Kabaddi", icon: "🤼" },
        { name: "Hockey", icon: "🏑" }
    ];

    const addSport = (sport) => {
        const current = profile.preferredSports;
        const sports = current ? current.split(',').map(s => s.trim()) : [];
        if (!sports.includes(sport)) {
            setProfile({
                ...profile,
                preferredSports: current ? `${current}, ${sport}` : sport
            });
            setErrors({ ...errors, preferredSports: "" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="absolute inset-0 bg-black opacity-20"></div>

            <div className="relative z-10 w-full max-w-3xl">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-400 neon-glow">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
                        
                        <div className="relative">
                            <div className="flex items-center justify-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-1">
                                        <img
                                            src="/playX-tab-logo.png"
                                            alt="PlayX Logo"
                                            className="h-10 w-auto"
                                        />
                                    </div>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">PlayX</span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-center">Complete Your Profile</h1>
                            <p className="text-center text-cyan-100 text-sm font-medium mt-2">
                                🎯 Tell us about yourself to get started
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Progress Indicator */}
                        <div className="mb-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border-2 border-cyan-400/30">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-white flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Profile Setup
                                </span>
                                <span className="text-sm text-gray-400 font-semibold">Step 1 of 1</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full shadow-lg transition-all duration-500" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        {/* Name & Email (Read-only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={profile.name}
                                    readOnly
                                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Email Address
                                </label>
                                <input
                                    name="email"
                                    value={profile.email}
                                    readOnly
                                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Gender & Age */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Gender <span className="text-pink-400">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                                        errors.gender ? "border-pink-500 shake" : "border-gray-600"
                                    }`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">👨 Male</option>
                                    <option value="female">👩 Female</option>
                                    <option value="other">🧑 Other</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-pink-400 text-xs mt-1 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Age <span className="text-pink-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={profile.age}
                                    placeholder="Enter your age"
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                                        errors.age ? "border-pink-500 shake" : "border-gray-600"
                                    }`}
                                />
                                {errors.age && (
                                    <p className="text-pink-400 text-xs mt-1 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.age}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Preferred Sports */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                                Preferred Sports <span className="text-pink-400">*</span>
                            </label>
                            <input
                                name="preferredSports"
                                value={profile.preferredSports}
                                placeholder="e.g., Cricket, Football, Badminton"
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                                    errors.preferredSports ? "border-pink-500 shake" : "border-gray-600"
                                }`}
                            />
                            {errors.preferredSports && (
                                <p className="text-pink-400 text-xs mt-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.preferredSports}
                                </p>
                            )}
                            
                            {/* Sport Suggestions */}
                            <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-xl border-2 border-cyan-400/30">
                                <span className="text-xs font-semibold text-gray-300 block mb-3">
                                    ⚡ Quick Add Popular Sports:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {sportsSuggestions.map((sport) => (
                                        <button
                                            key={sport.name}
                                            type="button"
                                            onClick={() => addSport(sport.name)}
                                            className="px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 border-2 border-gray-600 hover:border-cyan-400"
                                        >
                                            {sport.icon} {sport.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Skill Level */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Skill Level <span className="text-pink-400">*</span>
                            </label>
                            <select
                                name="skillLevel"
                                value={profile.skillLevel}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                                    errors.skillLevel ? "border-pink-500 shake" : "border-gray-600"
                                }`}
                            >
                                <option value="">Select Skill Level</option>
                                <option value="beginner">🌱 Beginner - Just starting out</option>
                                <option value="intermediate">⚡ Intermediate - Regular player</option>
                                <option value="advanced">🏆 Advanced - Competitive player</option>
                            </select>
                            {errors.skillLevel && (
                                <p className="text-pink-400 text-xs mt-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.skillLevel}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Bio (Optional)
                            </label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                placeholder="Tell us a bit about yourself and your sports interests..."
                                onChange={handleChange}
                                rows="4"
                                className={`w-full px-4 py-3 bg-gray-700 border-2 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none ${
                                    errors.bio ? "border-pink-500 shake" : "border-gray-600"
                                }`}
                            />
                            <div className="flex justify-between items-center mt-2">
                                {errors.bio ? (
                                    <p className="text-pink-400 text-xs flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.bio}
                                    </p>
                                ) : <span></span>}
                                <p className={`text-xs ${profile.bio.length > 180 ? 'text-orange-500 font-semibold' : 'text-gray-500'}`}>
                                    {profile.bio.length}/200 characters
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-cyan-300"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Profile...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Complete Profile & Get Started
                                </span>
                            )}
                        </button>

                        {/* Skip Option */}
                        <div className="mt-5 text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/home")}
                                className="text-sm text-gray-400 hover:text-cyan-400 font-medium transition-colors underline-offset-2 hover:underline"
                            >
                                Skip for now →
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-5 text-center border-t-2 border-cyan-400/30">
                        <p className="text-xs text-gray-400 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Your profile helps us match you with the right players and grounds
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .shake {
                    animation: shake 0.3s ease-in-out;
                }
                .neon-glow {
                    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
                }
            `}</style>
        </div>
    );
};

export default CreateProfile;