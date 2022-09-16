const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name: {
        type: String,
        required: [true, 'please entered product name']
    },
    description: {
        type: String,
        required: [true, 'please entered product discription']
    },
    price: {
        type: Number,
        required: [true, 'please entered product price'],
        maxLength: [8, 'price cannot exceed 8 characters']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    }],
    category: {
        type: String,
        required: [true, 'please entered product category']
    },
    stock: {
        type: Number,
        required: [true, 'please entered product category'],
        maxLength: [4, "stock cannot exceed 4 character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("productDatabase", productSchema)