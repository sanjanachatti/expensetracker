// Controller will have the logic

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// API called during login
exports.validUser = async (req, res) => {
  try {
    console.log("validUser", req.body);
    await User.find({ email: req.body.email })
      .then(async (existinguser) => {
        console.log("data of records if exists", existinguser);
        if (existinguser.length > 0) {
          const returnD = {
            error: true,
            message: "Invalid User"
          };
          const oldHashedPassword = existinguser[0].password;
          // Compare sync to know if the password match or not
          const valid = await bcrypt.compareSync(
            req.body.password.toString(),
            oldHashedPassword
          );
          console.log("Password Response", valid);
          // Password match, creating a token
          if (valid) {
            returnD.accessToken = jwt.sign(
              {
                userid: existinguser[0]._id,
                username: existinguser[0].username,
                email: existinguser[0].email
              },
              accessTokenSecret
            );
            returnD.error = false;
            returnD.message = "Valid user";
          } else {
            returnD.message = "Incorrect Password";
          }
          return res.status(200).send(returnD);
        } else {
          // user not found
          return res
            .status(200)
            .send({ error: true, message: "User not found" });
        }
      })
      .catch((err) => {
        console.log("User find error", err);
        return res
          .status(500)
          .send({ error: true, message: "User login failed", err });
      });
  } catch (errcatch) {
    console.log("createUser", errcatch);
    return res
      .status(500)
      .send({ error: true, message: "User login failed", err: errcatch });
  }
};


// API called during Registration
exports.createUser = async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password.toString(), 10)
    };
    console.log("createUser", userData);
    // data does to 'user'
    const user = new User(userData); 
    await User.find({ email: req.body.email }) // when a user signs up
      .then(async (existinguser) => {
        console.log("data of records if already exists", existinguser);
        if (existinguser.length > 0) {
          return res
            .status(200)
            .send({ error: true, message: "User already exist" });
        } else {  //else, user is created
          // to insert the record into mongodb
          await user
            .save()
            .then((doc) => {
              console.log("User created successfully", doc);
              return res
                .status(200)
                .send({ error: false, message: "User created" });
            })
            // if there's an error on server side, then catch
            .catch((err) => {
              console.log("User add error", err);
              return res
                .status(500)
                .send({ error: true, message: "User Creation failed", err });
            });
        }
      })
      // if there's an error on server side, then catch
      .catch((err) => {
        console.log("User find error", err);
        return res
          .status(500)
          .send({ error: true, message: "User Creation failed", err });
      });
      // if there's an error on server side, then catch
  } catch (errcatch) {
    console.log("createUser", errcatch);
    return res
      .status(500)
      .send({ error: true, message: "User Creation failed", err: errcatch });
  }
};
