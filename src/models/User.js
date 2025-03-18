const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  created_at: { type: Date, default: Date.now },
  addresses: { type: [AddressSchema], default: [] }
});

module.exports = mongoose.model("User", UserSchema);
