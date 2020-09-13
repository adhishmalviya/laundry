const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const Shop = require("../models/laundryshop");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Working...");
});
router.post("/", async (req, res) => {
  const customer = await Customer.findOne({ email: req.body.username });
  if (customer) {
    bcrypt.compare(req.body.password, customer.password, (err, result) => {
      if (result) {
        res.send("Logged In, Customer");
      } else {
        res.send("Wrong Password, Customer..");
      }
    });
  }
  const shop = await Shop.findOne({ email: req.body.username });
  if (shop) {
    bcrypt.compare(req.body.password, shop.password, (err, result) => {
      if (result) {
        res.send("You are a shop, Logged In");
      } else {
        res.send("Wrong Password, Shop");
      }
    });
  }
});
module.exports = router;
