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
        const token = jwt.sign(
          { name: customer.username, isUser: true },
          "Adhish"
        );
        res.status(200).json({ token });
      } else {
        res.send("Wrong Password, Customer..");
      }
    });
  }
  const shop = await Shop.findOne({ email: req.body.username });
  if (shop) {
    bcrypt.compare(req.body.password, shop.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ name: shop.name, isShop: true }, "Adhish");
        console.log(shop.name);
        res.status(200).json({ token });
      } else {
        res.send("Wrong Password, Shop");
      }
    });
  }

  // res.send("Not Registered...");
});
module.exports = router;
