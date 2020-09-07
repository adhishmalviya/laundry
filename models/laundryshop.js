const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Geolocation Schema
// const GeoSchema = new Schema({
//   type: {
//     type: String,
//     default: "Point",
//   },
//   coordinates: {
//     type: [Number],
//     index: "2dsphere",
//   },
// });

const shopSchema = new Schema({
  name: {
    type: String,
    sparse: true,
    // required: true,
    unique: false,
  },
  email: {
    type: String,
    sparse: true,
    // required: true,
    unique: false,
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phoneNumber: {
    type: Number,
    sparse: true,
    // required: true,
    unique: false,
    // match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  },
  password: {
    type: String,
    sparse: true,
    //  required: true,
  },
  OpeningTime: {
    type: String,
    sparse: true,
    // required: true,
  },
  ClosingTime: {
    type: String,
    sparse: true,
    // required: true,
  },
  price: {
    type: String,
    sparse: true,
    // required: true
  },
  img: {
    data: Buffer,
    contentType: String,
    // required: true
  },
  geometry: { type: Number },
  role: {
    type: String,
    default: "store",
  },
  address: {
    type: String,
    sparse: true,
    // required: true,
    unique: false,
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
