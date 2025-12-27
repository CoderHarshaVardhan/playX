// /client/src/pages/CreateSlotPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotForm from '../components/SlotForm.jsx';
import slotService from '../services/slotService.js';

const CreateSlotPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (slotData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await slotService.createSlot(slotData);
            alert(`Slot for ${response.data.sport} created successfully!`);
            navigate('/slots'); // Redirect to the discovery page
        } catch (err) {
            console.error('Creation Error:', err.response ? err.response.data : err);
            setError(err.response?.data?.message || 'Failed to create slot. Check console for details.');
        } finally {
            setLoading(false);
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

            <div className="relative z-10 w-full max-w-2xl">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border-2 border-cyan-400 neon-glow">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                        
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
                            <h1 className="text-3xl font-bold text-center mb-2">🚀 Create Play Slot</h1>
                            <p className="text-center text-cyan-100 text-sm font-medium">
                                Set up your game and find players nearby
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mx-8 mt-6 bg-pink-500/20 border-l-4 border-pink-500 p-4 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-pink-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-pink-400 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="p-8">
                        <SlotForm onSubmit={handleCreate} loading={loading} />
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-5 text-center border-t-2 border-cyan-400/30">
                        <p className="text-xs text-gray-400">
                            Create amazing play experiences for your community 🎯
                        </p>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 flex justify-center items-center space-x-6 text-white text-sm">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Quick Setup
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Find Players
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Easy Booking
                    </div>
                </div>
            </div>

            <style jsx>{`
                .neon-glow {
                    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
                }
            `}</style>
        </div>
    );
};

export default CreateSlotPage;