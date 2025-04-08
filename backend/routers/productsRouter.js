import express from "express";
const router = express.Router();

// import post controller
import productController from "../controllers/productController.js";

// route -> index
router.get("/", productController.index);

//rotta per ordini
router.get("/orders", productController.indexOrders);

// Nuova rotta per filtrare per bestsellers
router.get("/bestsellers", productController.bestsellers);

// Nuova rotta per filtrare per newarrivals
router.get("/newarrivals", productController.newarrivals);

// Nuova rotta per filtrare per bestseller
router.get("/bestseller", productController.bestseller);

// Nuova rotta per filtrare per newarrival
router.get("/newarrival", productController.newarrival);

//Rotta Search
router.get("/search", productController.search);

//Rotta correlati
// router.get('/related', productController.related);
router.get("/related", productController.related);

// Nuova rotta per filtrare per categoria
router.get("/category", productController.category);

// rotta -> coupon
router.get("/coupons", productController.getCoupon);
// route -> show
router.get("/:slug", productController.show);

//Rotta per creazione nuovo ordine
router.post("/orders", productController.store);

//Rotta per store della Pivot
router.post("/product_order", productController.storePivot);

// Add this to your router file
router.post("/checkout", productController.checkout);

//update prezzo totale
router.put("/update-orders", productController.update);

export default router;
