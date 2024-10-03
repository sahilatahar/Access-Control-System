import { Schema, model } from "mongoose"

export interface IAdmin {
	_id: string
	name: string
	email: string
	dob: Date
	password: string
	lastLogin?: Date | null
}

// Define Admin Schema
const adminSchema = new Schema<IAdmin>(
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
		lastLogin: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
)

const Admin = model<IAdmin>("Admin", adminSchema)
export default Admin
