import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig"
import mongoose from "mongoose"

import userRoutes from "./routes/userRoute"
import adminRoutes from "./routes/adminRoute"
import authRoutes from "./routes/authRoute"

// Loading environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Connecting to MongoDB
connectDB()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)

app.get("*", (_, res) => {
	return res.status(404).json({ message: "Route does not exist" })
})

mongoose.connection.on("open", () => {
	app.listen(PORT, () => {
		console.log("Server running on port 3000")
	})
})
