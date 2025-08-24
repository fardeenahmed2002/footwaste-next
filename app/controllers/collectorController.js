import { NextResponse } from "next/server"

import { DayModel } from "../Models/Day"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"

export const getalldonatedfoodpost = async (userID) => {
  try {
    const posts = await DonatedFoodModel.find({
      isApprovedByAdmin: "approved",
      applicantNGO: { $nin: [userID] },
      foodPickingStatus: { $ne: "approved" }
    }).sort({ createdAt: -1 }).populate({ path: 'pickedBy', select: 'name' })

    return NextResponse.json({
      success: true,
      message: `food post found`,
      posts
    })
  } catch (error) {
    console.error("food getting error", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}

export const getfoodDetails = async (id) => {
  try {
    if (!id) {
      return NextResponse.json({
        message: 'no food id found',
        success: false
      })
    }
    const food = await DonatedFoodModel.findById(id).populate({ path: 'donorOfThisFood', select: 'name email address _id' })

    if (!food) {
      return NextResponse.json({
        success: false,
        message: 'no food found'
      })
    }
    return NextResponse.json({
      success: true,
      message: 'food details found',
      food
    })
  } catch (error) {
    console.error("food getting error", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }

}

export const requestToReceiveFood = async (userID, foodID) => {
  try {
    if (!userID || !foodID) {
      return NextResponse.json({
        success: false,
        message: "id not found"
      })
    }

    const food = await DonatedFoodModel.findById(foodID).populate('donorOfThisFood', '_id')
    if (!food) {
      return NextResponse.json({ success: false, message: "Food not found" })
    }
    const user = await Usermodel.findById(userID)

    user.RequestToReceiveFoods.push(foodID)

    await user.save()

    if (food.biter.includes(userID)) {
      return NextResponse.json({
        success: false,
        message: "You have already requested this food",
      })
    }

    const donor = await Usermodel.findById(food.donorOfThisFood._id)

    if (!donor) {
      return NextResponse.json({ success: false, message: "Donor not found" })
    }

    donor.notifications.push(`You have one request in post of ${food.title}.`)

    donor.notificationcount += 1

    await donor.save()

    food.biter.push(userID)
    food.applicantNGO.push(userID)
    await food.save()

    return NextResponse.json({
      success: true,
      message: "request sent"
    })

  } catch (error) {
    console.error("food getting error", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}




export const receiveAFood = async (userid, foodid) => {

  try {
    if (!userid) {
      return NextResponse.json({
        success: false,
        message: 'not authed'
      });
    }

    if (!foodid) {
      return NextResponse.json({
        success: false,
        message: 'food id not found'
      });
    }


    const senderid = await DonatedFoodModel.findById(foodid).populate('donorOfThisFood', '_id')
    const sender = await Usermodel.findById(senderid.donorOfThisFood._id)
    sender.notifications.push(`soon collector will receving your food`)
    await sender.save()

    const receiver = await Usermodel.findByIdAndUpdate(
      userid,
      {
        $push: { receivedfoods: foodid },
        $pull: { RequestToReceiveFoods: foodid }
      },
      { new: true, select: "-password" }
    );

    const newfood = await DonatedFoodModel.findByIdAndUpdate(
      foodid,
      {
        status: `Receiving by ${receiver.name}`,
        pickedBy: receiver._id,
        applicantNGO: []
      },
      { new: true }
    );


    const receiversDetails = await DonatedFoodModel.findById(foodid).populate({
      path: 'pickedBy',
      select: 'name email'
    });

    return NextResponse.json({
      success: true,
      message: 'receiving.......',
      receiversDetails,
    });
  } catch (error) {
    console.error("food getting error", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
};


export const receivedfoods = async (userid) => {
  try {
    if (!userid) {
      return NextResponse.json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const user = await Usermodel.findById(userid).populate('receivedfoods');

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Received foods fetched successfully',
      receivedfoods: user.receivedfoods,
    });

  } catch (error) {
    console.error("Error fetching received foods:", error.message);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}


export const receiveTheFoodbyCollector = async (foodid) => {
  try {
    if (!foodid) {
      return NextResponse.json({
        success: false,
        message: "no food id found"
      })
    }
    const food = await DonatedFoodModel.findByIdAndUpdate(foodid, { status: "received" }, { new: true })
    if (!food) {
      return NextResponse.json({
        success: false,
        message: "could not received"
      })
    }
    return NextResponse.json({
      success: true,
      message: 'food received'
    })
  } catch (error) {
    console.error("Error receiveing foods:", error.message);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}



export const postday = async (formdata, userid) => {
  try {
    const { title, content, image } = formdata
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


    const newDay = await DayModel.create({
      title, content, image, blogger: userid
    })

    return NextResponse.json({
      success: true,
      message: "day posted successfully"
    })

  } catch (error) {
    console.error("posting failed:", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }

}


export const viewDays = async () => {
  try {
    const days = await DayModel.find().populate('blogger', 'name image');

    return NextResponse.json({
      success: true,
      message: `found`,
      days,

    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}



export const showRequestedFoodToReveive = async (userid) => {
  try {
    const getfoods = await Usermodel.findById(userid).populate('RequestToReceiveFoods')
    if (!getfoods) {
      return NextResponse.json({
        success: false,
        message: `no food found`
      })
    }
    return NextResponse.json({
      success: true,
      message: `found`,
      foods: getfoods.RequestToReceiveFoods
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}


export const getAllDayPost = async (userid) => {
  try {

    const posts = await DayModel.find({ blogger: userid }).populate('blogger', 'name image');

    return NextResponse.json({
      success: true,
      message: posts.length > 0 ? "Posts found" : "No posts found",
      post: posts
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}


