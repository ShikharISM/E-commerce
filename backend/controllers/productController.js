import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// const cloudinary = connectCloudinary()
//Route to add a product (POST)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Collect uploaded files
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(item=>item!==undefined);
    console.log(images);
    
    // Upload to cloudinary
    const imagesURL = await Promise.all(
    images.map(async(item) => {
        const result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
        });
        return result.secure_url;  // only return the URL
    })
    );

    // res.json({ urls: imagesURL }); // send response once


    // Prepare data
    const productData = {
      name,
      description,
      price: parseInt(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes), // because sizes were sent as stringified array
      image: imagesURL,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
}

//Route to remove a product (POST)
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed Successfully"})
        
    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
}

//Route to display product List (GET)
const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({}) // GIVES ALL THE PRODUCTS IN THE DATABASE
        res.json({success:true,products});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

//Route to display a single product (POST)
const singleProduct = async (req,res)=>{
     try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});

     } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
     }
}

export {
    addProduct,
    removeProduct,
    listProducts,
    singleProduct,
}

