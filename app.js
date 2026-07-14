const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
 
const app = express()
app.use(cors())
app.use(express.json())
 
// connection
mongoose.connect("mongodb://Amritha:Amritha043@ac-o22rub6-shard-00-00.trbtgpr.mongodb.net:27017,ac-o22rub6-shard-00-01.trbtgpr.mongodb.net:27017,ac-o22rub6-shard-00-02.trbtgpr.mongodb.net:27017/?ssl=true&replicaSet=atlas-bu3c5t-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("MongoDB connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)
 
const EvCharging = mongoose.model("booking", new mongoose.Schema({
    booking_id: Number,
    owner_name: String,
    email: String,
    phone: String,
    vehicle_registration_number: String,
    vehicle_brand: String,
    vehicle_model: String,
    battery_capacity_kwh: Number,
    connector_type: String,
    charging_date: String,
    time_slot: String,
    estimated_units_kwh: Number,
    charging_bay_number: String
}));
 
app.post("/add-booking", async (req, res) => {
    await EvCharging.create(req.body)
    res.json({ "status": "success" })
})
 
app.get("/view-booking", async (req, res) => {
    const bookings = await EvCharging.find()
    res.json(bookings)
})
 
app.listen(3002, () => {
    console.log("server started")
})