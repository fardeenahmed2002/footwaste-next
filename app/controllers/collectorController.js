import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"

export const getalldonatedfoodpost = async () => {
  try {
    const posts = await DonatedFoodModel.find().sort({ createdAt: -1 }).populate({ path: 'pickedBy', select: 'name' })
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

    const receiver = await Usermodel.findById(userid).select('-password');

    receiver.receivedfoods?.push(foodid)
    await receiver.save();

    const newfood = await DonatedFoodModel.findByIdAndUpdate(
      foodid,
      {
        status: "receiving...",
        pickedBy: receiver._id
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
        message: "could no received"
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