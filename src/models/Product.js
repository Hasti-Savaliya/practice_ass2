const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ["Electronics", "Stationery"]
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        },

        supplierCity: {
            type: String,
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: "products"
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;