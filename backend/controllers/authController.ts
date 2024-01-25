import { Request, Response } from 'express';
import mongoose from 'mongoose';

// get user model registered in Mongoose
const Judge = mongoose.model("Judge");

const login = async (req: Request, res: Response) => {
    const username = req.body.username.trim();
    const password = req.body.password;

    const results = await Judge.find();
    res.send( {message: "List of Judges" , results: results} );
    // Judge.findOne({ username }, (err: any, user: any) => {
    //   // check if user exists
    //   if (err || !user) {
    //     //  Scenario 1: FAIL - User doesn't exist
    //     console.log("User doesn't exist");
    //     return res.send({ success: false });
    //   }
  
    //   // check if password is correct
    //   user.comparePassword(password, (err: any, isMatch: boolean) => {
    //     if (err || !isMatch) {
    //       // Scenario 2: FAIL - Wrong password
    //       console.log("Wrong password");
    //       return res.send({ success: false });
    //     }
  
    //     console.log("Successfully logged in");
  
    //     // // Scenario 3: SUCCESS - time to create a token
    //     // const tokenPayload = {
    //     //   _id: user._id
    //     // }
  
    //     // const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");
  
    //     // // return the token to the client
    //     // return res.send({ success: true, token, username: user.name, email: user.email });
        
    //     return res.send({ success: true, username: user.name })  
    //   })
    // })
  }

export { login };