const router = require("express").Router();
const User = require("./userModel");

router
  .route("/")
  .post(async (req, res, next) => {
    try {
      if (
        !req.body.email ||
        !req.body.name ||
        !req.body.phone ||
        !req.body.department
      ) {
        throw new Error("email, phone, name and department are required");
      }

      let user = await User.findOne({
        email: req.body.email,
      }).exec();

      if (user) throw new Error("User with email already exists");

      user = new User({
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        department: req.body.department,
      });

      await user.save();
      console.log("User Created");
      res.status(201).json({
        type: "success",
        message: "User Created",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        type: "error",
        message: error.message,
      });
    }
  })
  .get(async (req, res, next) => {
    try {
      const users = await User.find().exec();
      console.log(users);
      res.status(200).json({
        totalUsers: users.length,
        users,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        type: "error",
        message: error.message,
      });
    }
  });

module.exports = router;
