// /api/chat/chattedUsers/route.js (GET)
import { NextResponse } from 'next/server';
import connectToDB from '@/app/Utils/database';
import { userAuth } from '@/app/middlewares/userAuth';
import { getallchat } from '@/app/controllers/chatController';
// /api/chat/allchats
export const GET = async (req) => {
  try {
    await connectToDB()
    const auth = await userAuth(req)
    const { senderid, receiverid } = await req.body
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: 401 }
      )
    }
    return getallchat(senderid, receiverid)
  } catch (error) {
    console.error("getting user is error:", error)
    return new Response("Something went wrong", { status: 500 })
  }
}
