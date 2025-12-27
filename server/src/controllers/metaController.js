// /server/src/controllers/metaController.js

import Venue from '../models/Venue.js';

/**
 * NOTE: The 'sport' list is often hardcoded, or pulled from a separate 'Sport' collection. 
 * Since you don't have a 'Sport' model, we'll use a placeholder array for now, 
 * but a robust solution would use a DB lookup.
 */
const availableSports = [
    { _id: 's1', name: 'Football (Soccer)' },
    { _id: 's2', name: 'Cricket' },
    { _id: 's3', name: 'Tennis' },
    { _id: 's4', name: 'Volleyball' },
    // Add more sports as needed
];


/**
 * @desc Get a list of available sports
 * @route GET /api/meta/sports
 * @access Public/Private (depending on app logic)
 */
export const getSportsList = async (req, res) => {
    try {
        // In a real app, this would be: await Sport.find({}).select('name');
        res.json(availableSports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching sports metadata.' });
    }
};

/**
 * @desc Get a list of ALL available venues (no filtering)
 * @route GET /api/meta/venues
 * @access Private
 */
export const getVenuesList = async (req, res) => {
    try {
        // We ignore the lat, lng, and sport query parameters and fetch everything.
        
        // Fetch ALL venue data required by the frontend form
        const venues = await Venue.find({})
            .select('_id name pricePerHour location address')
            .limit(1000); // Increased limit to a large number just in case

        console.log('Fetched total venues:', venues.length);

        res.json(venues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching venues metadata.' });
    }
};