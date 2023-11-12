const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 characters"]
    },
    platform: {
        type: String,
        required: [true, "Platform is required"],
        minlength: [1, "Platform must be at least 1 characters"]
    },
    purchaseDate: {
        type: String,
        required: [true, "Date is required"],
        minlength: [5, "Date must be at least 5 characters"]
    },
    notes: {
        type: String,
        required: [true, "Notes are required"],
        minlength: [10, "Notes must be at least 10 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be at least 1 dollar"]
    }
}, {timestamps: true});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;