import { NextResponse, type NextRequest } from 'next/server'

import dbConnect, { UserModel } from '@/lib/dbconn'

export async function GET(req: NextRequest) {
	await dbConnect()

	const qs = req.url.split('?')[1]
	const id = new URLSearchParams(qs).get('id')

	try {
		const user = await UserModel.findOne({ _id: id })
		
		if (!user) {
			throw new Error('User not found')
		}

		return new NextResponse(JSON.stringify(user), { status: 200 })
	} catch (e) {
		console.error(e)

		return new NextResponse('Not Found', { status: 404 })
	}
}
