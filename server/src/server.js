import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import Slot from "./models/Slot.js";
// Example of how to connect the new routes in your main server file:
import metaRoutes from './routes/metaRoutes.js';



dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("PlayX API running"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/slots", slotRoutes);
app.use('/api/meta', metaRoutes);




const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Failed to start:", err);
        process.exit(1);
    });

Slot.init();

