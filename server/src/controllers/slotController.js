import Slot from '../models/Slot.js';
import mongoose from 'mongoose';

/**
 * @desc Create a new slot
 * @route POST /api/slots
 * @access Private
 */
export const createSlot = async (req, res) => {
    try {

      console.log('Request body for slot creation:', req.body);
        const {
            sport, type, timeStart, durationMin, capacity,
            skillRequirement, ageGroup, genderPreference,
            feeAmount, feeModel, location, venueId // venueId is now correctly pulled from req.body
        } = req.body;

        // Basic validation
        if (!sport || !timeStart || !capacity || !location || !location.coordinates) {
            return res.status(400).json({ message: 'Missing required slot fields: sport, timeStart, capacity, and location.' });
        }

        // Create the slot object
        console.log("spot:", sport);
        console.log(req.user.id);
        const newSlot = new Slot(
            {
            creatorId: req.user.id, // User ID comes from the protect middleware
            sport, type, timeStart, durationMin, capacity,
            skillRequirement, ageGroup, genderPreference,
            feeAmount, feeModel, location, venueId
        });

        // Add the creator as the first player
        newSlot.players.push(req.user.id);

        const createdSlot = await newSlot.save();
        console.log(createdSlot);
        res.status(201).json(createdSlot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during slot creation.' });
    }
};

/**
 * @desc Get all open slots based on filters/location
 * @route GET /api/slots
 * @access Private
 */
export const getSlots = async (req, res) => {
  try {
    const {
      sport,
      genderPreference,
      minSkill,
      maxSkill,
    } = req.query;

    console.log("📩 Incoming Filters:", req.query);

    // --- Base Query (only open slots)
    const query = { status: "Open" };

    // --- SPORT FILTER (optional)
    if (sport && sport.trim() !== "") {
      const keyword = sport.split("(")[0].trim(); // e.g. "Football" from "Football (Soccer)"
      query.sport = { $regex: keyword, $options: "i" };
      console.log("🔎 Applying sport filter:", query.sport);
    }

    // --- GENDER FILTER
    if (genderPreference && genderPreference !== "any") {
      query.genderPreference = genderPreference;
    }

    // --- SKILL FILTERS (optional)
    if (minSkill) query["skillRequirement.min"] = { $lte: Number(minSkill) };
    if (maxSkill) query["skillRequirement.max"] = { $gte: Number(maxSkill) };

    // 🧭 Final query log
    console.log("🧭 Final Query (serializable):", JSON.stringify(query, null, 2));

    // --- Fetch all open slots irrespective of radius or coordinates
    const slots = await Slot.find(query)
      .populate("creatorId", "name profilePicture")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${slots.length} slots`);
    return res.json(slots);
  } catch (error) {
    console.error("❌ Error fetching slots:", error);
    return res.status(500).json({ message: "Server error while fetching slots." });
  }
};





/**
 * @desc Get slots where user is creator or player
 * @route GET /api/slots/my-slots
 * @access Private
 */
export const getMySlots = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find slots where user is either the creator or in the players array
    const slots = await Slot.find({
      $or: [
        { creatorId: userId },
        { players: userId }
      ]
    })
      .populate("creatorId", "name profilePicture")
      .populate("players", "name profilePicture skillLevel gender")
      .populate("venueId", "name address pricePerHour")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${slots.length} slots for user ${userId}`);
    return res.json(slots);
  } catch (error) {
    console.error("❌ Error fetching user's slots:", error);
    return res.status(500).json({ message: "Server error while fetching your slots." });
  }
};

/**
 * @desc Get single slot by ID
 * @route GET /api/slots/:id
 * @access Private
 */
export const getSlotById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Slot not found." });
    }

    let query = Slot.findById(req.params.id)
      .populate("creatorId", "name profilePicture")
      .populate("players", "name profilePicture skillLevel gender")
      // --- NEW POPULATION ---
      // Populate venue details so the frontend can display the venue name, address, etc.
      .populate("venueId", "name address pricePerHour");

    const slot = await query.exec();

    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    res.json(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching slot details." });
  }
};


/**
 * @desc Join a slot
 * @route POST /api/slots/:id/join
 * @access Private
 */
export const joinSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const userId = req.user._id;

        const slot = await Slot.findById(slotId);
        // Assuming we have a User model to fetch user details (skill, gender) for validation
        // const user = await User.findById(userId);

        if (!slot || slot.status !== 'Open') {
            return res.status(400).json({ message: 'Slot not found or is not open for joining.' });
        }

        if (slot.players.includes(userId)) {
            return res.status(400).json({ message: 'You have already joined this slot.' });
        }

        if (slot.players.length >= slot.capacity) {
            return res.status(400).json({ message: 'Slot is already full.' });
        }

        // **Simple Validation Placeholder (Requires User model data):**
        /*
        // Skill check: user's skill must be within the slot's requirements
        if (user.skill < slot.skillRequirement.min || user.skill > slot.skillRequirement.max) {
             return res.status(400).json({ message: 'Your skill level does not meet the slot requirements.' });
        }
        // Gender check:
        if (slot.genderPreference !== 'any' && slot.genderPreference !== user.gender) {
             return res.status(400).json({ message: 'This slot has a gender preference you do not meet.' });
        }
        */

        // Join the slot
        slot.players.push(userId);

        // Check if the slot is now full
        if (slot.players.length === slot.capacity) {
            slot.status = 'Filled';
        }

        await slot.save();
        res.json({ message: 'Successfully joined the slot.', slot });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while joining slot.' });
    }
};

/**
 * @desc Leave a slot
 * @route POST /api/slots/:id/leave
 * @access Private
 */
export const leaveSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const userId = req.user._id;

        const slot = await Slot.findById(slotId);

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }

        if (slot.creatorId.equals(userId)) {
            return res.status(400).json({ message: 'Creator cannot leave the slot, they must cancel it.' });
        }

        if (!slot.players.includes(userId)) {
            return res.status(400).json({ message: 'You are not a player in this slot.' });
        }

        // Remove the user from the players array
        slot.players = slot.players.filter(playerId => !playerId.equals(userId));

        // If the slot was 'Filled', change status back to 'Open'
        if (slot.status === 'Filled' && slot.players.length < slot.capacity) {
            slot.status = 'Open';
        }

        await slot.save();
        res.json({ message: 'Successfully left the slot.', slot });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while leaving slot.' });
    }
};

/**
 * @desc Cancel a slot
 * @route POST /api/slots/:id/cancel
 * @access Private
 */
export const cancelSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const userId = req.user._id;
        // const isAdmin = req.user.role === 'admin'; // Assuming admin check

        const slot = await Slot.findById(slotId);

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }

        // Check if the user is the creator or an admin
        const isCreatorOrAdmin = slot.creatorId.equals(userId); // || isAdmin;

        if (!isCreatorOrAdmin) {
            return res.status(403).json({ message: 'You are not authorized to cancel this slot.' });
        }

        if (slot.status === 'Cancelled' || slot.status === 'Completed') {
            return res.status(400).json({ message: `Slot is already ${slot.status.toLowerCase()}.` });
        }

        slot.status = 'Cancelled';
        await slot.save();

        // **Future: Notify all players about the cancellation**

        res.json({ message: 'Slot successfully cancelled.', slot });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while cancelling slot.' });
    }
};