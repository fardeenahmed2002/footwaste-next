import { NextResponse } from "next/server"
import { BlogModel } from "../Models/Blog"
import { Usermodel } from "../Models/User"
import { deleteImage } from "../Utils/deleteimage"

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
        console.error("blog fetching failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export const getAllBlogs = async () => {
    try {
        const allblogs = await BlogModel.find().sort({ createdAt: -1 }).populate('blogger', 'name image email _id address')
        if (!allblogs) {
            return NextResponse.json({
                success: false,
                message: "error fetching blogs"
            })
        }
        if (allblogs.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'no blogs posted yet'
            })
        }
        return NextResponse.json({
            success: true,
            message: "all blogs found",
            blogs: allblogs
        })
    } catch (error) {
        console.error("blogs fetching failed", error.message)
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

        deleteImage(oldImage)

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

export const starTheBlog = async (userid, blogid, status) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: 'not authed'
            })
        }
        if (!blogid) {
            return NextResponse.json({
                success: false,
                message: "no blog found"
            })
        }
        const rater = await Usermodel.findById(userid)

        const blog = await BlogModel.findById(blogid)
        if (status === 'starred') {
            blog.stars += 1
            if (!rater.starredBlogs.includes(blog._id)) {
                rater.starredBlogs?.push(blog._id)
            }

        }

        if (status === 'unstarred') {
            if (rater.starredBlogs.includes(blog._id)) {
                await Usermodel.findByIdAndUpdate(userid, { $pull: { starredBlogs: blogid } }, { new: true })
            }
            blog.stars -= 1
        }
        await blog.save()
        await rater.save()
        return NextResponse.json({
            success: true,
            message: `Blog ${status} successfully`,
            updatedStars: blog.stars
        })
    } catch (error) {
        console.error("blog rating failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export const getBlogsById = async (blogid) => {
    try {
        if (!blogid) {
            return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 })
        }
        const blog = await BlogModel.findById(blogid).populate('blogger', 'name _id')

        if (!blog) {
            return NextResponse.json({
                success: false,
                message: "Blog not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "Blog found",
            blog
        })
    } catch (error) {
        console.error("blogs fetching failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}


export const reportblogbyid = async (userid, blogid, report) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, { status: 404 })
        }
        if (!blogid) {
            return NextResponse.json({
                success: false,
                message: 'no blog id not found'
            })
        }
        const blog = await BlogModel.findById(blogid).populate('blogger', 'name image')
        const user = await Usermodel.findById(userid).select('-password')
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'user not found'
            }, { status: 404 })
        }
        if (!blog) {
            return NextResponse.json({
                success: false,
                message: 'no blog found'
            }, { status: 404 })
        }

        blog.reportCount += 1
        user.notifications?.push(`your blog '${blog.title.toUpperCase()}'has been reported. Reason is ${report}`)
        user.notificationcount += 1
        await blog.save()
        await user.save()
        return NextResponse.json({
            success: true,
            message: "Reported successfully",
            blog
        })
    } catch (error) {
        console.error("blog getting faild", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export const removenotific = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, { status: 404 })
        }
        const user = await Usermodel.findById(userid)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, { status: 404 })
        }
        user.notificationcount = 0
        await user.save()
        return NextResponse.json({
            success: true,
            message: "set"
        })
    } catch (error) {
        console.error("error to reset notifications", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}



export const deletenotification = async (userid, indexToRemove) => {
    try {
        if (!userid) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }
        await Usermodel.findByIdAndUpdate(userid, {
            $unset: { [`notifications.${indexToRemove}`]: 1 }
        })

        const updatedUser = await Usermodel.findByIdAndUpdate(
            userid,
            { $pull: { notifications: null } },
            { new: true } 
        )

        return NextResponse.json({
            success: true,
            message: 'Notification deleted successfully',
            notifications: updatedUser.notifications
        })
    } catch (error) {
        console.error('Error deleting notification:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}