const mongoose = require('mongoose');

async function connectToDb(){
    await mongoose.connect("mongodb+srv://Guri:y7DHxQRPAbOJ4vTu@cluster0.1kofk9g.mongodb.net/day-7")
    console.log("connected to db")
}

module.exports = connectToDb