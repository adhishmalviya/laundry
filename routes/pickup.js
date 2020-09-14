const express = require("express");
const router = express.Router();
const Pickup = require("../models/pickup");

router.post("/add", (req, res) => {
    const newPickup = new Pickup({
      username: req.body.username,
      slot: req.body.slot,
      quantity: req.body.quantity,
      shopemail: req.body.shopemail,
      useremail: req.body.useremail,
      storename:req.body.storename,
      paymentMode: req.body.paymentmethod,
      isPaid: req.body.isPaid,
    });

    newPickup
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get("/",(req,res)=>{
  let find = Pickup.find({shopemail:req.query.shopemail}).then(result=>{
    res.send(result);
  }).catch(err=>{
    res.send(err);
  })

})

router.get("/",(req,res)=>{
  let find = Pickup.find({useremail:req.query.useremail}).then(result=>{
    res.send(result);
  }).catch(err=>{
    res.send(err);
  })

})

module.exports = router;