import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    thumb: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    price: {
      type: Number
    },
  }, {
    timestamps: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    }
  }
);

export default mongoose.model("Product", ProductSchema);
