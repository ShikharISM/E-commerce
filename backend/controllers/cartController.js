import User from "../models/userModel.js"; // your user model

// Add product to user cart
const addToCart = async (req, res) => {
  try {
    // const userId = req.userId || req.body.userId;
    const { userId, itemId, size } = req.body;
    console.log("addToCart req:", { userId, itemId, size });
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId missing" });
    }
    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "itemId or size missing" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = await user.cartData
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      }
      else {
        cartData[itemId][size] = 1
      }
    }
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    await User.findByIdAndUpdate(userId, { cartData })

    return res.json({ success: true, message: "Added to Cart", cartData: user.cartData });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId missing" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (quantity > 0) {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    } else {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    // ✅ Return the updated document by adding { new: true }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("updateCart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const {userId} = req.body
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId missing" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    let cartData = await user.cartData

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("getUserCart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
