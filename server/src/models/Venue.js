import mongoose from "mongoose";
const { Schema } = mongoose;

const VenueSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    sport: { type: [String], required: true }, // Array of sports supported at this venue
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    
    // Pricing Information
    pricePerHour: { type: Number, default: 0 }, // Base hourly rate
    pricing: {
        hourlyRate: { type: Number, default: 0 }, // Standard hourly rate
        peakHourRate: { type: Number }, // Optional peak hour pricing
        weekendRate: { type: Number }, // Optional weekend pricing
        peakHours: { type: String }, // e.g., "6 PM - 10 PM"
        securityDeposit: { type: Number, default: 0 },
        currency: { type: String, default: "INR" }
    },
    
    // Visual Information
    images: [{ type: String }], // Array of image URLs
    description: { type: String, trim: true },
    
    // Amenities
    amenities: [{ type: String }], // e.g., ["Parking", "Washrooms", "Lighting", "Seating"]
    
    capacity: { type: Number, default: 10 },
    
    // Geospatial data for searching
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true,
        },
    },

    metadata: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Index for geospatial queries
VenueSchema.index({ location: "2dsphere" });

// Update timestamp on save
VenueSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    // Sync pricing.hourlyRate with pricePerHour for backward compatibility
    if (this.pricing && this.pricing.hourlyRate) {
        this.pricePerHour = this.pricing.hourlyRate;
    }
    next();
});

export default mongoose.model("Venue", VenueSchema);