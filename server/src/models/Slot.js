import mongoose from "mongoose";
const { Schema } = mongoose;

const SlotSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sport: { type: String, required: true },
    type: { type: String, enum: ["Challenge", "Recruitment", "Pickup", "Tournament"], default: "Pickup" },
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", default: null },
    timeStart: { type: Date, required: true },
    durationMin: { type: Number, default: 90 },
    capacity: { type: Number, default: 10 },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
    skillRequirement: { min: Number, max: Number },
    ageGroup: { min: Number, max: Number },
    genderPreference: { type: String, enum: ["any", "male", "female"], default: "any" },
    feeAmount: { type: Number, default: 0 },
    feeModel: { type: String, enum: ["Split", "Host", "Entry"], default: "Split" },


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

    visibilityRadiusKm: { type: Number, default: 10 },
    status: { type: String, enum: ["Open", "Filled", "Ongoing", "Completed", "Cancelled"], default: "Open" },
    metadata: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

SlotSchema.index({ location: "2dsphere" });

SlotSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    // Add creator to players array if not already present (good practice for hosting)
    if (!this.players.includes(this.creatorId)) {
        this.players.push(this.creatorId);
    }
    next();
});

export default mongoose.model("Slot", SlotSchema);