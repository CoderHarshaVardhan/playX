// /client/src/components/SlotCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getSportData } from '../constants/sportsData.js';

const SlotCard = ({ slot }) => {
  // Simple date formatting helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return { dateStr, timeStr };
  };
  
  const playerCount = slot.players ? slot.players.length : 0;
  const { dateStr, timeStr } = formatDate(slot.timeStart);
  const fillPercentage = (playerCount / slot.capacity) * 100;
  
  // Get sport-specific data
  const sportData = getSportData(slot.sport);

  return (
    <Link to={`/slots/${slot._id}`} className="block group">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400 transform hover:scale-105">
        {/* Header with neon gradient and sport image */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 relative overflow-hidden">
          {/* Sport Image - Top Left */}
          {sportData.image && (
            <div className="absolute top-2 left-2 w-20 h-20 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
              <img 
                src={sportData.image} 
                alt={sportData.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2">
                <span className="text-2xl">{sportData.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{slot.sport}</h3>
                <p className="text-cyan-100 text-sm">{slot.type}</p>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              slot.status === 'Open' 
                ? 'bg-cyan-400 text-gray-900' 
                : slot.status === 'Filled'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-pink-400 text-gray-900'
            }`}>
              {slot.status}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Time */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-2 border border-cyan-400/30">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Time</p>
              <p className="text-white font-semibold">{dateStr} • {timeStr}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg p-2 border border-pink-400/30">
              <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Venue</p>
              <p className="text-white font-semibold truncate">{slot.venueId ? slot.venueId.name : 'TBD/Private'}</p>
            </div>
          </div>

          {/* Players Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <p className="text-sm font-semibold text-gray-200">
                  {playerCount}/{slot.capacity} Players
                </p>
              </div>
              <p className="text-xs font-medium text-gray-400">{fillPercentage.toFixed(0)}% Full</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 border-t border-cyan-400/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300 font-medium">
              {slot.feeAmount > 0 ? `$${slot.feeAmount} • ${slot.feeModel}` : 'Free'}
            </span>
            <span className="text-cyan-400 font-semibold group-hover:text-pink-400 transition-colors flex items-center">
              View Details
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SlotCard;