import { NextResponse } from "next/server";
import { DayModel } from "../Models/Day";
import { Usermodel } from "../Models/User";

export const postComment = async (comment, userid, postid) => {
    try {
        const user = await Usermodel.findById(userid);

        const post = await DayModel.findById(postid).populate("blogger", "_id");
        post.commentCount += 1;
        post.comments.push({
            comment,
            commenter: user.name,
            image: user.image,
        });

        const poster = await Usermodel.findById(post.blogger._id);
        poster.notifications.push(`${user.name} has commented in your post ${post.title}`);

        await poster.save();
        await post.save();

        return NextResponse.json({
            success: true,
            message: "commented",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error",
        });
    }
};


export const getComments = async (postid) => {
    try {
        const allcomments = await DayModel.findById(postid)

        return NextResponse.json({
            success: true,
            message: `comments found`,
            comments: allcomments.comments,
            totalcomments: allcomments.comments.length
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}