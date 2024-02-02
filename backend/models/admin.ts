import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
  admin_name: { type: String, required: true },
  password: { type: String, required: true }
});

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
  
AdminSchema.methods.comparePassword = function(password: any, callback: any) {
    bcrypt.compare(password, this.password, callback);
}

mongoose.model("Admin", AdminSchema);