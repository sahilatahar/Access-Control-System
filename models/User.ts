import { model, Schema } from "mongoose"

export interface IUser extends Document {
	_id: string
	name: string
	email: string
	dob: Date
	password: string
	profileImage: string
	lastLogin: Date | null
}

// Define User Schema
const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImage: {
			type: String,
			default: "",
		},
		lastLogin: {
			type: Date,
			default: new Date(),
		},
	},
	{ timestamps: true }
)

const User = model<IUser>("User", userSchema)
export default User
