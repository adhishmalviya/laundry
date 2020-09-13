const express = require("express");
const router = express.Router();
const Shop = require("../models/laundryshop");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
router.get("/", (req, res) => {
  Shop.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/registershop", upload.single("image"), async (req, res) => {
  let newShop = new Shop({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    address: req.body.address,
    price: req.body.price,
    OpeningTime: req.body.OpeningTime,
    ClosingTime: req.body.ClosingTime,
    // img: {
    //   data: fs.readFileSync(
    //     path.join(__dirname, "../", "/uploads/" + req.file.filename)
    //   ),
    //   contentType: "image/png",
    // },
    imagename: req.file.filename,
    geometry: { type: "Point", coordinates: [req.body.lat, req.body.lng] },
  });
  const salt = await bcrypt.genSalt(14);
  newShop.password = await bcrypt.hash(newShop.password, salt);
  // console.log("Register shop route is running..");
  // newShop = await newShop.save();
  newShop
    .save()
    .then((result) => {
      const token = jwt.sign({ name: newShop.name, isShop: true }, "Adhish");
      res.status(200).json({ token });
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post("/login", (req, res, next) => {
//   Shop.find({ phoneNumber: req.body.phoneNumber })
//     .exec()
//     .then((shop) => {
//       if (shop.length < 1) {
//         return res.status(401).json({
//           message: "Auth failed",
//         });
//       }
//       bcrypt.compare(req.body.password, shop[0].password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Auth failed",
//           });
//         }
//         if (result) {
//           const token = jwt.sign(
//             {
//               email: shop[0].email,
//               shopId: shop[0]._id,
//             },
//             "somethingsecret",
//             {
//               expiresIn: "7 days",
//             }
//           );
//           return res.status(200).json({
//             message: "Auth successful",
//             token: token,
//           });
//         }
//         res.status(401).json({
//           message: "Auth failed",
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   Shop.findById({ _id: id })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// router.patch("/:myid", auth, (req, res, next) => {
//   const id = req.params.myid;
//   const shop = Shop.findById({ _id: id });
//   if ((req.shop = id)) {
//     const updateOps = {};
//     for (const ops of req.body) {
//       updateOps[ops.propName] = ops.value;
//     }
//     Shop.update({ _id: id }, { $set: updateOps })
//       .exec()
//       .then((result) => {
//         res.status(200).json({
//           message: "Product updated",
//           result: result,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           error: err,
//         });
//       });
//   } else {
//     res.json("permission denied");
//   }
// });

// router.delete("/:myid", auth, (req, res) => {
//   const id = req.params.myid;
//   const shop = Shop.findById({ _id: id });
//   if ((req.shop = id)) {
//     Shop.remove({ id: req.body.id })
//       .then((result) => {
//         res.json({
//           status: "deleted succesfully",
//           result: result,
//         });
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   } else {
//     res.json("permission denied");
//   }
// });

module.exports = router;
