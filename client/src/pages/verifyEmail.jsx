import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;




function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); 
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/verify/${token}`);
        setStatus("success");
        setMessage(res.data.msg || "Email verified successfully!");
        
        let count = 3;
        const timer = setInterval(() => {
          count -= 1;
          setCountdown(count);
          
          if (count === 0) {
            clearInterval(timer);
            navigate("/"); // Redirect to create profile
          }
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.msg || "Verification failed. Please try again.");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-400 neon-glow backdrop-blur-sm">
          
          {/* Verifying State */}
          {status === "verifying" && (
            <div className="text-center animate-fade-in p-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 -mx-8 -mt-8 mb-6 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative">
                  <div className="flex justify-center mb-4">
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
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <svg className="animate-spin h-16 w-16 text-cyan-400" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <div className="absolute inset-0 bg-cyan-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Verifying Your Email
              </h2>
              <p className="text-gray-300 font-medium">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center animate-scale-in p-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 -mx-8 -mt-8 mb-6 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative">
                  <div className="flex justify-center mb-4">
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
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 transform transition-transform hover:scale-110">
                    <svg className="w-12 h-12 text-white animate-bounce-once" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-cyan-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Email Verified! 🎉
              </h2>
              <p className="text-gray-300 mb-6 font-medium">
                {message}
              </p>
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 rounded-xl p-5 mb-6">
                <p className="text-cyan-400 text-sm font-semibold flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Redirecting in <span className="font-bold text-2xl mx-2 text-white">{countdown}</span> seconds...
                </p>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-105 border-2 border-cyan-300"
              >
                Go to Login Now →
              </button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center animate-shake p-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-600 to-red-600 -mx-8 -mt-8 mb-6 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative">
                  <div className="flex justify-center mb-4">
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
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-pink-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Verification Failed
              </h2>
              <p className="text-gray-300 mb-6 font-medium">
                {message}
              </p>
              <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-400/30 rounded-xl p-5 mb-6">
                <p className="text-pink-400 text-sm font-semibold flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  The verification link may have expired or is invalid.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-105 border-2 border-cyan-300"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gray-700 text-white border-2 border-gray-600 font-bold py-4 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Register Again
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-8 pb-8 pt-6 border-t border-cyan-400/30 text-center bg-gradient-to-r from-gray-900 to-gray-800">
            <p className="text-xs text-gray-400 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Having trouble? Contact support@playx.com
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;