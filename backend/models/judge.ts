import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const JudgeSchema = new mongoose.Schema({
  judge_name: { type: String, required: true },
  password: { type: String, required: true }
});

JudgeSchema.pre("save", function(next) {
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

JudgeSchema.methods.comparePassword = function(password: any, callback: any) {
  bcrypt.compare(password, this.password, callback);
}

mongoose.model("Judge", JudgeSchema);