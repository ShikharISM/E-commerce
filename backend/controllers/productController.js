import cloudinary from '../config/cloudinary.js'
import productModel from '../models/productModel.js'

//Route to add a product (POST)
const addProduct = async (req,res)=>{
   try {
      const {name,description,price,category,subCategory,sizes,bestseller} = req.body;
      
      // getting all the images from the req.files field
      const image1 = req.files.image1  &&  req.files.image1[0];
      const image2 = req.files.image2  && req.files.image2[0];
      const image3 = req.files.image3  && req.files.image3[0];
      const image4 = req.files.image4 &&  req.files.image4[0];
 
      const images = [image1,image2,image3,image4].filter((item) => item!== undefined) // upload those images which are present 

      // To upload the images on the cloudinary and get the url to store it in our database

      //Promise.all is a method that runs multiple promises in parallel
      const imagesURL = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
            return result.secure_url
        })
      )
      // adding it to the db
      const productData = {
        name,
        description,
        price:parseInt(price),
        category,
        subCategory,
        bestseller: bestseller === 'true' ? true : false,
        sizes: JSON.parse(sizes), // we cannot send the array directly as form data
        image: imagesURL,
        date: Date.now(),
      }
      console.log(productData);

      const product = new productModel(productData)
      await product.save()

      res.json({success:true, message:"Product Added Successfully"})

   } catch (error) {
      console.log(error);
      res.json({success:false, message:error.message});
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

