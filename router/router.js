const express = require("express");
const router = express.Router();

const clientController = require("../controllers/ClientController");
const productController = require("../controllers/ProductController");
const orderController = require("../controllers/OrderController");
const userController = require("../controllers/UserController");

const auth = require("../middleware/auth");

/**
 * CRUD routs of client
 */
router.post("/clients",auth, clientController.newClient);
router.get("/clients",auth, clientController.allClients);
router.get("/clients/:idClient", clientController.clientByID);
router.put("/clients/:idClient", clientController.updateClient)
router.delete("/clients/:idClient", clientController.deleteClient);
/**
 * CRUD routs of product
 */
router.post("/products",auth, productController.newProduct);
router.get("/products",auth, productController.allProducts);
router.get("/products/:idProduct", productController.productByID);
router.put("/products/:idProduct", productController.updateProduct);
router.delete("/products/:idProduct",productController.deleteProduct);
router.post("/products/search/:query", productController.searchProducts);
/**
 * CRUD routs of order
 */
router.post("/orders",auth, orderController.newOrder);
router.get("/orders",auth, orderController.allOrders);
router.get("/orders/:idOrder", orderController.orderByID);
router.put("/orders/:idOrder", orderController.updateOrder);
router.delete("/orders/:idOrder", orderController.deleteOrder);

/**
 * CRUD routs of users
 */
router.post("/createAccount",auth, userController.createAccount);
router.post("/signIn", userController.signIn);


module.exports = router;