import { Schema, model } from "mongoose"

export interface IAdmin {
	_id: string
	name: string
	age: string
	address: string
	email: string
	password: string
	lastLogin: Date
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

const Admin = model<IAdmin>("Admin", adminSchema)
export default Admin
