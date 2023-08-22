import OrderSchema from "../models/Order";

export const createOrder = async (req, res) => {
    const orderData = req.body;
    const newOrder = new OrderSchema(orderData);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}