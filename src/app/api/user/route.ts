import dbConnect, { UserModel } from "@/lib/dbconn";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await dbConnect()
    const user = await UserModel.find({})
    console.log(user)
    return new NextResponse(JSON.stringify({ message: "Hello World" }))
}
