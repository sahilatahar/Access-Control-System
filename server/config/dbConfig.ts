import mongoose from "mongoose"

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI!)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error: any) {
		if (error instanceof Error) {
			console.error("Database connection failed:", error.message)
		} else {
			console.error("An unexpected error occurred:", error)
		}
		process.exit(1)
	}
}

export default connectDB
