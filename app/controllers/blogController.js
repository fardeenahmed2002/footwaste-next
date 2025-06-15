import { NextResponse } from "next/server"
import { BlogModel } from "../Models/Blog"
import { Usermodel } from "../Models/User"
import path from 'path'
import fs from 'fs'
export const postBlog = async (formData, userid) => {
    try {
        const { title, content, image } = formData

        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "Not authenticated"
            }, { status: 401 })
        }

        if (!title || !content || !image) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const user = await Usermodel.findById(userid).select('-password')
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found"
            }, { status: 404 })
        }

        const newblog = new BlogModel({
            title,
            content,
            image,
            blogger: userid
        })

        const blog = await newblog.save()
        user.blogs?.push(blog._id)
        await user.save()

        return NextResponse.json({
            success: true,
            message: "Blog posted successfully"
        })
    } catch (error) {
        console.error("posting failed:", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}


export const displayUsersBlogPost = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "not authed"
            })
        }
        const user = await Usermodel.findById(userid).select('-password').populate('blogs')
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'no user found'
            })
        }

        return NextResponse.json({
            success: true,
            message: 'blog found',
            blog: user.blogs
        })
    } catch (error) {
        console.error("food fetching failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}


export const deleteABlog = async (userid, blogid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: 'no user found'
            })

        }
        if (!blogid) {
            return NextResponse.json({
                success: false,
                message: 'no blog id found'
            })
        }
        const blogExists = await BlogModel.findById(blogid);
        if (!blogExists) {
            return NextResponse.json({
                success: false,
                message: "Blog not found"
            });
        }

        const blog = await BlogModel.findByIdAndDelete(blogid)
        if (!blog) {
            return NextResponse.json({
                success: false,
                message: 'no blog found'
            })
        }
        const oldImage = blog.image
        
        if (oldImage.startsWith("https://res.cloudinary.com")) {
            await deleteFromCloudinary(oldImage)
        } else {
            const oldPath = path.join(process.cwd(), "public", oldImage)
            if (!oldPath) {
                return NextResponse.json({
                    success: false,
                    message: 'no image found'
                })
            }
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }
        }


        const updateuser = await Usermodel.findByIdAndUpdate(userid, { $pull: { blogs: blogid } }, { new: true })
        if (!updateuser) {
            return NextResponse.json({
                success: false,
                message: "no user found"
            })
        }
        return NextResponse.json({
            success: true,
            message: `deteleted successfully`
        })
    } catch (error) {
        console.error("blog deleting failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}