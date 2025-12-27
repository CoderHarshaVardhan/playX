// /client/src/pages/SlotDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import slotService from '../services/slotService.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const SlotDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [slot, setSlot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState(""); // For join/leave errors
    
    // Get current user ID (mock for demo, replace with actual state/context/redux user)
    const currentUserId = JSON.parse(localStorage.getItem('userInfo'))?._id; 
    
    const fetchSlot = async () => {
        try {
            setLoading(true);
            const response = await slotService.getSlotById(id);
            setSlot(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch slot details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlot();
    }, [id]);

    const isCreator = slot && currentUserId && slot.creatorId._id === currentUserId;
    const isJoined = slot && currentUserId && slot.players.some(p => p._id === currentUserId);
    const isFull = slot && slot.players.length >= slot.capacity;

    const handleAction = async (actionFn, successMsg) => {
        if (!slot) return;
        try {
            setLoading(true);
            setActionError(""); // Clear previous errors
            await actionFn(slot._id);
            alert(successMsg);
            await fetchSlot(); // Re-fetch slot data to update UI
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || 'Server error';
            setActionError(errorMessage);
            // Also show alert for immediate feedback
            alert(`Action failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = () => handleAction(slotService.joinSlot, 'Successfully joined the slot!');
    const handleLeave = () => handleAction(slotService.leaveSlot, 'Successfully left the slot.');
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel this slot? This action cannot be undone.")) {
            handleAction(slotService.cancelSlot, 'Slot successfully cancelled.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center space-x-3">
                        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-gray-700 font-semibold">Loading Slot Details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center space-x-3">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-700 font-semibold">Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!slot) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <p className="text-gray-600 font-semibold">Slot not found.</p>
                </div>
            </div>
        );
    }

    const playerCount = slot.players.length;
    const fillPercentage = (playerCount / slot.capacity) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden flex flex-col">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="absolute inset-0 bg-black opacity-20"></div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 flex-1 py-8">
                <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                        
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-3">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-extrabold text-white">{slot.sport}</h1>
                                        <p className="text-blue-100 text-lg">{slot.type}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 text-sm font-bold rounded-full ${
                                    slot.status === 'Open' 
                                        ? 'bg-green-400 text-green-900' 
                                        : slot.status === 'Filled'
                                        ? 'bg-yellow-400 text-yellow-900'
                                        : 'bg-red-400 text-red-900'
                                }`}>
                                    {slot.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Error Banner */}
                    {actionError && (
                        <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-red-800 font-bold">Action Failed</p>
                                    <p className="text-red-700 text-sm">{actionError}</p>
                                </div>
                                <button 
                                    onClick={() => setActionError("")} 
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Main Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Time */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                                <div className="flex items-center space-x-3 mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <p className="font-semibold text-gray-700">Time</p>
                                </div>
                                <p className="text-gray-800 font-bold text-lg">{new Date(slot.timeStart).toLocaleString()}</p>
                            </div>

                            {/* Location/Venue */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                                <div className="flex items-center space-x-3 mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="font-semibold text-gray-700">Location/Venue</p>
                                </div>
                                <p className="text-gray-800 font-bold text-lg">{slot.venueId?.name || 'Open Field/Specific Coordinates'}</p>
                            </div>

                            {/* Capacity */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                                <div className="flex items-center space-x-3 mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    <p className="font-semibold text-gray-700">Capacity</p>
                                </div>
                                <p className="text-gray-800 font-bold text-lg mb-2">{playerCount} / {slot.capacity} Players</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${fillPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Fee */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                                <div className="flex items-center space-x-3 mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                    <p className="font-semibold text-gray-700">Fee</p>
                                </div>
                                <p className="text-gray-800 font-bold text-lg">{slot.feeAmount > 0 ? `$${slot.feeAmount} (${slot.feeModel})` : 'Free'}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-start space-x-4 mb-8">
                            {isCreator ? (
                                <button 
                                    onClick={handleCancel}
                                    disabled={slot.status !== 'Open' && slot.status !== 'Filled'}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center group"
                                >
                                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Cancel Slot
                                </button>
                            ) : (
                                isJoined ? (
                                    <button 
                                        onClick={handleLeave}
                                        disabled={slot.status !== 'Open' && slot.status !== 'Filled'}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center group"
                                    >
                                        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                        </svg>
                                        Leave Slot
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleJoin}
                                        disabled={isFull || slot.status !== 'Open'}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center group"
                                    >
                                        <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        {isFull ? 'Slot Full' : 'Join Slot'}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Participants List */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                Participants ({playerCount})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {slot.players.map((player) => (
                                    <div key={player._id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-102">
                                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 shadow-md">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-semibold text-gray-800">{player.name}</span>
                                            {player._id === slot.creatorId._id && (
                                                <span className="ml-2 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
                                                    Creator
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-5 text-center border-t">
                        <p className="text-xs text-gray-600">
                            Join the game and have fun! 🎯
                        </p>
                    </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SlotDetailsPage;