// /client/src/components/SlotForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { getSports, getVenues } from '../services/metaService.js';
import VenueCard from './VenueCard.jsx';

const initialFormState = {
    sport: '', // Changed to empty string to force selection
    venueId: '', // New field
    type: 'Pickup',
    timeStart: new Date(Date.now() + 3600000).toISOString().slice(0, 16), // Default to 1 hour from now
    durationMin: 90,
    capacity: 10,
    genderPreference: 'any',
    feeAmount: 0,
    feeModel: 'Split',
    location: {
        type: 'Point',
        coordinates: [0, 0], // [lng, lat]
    },
};

const SlotForm = ({ onSubmit, initialData = initialFormState, isEdit = false, loading = false, selectedVenue = null, prefilledSport = '' }) => {
    // Initialize form data with pre-filled venue and sport if provided
    const getInitialFormData = () => {
        if (selectedVenue) {
            return {
                ...initialData,
                sport: prefilledSport || initialData.sport,
                venueId: selectedVenue._id,
                location: {
                    type: 'Point',
                    coordinates: selectedVenue.location.coordinates
                }
            };
        }
        return initialData;
    };

    const [formData, setFormData] = useState(getInitialFormData());
    const [geoStatus, setGeoStatus] = useState(selectedVenue ? 'success' : 'idle');
    
    // New states for dynamic data
    const [sports, setSports] = useState([]);
    const [venues, setVenues] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    // --- Data Fetching and Geolocation ---

    // 1. Fetch Sports and Venues
    useEffect(() => {
        const loadMetaData = async () => {
            try {
                const [sportsRes, venuesRes] = await Promise.all([getSports(), getVenues()]);
                setSports(sportsRes.data);
                setVenues(venuesRes.data);
                
                // Initialize sport if empty
                if (sportsRes.data.length > 0 && !formData.sport) {
                    setFormData(prev => ({ ...prev, sport: sportsRes.data[0].name }));
                }

            } catch (error) {
                console.error('Error loading metadata:', error);
                // In a real app, show an error message
            }
        };
        loadMetaData();
    }, []);

    // 2. Automatically get coordinates on load
    useEffect(() => {
        if (formData.location.coordinates[0] !== 0) return; // Only run if coordinates are unset

        if (!navigator.geolocation) {
            setGeoStatus('error');
            return;
        }

        setGeoStatus('locating');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setFormData(prev => ({
                    ...prev,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                }));
                setGeoStatus('success');
            },
            (error) => {
                console.error('Error fetching location:', error);
                setGeoStatus('error');
            }
        );
    }, []);


    // --- Fee Calculation Logic ---
    // Use useMemo to calculate feeAmount whenever venueId or durationMin changes
    const calculatedFee = useMemo(() => {
        const selectedVenue = venues.find(v => v._id === formData.venueId);
        const duration = formData.durationMin;

        if (selectedVenue && duration && duration > 0) {
            // Price = (Duration in Hours) * (Price Per Hour)
            const fee = (duration / 60) * selectedVenue.pricePerHour;
            // Round to 2 decimal places
            return Math.round(fee * 100) / 100;
        }
        return 0;
    }, [formData.venueId, formData.durationMin, venues]);

    // Update feeAmount in formData whenever calculatedFee changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, feeAmount: calculatedFee }));
    }, [calculatedFee]);


    // --- Handlers ---

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        let newValue = value;
        if (type === 'number') {
            newValue = Number(value);
        }
        
        // Clear validation errors when user starts editing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleVenueSelect = (venueId) => {
        const selectedVenue = venues.find(v => v._id === venueId);
        if (selectedVenue) {
            setFormData(prev => ({
                ...prev,
                venueId: venueId,
                location: {
                    type: 'Point',
                    coordinates: selectedVenue.location.coordinates
                }
            }));
            setGeoStatus('success');
        } else {
            // Deselect venue
            setFormData(prev => ({
                ...prev,
                venueId: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [lng, lat] = formData.location.coordinates;
        
        // Comprehensive validation
        const errors = [];
        
        // Location validation
        if (!lat || !lng || lat === 0 || lng === 0) {
            errors.push('Location is required. Please select a venue or ensure location access.');
        }
        
        // Sport validation
        if (!formData.sport) {
            errors.push('Please select a sport.');
        }
        
        // Time validation
        if (!formData.timeStart) {
            errors.push('Start time is required.');
        } else {
            const startTime = new Date(formData.timeStart);
            const now = new Date();
            if (startTime < now) {
                errors.push('Start time must be in the future.');
            }
        }
        
        // Duration validation
        if (!formData.durationMin || formData.durationMin < 10) {
            errors.push('Duration must be at least 10 minutes.');
        }
        
        // Capacity validation
        if (!formData.capacity || formData.capacity < 2) {
            errors.push('Capacity must be at least 2 players.');
        }
        
        // Fee validation
        if (formData.feeAmount < 0) {
            errors.push('Fee amount cannot be negative.');
        }
        
        // Show errors if any
        if (errors.length > 0) {
            setValidationErrors(errors);
            // Scroll to top to show errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Clear errors and submit
        setValidationErrors([]);
        onSubmit(formData);
    };

    const [lng, lat] = formData.location.coordinates;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Validation Errors Display */}
            {validationErrors.length > 0 && (
                <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 rounded-xl p-5 animate-shake">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-lg font-bold text-pink-400 mb-2 flex items-center">
                                Validation Errors
                                <span className="ml-2 text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                                    {validationErrors.length}
                                </span>
                            </h3>
                            <ul className="space-y-2">
                                {validationErrors.map((error, index) => (
                                    <li key={index} className="flex items-start text-sm text-gray-200">
                                        <svg className="w-4 h-4 text-pink-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{error}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            onClick={() => setValidationErrors([])}
                            className="flex-shrink-0 ml-3 text-pink-400 hover:text-pink-300 transition-colors"
                            aria-label="Dismiss errors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Sport & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        Sport
                    </label>
                    <select
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    >
                        <option value="" disabled>Select a Sport</option>
                        {sports.map(s => (
                            <option key={s._id} value={s.name}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    >
                        {['Pickup', 'Challenge', 'Recruitment', 'Tournament'].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            
            {/* Venue Selection - Only show if no venue pre-selected */}
            {!selectedVenue && (
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Select Venue / Ground (Optional)
                    </label>
                    {venues.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-1">
                            {venues.map(venue => (
                                <VenueCard
                                    key={venue._id}
                                    venue={venue}
                                    isSelected={formData.venueId === venue._id}
                                    onSelect={handleVenueSelect}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-700 rounded-xl border-2 border-dashed border-gray-600">
                            <svg className="w-12 h-12 mx-auto text-gray-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-400">No venues available</p>
                        </div>
                    )}
                </div>
            )}

            {/* Time & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        name="timeStart"
                        value={formData.timeStart}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Duration (min)
                    </label>
                    <input
                        type="number"
                        name="durationMin"
                        value={formData.durationMin}
                        onChange={handleChange}
                        min="10"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    />
                </div>
            </div>

            {/* Capacity & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Capacity
                    </label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        min="2"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Gender Preference
                    </label>
                    <select
                        name="genderPreference"
                        value={formData.genderPreference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    >
                        {['any', 'male', 'female'].map(g => (
                            <option key={g} value={g}>
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        Total Fee (Calculated)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">$</span>
                        <input
                            type="number"
                            name="feeAmount"
                            value={formData.feeAmount.toFixed(2)}
                            readOnly={!!formData.venueId}
                            onChange={handleChange}
                            min="0"
                            className={`w-full pl-8 pr-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${formData.venueId ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-cyan-400' : ''}`}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Fee Model
                    </label>
                    <select
                        name="feeModel"
                        value={formData.feeModel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    >
                        {['Split', 'Host', 'Entry'].map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Location Status */}
            <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border-2 border-cyan-400/30">
                {geoStatus === 'locating' && (
                    <div className="flex items-center text-sm text-gray-300">
                        <svg className="animate-spin h-4 w-4 mr-2 text-cyan-400" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Detecting your location...
                    </div>
                )}
                {geoStatus === 'success' && (
                    <div className="flex items-center text-sm text-cyan-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Location Set:</span>
                        <span className="ml-1">Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}</span>
                    </div>
                )}
                {geoStatus === 'error' && !formData.venueId && (
                    <div className="flex items-center text-sm text-pink-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Unable to access location. Please select a venue instead.
                    </div>
                )}
            </div>

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
                        Creating Slot...
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {isEdit ? 'Save Changes' : 'Create Slot'}
                    </span>
                )}
            </button>
        </form>
    );
};

export default SlotForm;