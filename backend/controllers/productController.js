import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";


//! เพิ่มสินค้า
const addProduct = asyncHandler(async(req, res) =>{
    try {
        const { name,image, description, price, category, quantity, brand } = req.fields;
       
        //Validation    
        switch (true) {
            case !name:
                return res.json({error: "กรุณากรอกชื่อสินค้าใหม่"})
            // case !image:
            //     return res.json({error: "กรุณากรอกใส่รูปภาพสินค้า"})
            case !description:
                return res.json({error: "กรุณากรอกคำอธิบายสินค้า"})
            case !price:
                return res.json({error: "กรุณากรอกราคาสินค้า"})
            case !category:
                return res.json({error: "กรุณากรอกหมวดหมู่สินค้า"})
            case !quantity:
                return res.json({error: "กรุณากรอกจำนวนสินค้า"})
            case !brand:
                return res.json({error: "กรุณากรอกแบรนด์สินค้า"})
        }

        const product = new Product({...req.fields})
        await product.save()
        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});

//!-----------------------------------

//! อัพเดทสินค้า
const updateProductDetails = asyncHandler(async(req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
       
        //Validation    
        switch (true) {
            case !name:
                return res.json({error: "กรุณากรอกชื่อสินค้าใหม่"})
            case !description:
                return res.json({error: "กรุณากรอกคำอธิบายสินค้า"})
            case !price:
                return res.json({error: "กรุณากรอกราคาสินค้า"})
            case !category:
                return res.json({error: "กรุณากรอกหมวดหมู่สินค้า"})
            case !quantity:
                return res.json({error: "กรุณากรอกจำนวนสินค้า"})
            case !brand:
                return res.json({error: "กรุณากรอกแบรนด์สินค้า"})
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true})

        await product.save()
        
        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})
//!-----------------------------------

//! ลบสินค้า
const removeProduct = asyncHandler(async(req, res) => {
    try {
        
        const product = await Product.findByIdAndDelete(req.params.id)

        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
})

//!-----------------------------------


const fetchProducts = asyncHandler(async(req, res) =>{
    try {
        const pageSize = 6
        const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $option: 'i' }} : {} ;
        
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)
   
        res.json({products, page: 1, pages: Math.ceil(count / pageSize), hasMore: false})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
})



//! get สินค้า โดย id
const fetchProductById = asyncHandler(async(req, res) =>{
    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            return res.json(product)
        } else {
            res.status(404)
            throw new Error("ไม่พบสินค้านี้1")
        }

    } catch (error) {
        console.error(error)
        res.status(404).json({error: "ไม่พบสินค้านี้2"})
    }
})

//!-----------------------------------

//! get สินค้าทั้งหมด
const fetchAllProducts = asyncHandler(async(req, res) =>{
    try {
         // ดึงข้อมูลสินค้าทั้งหมดจากคอลเล็กชัน Product
        const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1})
        // ทำสิ่งต่าง ๆ กับข้อมูลสินค้าที่ได้, ซึ่ง category จะถูก "populate" ให้เป็นข้อมูลจริง
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server Error"})
    }
})
//!-----------------------------------


//! เพิ่มรีวิว
const addProductReview = asyncHandler(async(req, res)=>{
    try {
        
        const {rating, comment} = req.body
        const product = await Product.findById(req.params.id)

        if (product) {

            //ดูว่าผู้ใช้เคยรีวิวไหม
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        
            if (alreadyReviewed) {
                res.status(400)
                throw new Error("สินค้าถูกรีวิวไปแล้ว")
            }
        
        //คนที่รีวิว คะแนน คอมเม้นต์ ไอดีผู้รีวิว
        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        //คะแนนรีวิว
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: "รีวิวถูกเพิ่มแล้ว"})
    
    }   else {
        res.status(404);
        throw new Error("ไม่พบสินค้า")
    }    

    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

//!-----------------------------------

//! สินค้ายอดนิยม (คะแนนมากสุด)
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

//! สินค้าล่าสุด
const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find().sort({ _id: -1 }).limit(5);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });


const filterProducts = asyncHandler(async(req, res) => {
    try {
        const { checked, radio } = req.body;
    
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    
        const products = await Product.find(args);
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
})


export { addProduct, updateProductDetails, removeProduct, fetchProducts ,fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts}