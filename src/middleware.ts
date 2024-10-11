import { type NextRequest, NextResponse as NextRes, type NextResponse } from 'next/server'


export function middleware(req: NextRequest) {
	if(req.nextUrl.pathname === '/') {
		return NextRes.redirect(new URL('/add-edit-link/new', req.url))
	}

	const res = NextRes.next()
	res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
}
