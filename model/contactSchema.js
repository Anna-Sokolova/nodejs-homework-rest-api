const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

contactSchema.virtual("info").get(function () {
  return `The Contact ${this.name} has email: ${this.email} and phone: ${this.phone} `;
});


const Contact = model("contact", contactSchema);

module.exports = Contact;
