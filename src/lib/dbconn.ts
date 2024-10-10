import Moongose, { Schema } from 'mongoose'
import { IUser } from '../app/types'

export const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	avatar: { type: String, required: true },
	links: [{
		name: { type: String, required: true },
		url: { type: String, required: true }
	}]
})

export const UserModel = Moongose.models.User || Moongose.model('User', userSchema)

async function dbConnect() {
	if(Moongose.connection.readyState >= 1) {
		return
	}

	const password = process.env.MONGODB_PASSWORD
	const username = process.env.MONGODB_USERNAME
	const dbUrl = `mongodb+srv://${username}:${password}@cluster0.yptboqt.mongodb.net/`

	try {
		const conn = await Moongose.connect(dbUrl)
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch(error) {
		console.error(error)
	}
}

export default dbConnect