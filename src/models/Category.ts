import * as mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    icon: {
      type: String
    },
    color: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    }
  }
);

export default mongoose.model('Category', CategorySchema);
