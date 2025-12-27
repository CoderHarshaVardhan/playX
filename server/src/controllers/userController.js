import User from "../models/User.js";

// @desc    Get logged-in user's profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// @desc    Update or create user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile  = async (req, res) => {
    try {
        const updates = {
            gender: req.body.gender,
            age: req.body.age,
            preferredSports: req.body.preferredSports
                ? req.body.preferredSports.split(",").map((s) => s.trim())
                : [],
            skillLevel: req.body.skillLevel,
            bio: req.body.bio,
            location: req.body.location || {},
            profileCompleted: true,
        };

        const user = await User.findByIdAndUpdate(req.user.id, updates, {
            new: true,
        }).select("-password");

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({
            msg: "Profile created/updated successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating profile", error });
    }
};
