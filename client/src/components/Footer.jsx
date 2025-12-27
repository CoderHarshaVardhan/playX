export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-2 border-cyan-400 shadow-2xl neon-border-top">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-1">
            <img
              src="/playX-tab-logo.png"
              alt="PlayX Logo"
              className="h-8 w-auto"
            />
          </div>
          <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent text-xl font-bold">PlayX</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center space-x-6 mb-6 text-sm">
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
            About Us
          </a>
          <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 font-medium">
            Contact
          </a>
          <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
            Terms of Service
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-gray-200 text-sm">
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300">
            <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Verified Venues</span>
          </div>
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg border border-pink-400/30 hover:border-pink-400 transition-all duration-300">
            <svg className="w-5 h-5 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-semibold">Active Community</span>
          </div>
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg border border-yellow-400/30 hover:border-yellow-400 transition-all duration-300">
            <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Safe & Secure</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm font-medium">
          © {new Date().getFullYear()} PlayX · Built with ❤️ for sports lovers
        </p>
      </div>

      <style jsx>{`
        .neon-border-top {
          box-shadow: 0 -2px 15px rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </footer>
  );
}
