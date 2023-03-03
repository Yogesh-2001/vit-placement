import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    photourl: {
      type: String,
    },
    resume: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      default: Date.now,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      match: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    placed: {
      type: Boolean,
      default: false,
    },
    placedData: {
      type: Array,
    },
    sscschoolname: { type: String, required: true },
    class10th: { type: Number, required: true },
    hsccollege: { type: String, required: true },
    class12th: { type: Number, required: true },
    engcollege: { type: String, required: true },
    branch: { type: String, required: true },
    engineering_division: { type: String, required: true },
    engineeringpercent: { type: Number, required: true },
    engineeringAggrpercent: { type: Number, required: true },
    liveKt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("profile-details", profileSchema);
