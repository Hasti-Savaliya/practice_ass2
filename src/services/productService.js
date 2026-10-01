const Product = require("../models/Product");


// Q2(d)
// Test invalid product with price = -100
async function testValidation() {
    console.log("\n========== Q2(d): VALIDATION TEST ==========");

    const invalidProduct = new Product({
        productId: "TEST",
        name: "Test Product",
        category: "Electronics",
        price: -100,
        stock: 10,
        supplierCity: "Surat"
    });

    try {
        await invalidProduct.save();
        console.log("Invalid product was inserted.");
    } catch (error) {
        console.log("Validation Error:");
        console.log(error.message);
        console.log("Invalid product was NOT inserted.");
    }
}


// Q3(A)
// Insert five products
async function createProducts() {
    console.log("\n========== Q3(A): CREATE ==========");

    const products = [
        {
            productId: "P01",
            name: "Keyboard",
            category: "Electronics",
            price: 1200,
            stock: 15,
            supplierCity: "Surat"
        },
        {
            productId: "P02",
            name: "Mouse",
            category: "Electronics",
            price: 650,
            stock: 5,
            supplierCity: "Ahmedabad"
        },
        {
            productId: "P03",
            name: "Notebook",
            category: "Stationery",
            price: 80,
            stock: 50,
            supplierCity: "Surat"
        },
        {
            productId: "P04",
            name: "Headphones",
            category: "Electronics",
            price: 1800,
            stock: 0,
            supplierCity: "Vadodara"
        },
        {
            productId: "P05",
            name: "Pen Set",
            category: "Stationery",
            price: 150,
            stock: 8,
            supplierCity: "Rajkot"
        }
    ];

    const insertedProducts = await Product.insertMany(products);

    console.log("Inserted products:");
    console.log(insertedProducts);
}


// Q3(B)(a)
// Display all products
async function getAllProducts() {
    console.log("\n========== Q3(B)(a): ALL PRODUCTS ==========");

    const products = await Product.find();

    console.log(products);
}


// Q3(B)(b)
// Display Electronics products
async function getElectronicsProducts() {
    console.log("\n========== Q3(B)(b): ELECTRONICS ==========");

    const products = await Product.find({
        category: "Electronics"
    });

    console.log(products);
}


// Q3(B)(c)
// Price <= 1000, sorted lowest to highest
async function getProductsUnder1000() {
    console.log("\n========== Q3(B)(c): PRICE <= 1000 ==========");

    const products = await Product.find({
        price: { $lte: 1000 }
    }).sort({
        price: 1
    });

    console.log(products);
}


// Q3(C)(a)
// Change P02 price from 650 to 700
async function updateP02() {
    console.log("\n========== Q3(C)(a): UPDATE P02 ==========");

    const updatedProduct = await Product.findOneAndUpdate(
        { productId: "P02" },
        { $set: { price: 700 } },
        { new: true }
    );

    console.log("Updated P02:");
    console.log(updatedProduct);
}


// Q3(C)(b)
// Increase Stationery stock by 10
async function updateStationeryStock() {
    console.log("\n========== Q3(C)(b): UPDATE STATIONERY STOCK ==========");

    await Product.updateMany(
        { category: "Stationery" },
        { $inc: { stock: 10 } }
    );

    const updatedProducts = await Product.find({
        category: "Stationery"
    });

    console.log("Updated Stationery products:");
    console.log(updatedProducts);
}


// Q3(D)(a)
// Delete P04
async function deleteP04() {
    console.log("\n========== Q3(D)(a): DELETE P04 ==========");

    const deletedProduct = await Product.findOneAndDelete({
        productId: "P04"
    });

    console.log("Deleted product:");
    console.log(deletedProduct);
}


// Verify P04 no longer exists
async function verifyP04Deleted() {
    console.log("\n========== VERIFY P04 DELETION ==========");

    const product = await Product.findOne({
        productId: "P04"
    });

    if (product === null) {
        console.log("P04 no longer exists.");
    } else {
        console.log("P04 still exists:");
        console.log(product);
    }
}


module.exports = {
    testValidation,
    createProducts,
    getAllProducts,
    getElectronicsProducts,
    getProductsUnder1000,
    updateP02,
    updateStationeryStock,
    deleteP04,
    verifyP04Deleted
};