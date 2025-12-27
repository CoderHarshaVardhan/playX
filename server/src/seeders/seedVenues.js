import mongoose from 'mongoose';
import Venue from '../models/Venue.js'; // Adjust path as necessary
import dotenv from 'dotenv'; // Assuming you use dotenv for environment variables

// Load environment variables (for MONGO_URI)
dotenv.config();

// --- Sample Data for Hyderabad, Telangana, India ---
const sampleVenues = [
    {
        name: 'Gachibowli Stadium Turf',
        address: 'Gachibowli, Hyderabad, Telangana 500032',
        sport: ['Football (Soccer)', 'Athletics'],
        pricePerHour: 1200, // Price in INR
        capacity: 20,
        location: {
            type: 'Point',
            coordinates: [78.3444, 17.4300], // [lng, lat] - Near Gachibowli Stadium
        },
    },
    {
        name: 'Kondapur Basketball Court',
        address: 'Hitech City Road, Kondapur',
        sport: ['Basketball'],
        pricePerHour: 800,
        capacity: 10,
        location: {
            type: 'Point',
            coordinates: [78.3698, 17.4520], // Near Kondapur/Hitech City
        },
    },
    {
        name: 'Banjara Hills Clay Court',
        address: 'Road No 1, Banjara Hills',
        sport: ['Tennis', 'Badminton'],
        pricePerHour: 1500,
        capacity: 6,
        location: {
            type: 'Point',
            coordinates: [78.4485, 17.4101], // Banjara Hills area
        },
    },
    {
        name: 'Secunderabad Indoor Cricket Net',
        address: 'Near Parade Ground, Secunderabad',
        sport: ['Cricket (Net)', 'Table Tennis'],
        pricePerHour: 950,
        capacity: 8,
        location: {
            type: 'Point',
            coordinates: [78.5000, 17.4390], // Secunderabad area
        },
    },
    {
        name: 'Himayatnagar Volleyball Grounds',
        address: 'Opposite New Library, Himayatnagar',
        sport: ['Volleyball'],
        pricePerHour: 650,
        capacity: 12,
        location: {
            type: 'Point',
            coordinates: [78.4849, 17.4093], // Central Hyderabad
        },
    },
];

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/playX";
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
};

const importData = async () => {
    await connectDB();
    try {
        // Clear old data
        await Venue.deleteMany();

        // Set ownerId to null/undefined as we don't have User IDs here
        const venuesWithNullOwner = sampleVenues.map(venue => ({ ...venue, ownerId: null }));

        // Insert new data
        await Venue.insertMany(venuesWithNullOwner, { ordered: true })
            .then(() => console.log('✅ Venue Data Imported!'))
            .catch(err => {
                console.error('❌ Validation failed:', err.message);
                console.error(err.errors || err);
            });
        console.log('✅ Venue Data Imported! (Hyderabad Locations)');
        process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();
    try {
        await Venue.deleteMany();
        console.log('🗑️ Venue Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error('❌ Error destroying data:', error);
        process.exit(1);
    }
};

// Command line execution logic
if (process.argv[2] === '-d' || process.argv[2] === '-destroy') {
    destroyData();
} else {
    importData();
}