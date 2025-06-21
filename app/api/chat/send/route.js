import { NextResponse } from 'next/server';
import connectToDB from '@/app/Utils/database';
import { ChatModel } from '@/app/Models/Chat';
import { Usermodel } from '@/app/Models/User';

export async function POST(req) {
  await connectToDB();
  const { senderId, receiverId, text } = await req.json();

  try {
    await ChatModel.create({ sender: senderId, receiver: receiverId, message: text });

    const sender = await Usermodel.findById(senderId);
    const receiver = await Usermodel.findById(receiverId);

    if (!sender.chattedpersons.some((p) => p.receiverId.toString() === receiverId)) {
      sender.chattedpersons.push({ receiverId, name: receiver.name });
      await sender.save();
    }

    if (!receiver.chatRequest.some((p) => p.senderId.toString() === senderId)) {
      receiver.chatRequest.push({ senderId, name: sender.name });
      await receiver.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
