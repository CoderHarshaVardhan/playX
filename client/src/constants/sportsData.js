// /client/src/constants/sportsData.js

/**
 * Centralized sports data model
 * Contains all sport-specific information including images, colors, and metadata
 * Can be used throughout the application for consistent sport representation
 */

export const SPORTS_DATA = {
  Football: {
    name: 'Football',
    displayName: 'Football',
    image: '/sports/football.png',
    icon: '⚽',
    color: '#22c55e', // Green
    gradient: 'from-green-500 to-emerald-600',
    description: 'The beautiful game',
  },
  Soccer: {
    name: 'Soccer',
    displayName: 'Soccer',
    image: '/sports/football.png', // Same image as Football
    icon: '⚽',
    color: '#22c55e', // Green
    gradient: 'from-green-500 to-emerald-600',
    description: 'The beautiful game',
  },
  'Football (Soccer)': {
    name: 'Football (Soccer)',
    displayName: 'Football (Soccer)',
    image: '/sports/football.png', // Same image as Football
    icon: '⚽',
    color: '#22c55e', // Green
    gradient: 'from-green-500 to-emerald-600',
    description: 'The beautiful game',
  },
  Cricket: {
    name: 'Cricket',
    displayName: 'Cricket',
    image: '/sports/cricket.png',
    icon: '🏏',
    color: '#ef4444', // Red
    gradient: 'from-red-500 to-rose-600',
    description: 'Gentleman\'s game',
  },
  Basketball: {
    name: 'Basketball',
    displayName: 'Basketball',
    image: '/sports/basketball.png',
    icon: '🏀',
    color: '#f97316', // Orange
    gradient: 'from-orange-500 to-amber-600',
    description: 'Fast-paced court action',
  },
  Tennis: {
    name: 'Tennis',
    displayName: 'Tennis',
    image: '/sports/tennis.png',
    icon: '🎾',
    color: '#eab308', // Yellow
    gradient: 'from-yellow-500 to-amber-500',
    description: 'Racquet sport',
  },
  Badminton: {
    name: 'Badminton',
    displayName: 'Badminton',
    image: '/sports/badminton.jpg',
    icon: '🏸',
    color: '#8b5cf6', // Purple
    gradient: 'from-purple-500 to-violet-600',
    description: 'Shuttlecock sport',
  },
  Volleyball: {
    name: 'Volleyball',
    displayName: 'Volleyball',
    image: '/sports/volleyball.jpg',
    icon: '🏐',
    color: '#3b82f6', // Blue
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Beach or court',
  },
};

/**
 * Get sport data by name
 * @param {string} sportName - Name of the sport
 * @returns {object} Sport data object or default fallback
 */
export const getSportData = (sportName) => {
  return SPORTS_DATA[sportName] || {
    name: sportName,
    displayName: sportName,
    image: null,
    icon: '🎯',
    color: '#22d3ee', // Cyan (default)
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Sport activity',
  };
};

/**
 * Get all available sports
 * @returns {array} Array of sport names
 */
export const getAllSports = () => {
  return Object.keys(SPORTS_DATA);
};

/**
 * Get sport image path
 * @param {string} sportName - Name of the sport
 * @returns {string|null} Image path or null
 */
export const getSportImage = (sportName) => {
  const sport = getSportData(sportName);
  return sport.image;
};

/**
 * Get sport color
 * @param {string} sportName - Name of the sport
 * @returns {string} Color hex code
 */
export const getSportColor = (sportName) => {
  const sport = getSportData(sportName);
  return sport.color;
};

/**
 * Get sport gradient classes
 * @param {string} sportName - Name of the sport
 * @returns {string} Tailwind gradient classes
 */
export const getSportGradient = (sportName) => {
  const sport = getSportData(sportName);
  return sport.gradient;
};

export default SPORTS_DATA;
