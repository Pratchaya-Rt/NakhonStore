import express from "express";
import formiable from 'express-formidable'

//middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkid.js";

//controllers
import { addProduct, addProductReview, fetchAllProducts, fetchNewProducts, fetchProductById, fetchProducts, fetchTopProducts, removeProduct, updateProductDetails, filterProducts } from "../controllers/productController.js";


const router = express.Router()

router
    .route('/')
    .get(fetchProducts) 
    .post(authenticate, authorizeAdmin, formiable(), addProduct)


router.route('/allproducts').get(fetchAllProducts)

router.route('/:id/reviews').post(authenticate,checkId, addProductReview)

router.get('/top' ,fetchTopProducts)
router.get("/new", fetchNewProducts);


router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, formiable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct)

router.route("/filtered-products").post(filterProducts)

export default router