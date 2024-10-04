import { model, Schema } from "mongoose"

export interface IUser extends Document {
	_id: string
	name: string
	age: string
	address: string
	email: string
	password: string
	lastLogin: Date
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
		age: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
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
