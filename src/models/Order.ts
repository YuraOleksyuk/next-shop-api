import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userInfo: {
      type: Object,
      required: true,
      unique: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }
    ],
    address: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      default: "pending"
    }
  }, {
    timestamps: true
  }
);

export default mongoose.model("Order", OrderSchema);
