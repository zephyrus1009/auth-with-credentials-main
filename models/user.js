import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
  // với timestamps true thì data được tạo sẽ có thêm info về thời gian tạo.
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
