import Category from '../models/categoryMedel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

//!สร้าง category
const createCategory = asyncHandler(async(req, res) =>{

    try {
        const { name } = req.body ;
        console.log(name);

        //ต้องระบุ name
        if (!name){
            return res.json({error: "กรุณาระบุชื่อหมวดหมู่สินค้า"})
        }

        //
        const existingCategory = await Category.findOne({name})
        if (existingCategory) {
            return res.status(400).send("มีชื่อหมวดหมู่นี้อยู่แล้ว")
        }

        const category = await new Category({name}).save()
        res.json(category)



    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
})



//! Update category
const updateCategory = asyncHandler(async(req, res) =>{
    try {
        const { name } = req.body;
        const {categoryId} = req.params;

        const category = await Category.findOne({_id: categoryId})

        if (!category) {
            return res.status(404).json({error: "ไม่พบหมวดหมู่สินค้านี้"})
        }

        category.name = name
        
        const updatedCategory = await category.save()
        res.json(updatedCategory)

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal sever error"})
    }
})


//! ลบ category
const removeCategory = asyncHandler(async(req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removed)

    } catch (error) {
        console.error(error);
    res.status(500).json({error: "Internal sever error"})
    }
})

//! ดู category ทั้งหมด
const listCategory = asyncHandler(async(req, res) =>{
    try {
        const all = await Category.find({})
        res.json(all)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async(req, res) =>{
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.json(category)


    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
})


export {createCategory, updateCategory, removeCategory, listCategory, readCategory} 