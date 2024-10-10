import { NextResponse } from 'next/server'

import dbConnect, { UserModel } from '@/lib/dbconn'

export async function GET() {
	await dbConnect()
	const user = await UserModel.find({})
	console.log(user)

	return new NextResponse(JSON.stringify({ message: 'Hello World' }))
}
