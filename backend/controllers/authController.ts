require('dotenv').config();

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const secret1 = process.env.SECRET_KEY_1;

// get user model registered in Mongoose
const Team = mongoose.model("Team");
const Judge = mongoose.model("Judge");
const Admin = mongoose.model("Admin");

/*
 * Purpose: Create an account (any type)
 * Params (in the Request): username, password, and usertype ("team", "judge", or "admin")
 * Returns (in the Response): 
 *      Object with fields success and the corresponding results
 */
const signup = async (req: Request, res: Response) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const intendedUserType = req.body.usertype;

  // Check if user exists
  var user = await Team.findOne({ team_name: username });
    
  if (!user) {
    user = await Judge.findOne({ judge_name: username });
  }

  if (!user) {
    user = await Admin.findOne({ admin_name: username });
  }

  if (user) {
    return res.send({
      success: false,
      results: "Username already taken"
    });
  }

  var newuser;
  if (intendedUserType == "team") {
    const members = req.body.members.trim();

    newuser = new Team({
      team_name: username,
      password: password,
      members: members,
      score: 0,
      total_points_used: 0,
      
      active_buffs: [],
      activated_powerups: [],
      // applied_debuffs: [],
      // available_powerups: [],
      debuffs_received: [],
      // debuffs_from: []
    });
  }
  else if (intendedUserType == "judge") {
    newuser = new Judge({
      judge_name: username,
      password: password
    });
  }
  else if (intendedUserType == "admin") {
    newuser = new Admin({
      admin_name: username,
      password: password
    });
  }

  let results = await newuser.save();
    return res.send({
      success: true,
      results: results
  });
}

/*
 * Purpose: Login (checks all account types)
 * Params (in the Request): username, and password
 * Returns (in the Response): 
 *      Object with fields success, the corresponding results, and the token if login is successful
 */
const login = async (req: Request, res: Response) => {
    const username = req.body.username.trim();
    const inputPassword = req.body.password;
    var userType = ""
    var foundType = false;

    // Check if user exists
    var user = await Team.findOne({ team_name: username });
    
    if (user) {
      userType = "team"
      foundType = true;
    } else {
      user = await Judge.findOne({ judge_name: username });
    }

    if (!foundType) {
      if (user) {
        userType = "judge"
        foundType = true;
      } else {
        user = await Admin.findOne({ admin_name: username });
      }
    }

    if (!foundType) {
      if (user) {
        userType = "admin"
        foundType = true;
      } else {
        return res.send({
          success: false,
          results: "User does not exist"
        });
      }
    }
    
    // Check if password is correct
    user.comparePassword(inputPassword, (err: any, isMatch: boolean) => {
      if (err || !isMatch) {
        return res.send({
          success: false,
          results: "Wrong password"
        })
      }

      // Create a token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, secret1!);

      // create a new copy to properly remove the password in the response 
      let userCopy = ({...user}._doc);
      delete userCopy["password"];
      userCopy["usertype"] = userType;
      return res.send({
        success: true,
        token: token,
        results: userCopy
      });
    });

    // Code block if password is not hashed or encrypted in any form
    // if (user.password != inputPassword) {
    //   res.send({
    //     success: false,
    //     results: "Wrong password"
    //   })
    //   return;
    // }

  }

  /*
 * Purpose: Check if user is logged in 
 * Note: This particular endpoint may not be used, just copy relevant code blocks and paste in the appropriate endpoints
 * Params (in the Request): The "authToken" cookie will be checked
 * Returns (in the Response): 
 *      Object with field isLoggedIn
 */
const checkIfLoggedIn = (req: Request, res: Response) => {

  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(
    req.cookies.authToken,
    secret1!,
    async (err: any, tokenPayload: any) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userId = tokenPayload._id;

      // Check if user exists
      const user = await Team.findById(userId);
      if (!user) {
        // Scenario 3: FAIL - Failed to find user based on id inside token payload
        return res.send({ isLoggedIn: false });
      } else {
        // Scenario 4: SUCCESS - token and user id are valid
        return res.send({ isLoggedIn: true });
      }
    });
}

export { signup, login, checkIfLoggedIn };