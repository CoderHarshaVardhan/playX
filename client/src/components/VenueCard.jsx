import React from 'react';

export default function VenueCard({ venue, isSelected, onSelect }) {
  const defaultImage = "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop";
  const mainImage = venue.images && venue.images.length > 0 ? venue.images[0] : defaultImage;
  
  // Get pricing info
  const hourlyRate = venue.pricing?.hourlyRate || venue.pricePerHour || 0;
  const peakRate = venue.pricing?.peakHourRate;
  const weekendRate = venue.pricing?.weekendRate;
  
  return (
    <div
      onClick={() => onSelect(venue._id)}
      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-102 ${
        isSelected
          ? 'ring-4 ring-cyan-400 shadow-2xl shadow-cyan-500/50 scale-102'
          : 'shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shadow-cyan-500/50 flex items-center border-2 border-cyan-300">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Selected
          </div>
        )}
        {/* Sports Tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {venue.sport && venue.sport.slice(0, 2).map((sport, index) => (
            <span key={index} className="bg-gray-900 bg-opacity-80 backdrop-blur-sm text-cyan-400 px-2 py-1 rounded-full text-xs font-semibold border border-cyan-400/50">
              {sport}
            </span>
          ))}
          {venue.sport && venue.sport.length > 2 && (
            <span className="bg-gray-900 bg-opacity-80 backdrop-blur-sm text-pink-400 px-2 py-1 rounded-full text-xs font-semibold border border-pink-400/50">
              +{venue.sport.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Venue Name */}
        <h3 className="text-lg font-bold text-white mb-2 truncate">{venue.name}</h3>
        
        {/* Address */}
        <div className="flex items-start text-sm text-gray-300 mb-3">
          <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="line-clamp-2">{venue.address}</span>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-3 mb-3 border-2 border-cyan-400/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-300">Base Rate:</span>
            <span className="text-lg font-bold text-cyan-400">₹{hourlyRate}/hr</span>
          </div>
          {(peakRate || weekendRate) && (
            <div className="text-xs text-gray-400 mt-1">
              {peakRate && <div>Peak: ₹{peakRate}/hr</div>}
              {weekendRate && <div>Weekend: ₹{weekendRate}/hr</div>}
            </div>
          )}
        </div>

        {/* Amenities */}
        {venue.amenities && venue.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {venue.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium border border-yellow-400/30">
                {amenity}
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium border border-gray-600">
                +{venue.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Capacity */}
        <div className="flex items-center text-sm text-gray-300">
          <svg className="w-4 h-4 mr-1 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span>Capacity: {venue.capacity} players</span>
        </div>
      </div>
    </div>
  );
}
