const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickupSchema = new Schema({
  username: {
    type: String,
  },
  slot: {
    type: String,
  },
  storename: {
    type: String,
  },
  shopemail: {
    type: String,
  },
  useremail: {
    type: String,
  },
  paymentMode: {
    type: String,
    default: "Cash On Delivery",
    // required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    // required: true,
  },
});

const Pickup = mongoose.model("Pickup", pickupSchema);
module.exports = Pickup;
