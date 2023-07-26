import express from "express";
import {createOrder} from "../controllers/order.controller";

const orderRouter = express.router();
const orderPath = '/order';


/**
 * @openapi
 * /api/order:
 *   post:
 *     tags: [Order]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/order'
 *     description: Create new order.
 *     responses:
 *       200:
 *         description: Returns created product.
 */
orderRouter.post(`${orderPath}`, createOrder)

export default orderRouter