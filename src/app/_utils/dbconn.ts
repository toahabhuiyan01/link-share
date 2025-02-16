import Moongose, { Schema } from 'mongoose'
import { IUser } from '../types'

export const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: false,
		match: [
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
			'Please enter a valid email address' // Custom error message for invalid email
		]
	},
	avatar: { type: String, required: false },
	links: [{
		id: { type: String, required: true },
		name: { type: String, required: true },
		url: {
			type: String,
			required: true,
			match: [
				/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 
				'Please enter a valid URL'
			]
		}
	}]
})

export const UserModel = Moongose.models.User || Moongose.model('User', userSchema)

// models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  firstname: String,
  lastname: String,
  age: Number,
  birth: {
    date: String,
    place: String,
    country: String,
  },
  nationality: String,
  height: String,
  weight: String,
  number: Number,
  position: String,
  photo: String,
  club: String,
  marketValue: Number,
});

export const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);

async function dbConnect() {
	if(Moongose.connection.readyState >= 1) {
		return
	}

	const password = process.env.MONGODB_PASSWORD
	const username = process.env.MONGODB_USERNAME
	const dbUrl = `mongodb+srv://${username}:${password}@cluster0.yptboqt.mongodb.net/`

	try {
		const conn = await Moongose.connect(dbUrl, { dbName: 'link-share' })
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch(error) {
		console.error(error)
	}
}

export default dbConnect