require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/database.js");

const {
    testValidation,
    createProducts,
    getAllProducts,
    getElectronicsProducts,
    getProductsUnder1000,
    updateP02,
    updateStationeryStock,
    deleteP04,
    verifyP04Deleted
} = require("./services/productService.js");


async function main() {

    try {

        // Q1: Connect to MongoDB Atlas
        await connectDB();


        // Q2(d): Test validation
        await testValidation();


        // Q3(A): CREATE
        await createProducts();


        // Q3(B): READ
        // All reads must happen BEFORE updates and deletion.

        await getAllProducts();

        await getElectronicsProducts();

        await getProductsUnder1000();


        // Q3(C): UPDATE

        await updateP02();

        await updateStationeryStock();


        // Q3(D): DELETE

        await deleteP04();

        await verifyP04Deleted();


        console.log("\n========== PRACTICAL COMPLETED ==========");

    } catch (error) {

        console.error("\nOperation failed:");
        console.error(error.message);

    } finally {

        // Q1(c): Close connection
        await mongoose.connection.close();

        console.log("MongoDB connection closed.");
    }
}


main();