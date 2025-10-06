import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  slug: { // Pour le routage
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Contact", contactSchema);
