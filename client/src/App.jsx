// /client/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import VerifyEmail from "./pages/verifyEmail.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import Home from "./pages/Home.jsx";

// Import the Slot-related pages from the previous implementation
import SlotsPage from "./pages/SlotsPage.jsx";           // Was SlotFeed
import CreateSlotPage from "./pages/CreateSlotPage.jsx"; // Was CreateSlot
import SlotDetailsPage from "./pages/SlotDetailsPage.jsx";
import VenueSelectionPage from "./pages/VenueSelectionPage.jsx";
import MySlotsPage from "./pages/MySlotsPage.jsx";
import ThemeShowcase from "./pages/ThemeShowcase.jsx"; 

// Import ProtectedRoute component for authentication
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />

        {/* Protected Routes - Authentication Required */}
        <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* Theme Showcase - Protected */}
        <Route path="/theme-showcase" element={<ProtectedRoute><ThemeShowcase /></ProtectedRoute>} />

        {/* Slot Feature Routes - All Protected */}
        {/* Discovery Feed: Maps to /slots */}
        <Route path="/slots" element={<ProtectedRoute><SlotsPage /></ProtectedRoute>} /> 
        
        {/* My Slots: Maps to /my-slots */}
        <Route path="/my-slots" element={<ProtectedRoute><MySlotsPage /></ProtectedRoute>} />
        
        {/* Venue Selection: Maps to /slots/select-venue */}
        <Route path="/slots/select-venue" element={<ProtectedRoute><VenueSelectionPage /></ProtectedRoute>} />
        
        {/* Creation Form: Maps to /slots/create */}
        <Route path="/slots/create" element={<ProtectedRoute><CreateSlotPage /></ProtectedRoute>} />

        {/* Individual Slot Details: Dynamic ID route /slots/:id */}
        <Route path="/slots/:id" element={<ProtectedRoute><SlotDetailsPage /></ProtectedRoute>} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;