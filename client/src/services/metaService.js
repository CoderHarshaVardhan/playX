// /client/src/services/metaService.js

import axios from './axiosInstance';

/**
 * Fetches the list of available sports from the backend.
 * @route GET /api/meta/sports
 */
export const getSports = () => axios.get('/meta/sports');

/**
 * Fetches the list of nearby venues.
 * Pass user's location (lat, lng) as query parameters for filtering.
 * @route GET /api/meta/venues?lat=...&lng=...
 */
export const getVenues = (params) => axios.get('/meta/venues', { params });