import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import urlRoutes from "./routes/url.js";
import Url from "./models/Url.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// redirect route (public)
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).send("Not found");
    url.clicks += 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = url.clickHistory[url.clickHistory.length - 1];
    if (last && new Date(last.date).getTime() === today.getTime())
      last.count += 1;
    else url.clickHistory.push({ date: today, count: 1 });
    await url.save();
    return res.redirect(url.longUrl);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
