import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
  admin_name: { type: String, required: true },
  password: { type: String, required: true }
});

/*
 * Purpose: Pre middleware function for hashing the password of a newly created instance
 */
AdminSchema.pre("save", function(next) {
    const user = this;

    if (!user.isModified("password")) return next();

    return bcrypt.genSalt((saltError: any, salt: any) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError: any, hash: any) => {
        if (hashError) { return next(hashError); }

        user.password = hash;
        return next();
        });
    });
});

/*
 * Purpose: Function for checking if input password corresponds to the user's hashed password
 */
AdminSchema.methods.comparePassword = function(password: any, callback: any) {
    bcrypt.compare(password, this.password, callback);
}

mongoose.model("Admin", AdminSchema);