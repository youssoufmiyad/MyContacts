import mongoose from "mongoose";
import { PHONE_REGEX } from "../utils/regex.js";
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
    required: true,
    validate: {
      validator: function(v) {
        return PHONE_REGEX.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    },
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
