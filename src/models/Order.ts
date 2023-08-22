import * as mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    accountData: {
      type: Object,
      required: true,
    },
    shoppingCart: [
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
    shippingData: {
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
