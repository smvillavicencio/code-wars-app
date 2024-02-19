import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const TeamSchema = new mongoose.Schema({
  team_name: { type: String, required: true },
  password: { type: String, required: true },
  members: { type: String, required: true },
  score: { type: Number, required: true },
  total_points_used: { type: Number, required: true },
  
  activated_buffs: { type: [String], required: true },
  activated_own_debuffs: { type: [String], required: true },
  applied_debuffs_to: { type: [String], required: true },
  available_powerups: { type: [String], required: true },
  debuffs_afflicted: { type: [String], required: true },
  debuffs_from: { type: [String], required: true }
});

/*
 * Purpose: Pre middleware function for hashing the password of a newly created instance
 */
TeamSchema.pre("save", function(next) {
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
TeamSchema.methods.comparePassword = function(password: any, callback: any) {
    bcrypt.compare(password, this.password, callback);
}

mongoose.model("Team", TeamSchema);