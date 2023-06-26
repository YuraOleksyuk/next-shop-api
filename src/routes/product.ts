import express from 'express';

const productRouter = express.Router();
import ProductSchema from "../models/Product";
import mongoose from "mongoose";

const productPath = '/product';

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags: [Product]
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
productRouter.get(productPath, async (req, res) => {
  try {
    const products = await ProductSchema.find({})
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 * /api/product/slug/:slug:
 *   get:
 *     tags: [Product]
 *     description: Get product by slug.
 *     responses:
 *       200:
 *         description: Returns product related to slug.
 *       404:
 *         description: Product not found.
 */
productRouter.get(`${productPath}/slug/:slug`, async (req, res) => {
  const productSlug = req.params.slug;

  try {
    const product = await ProductSchema.findOne({ slug: productSlug });

    if (product === null) {
      res.status(404).json(product);
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 * /api/product:
 *   post:
 *     tags: [Product]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     description: Create new product.
 *     responses:
 *       200:
 *         description: Returns created product.
 */
productRouter.post(productPath, async (req, res) => {
  const newProduct = new ProductSchema({
    title: req.body.title,
    description: req.body.description,
    thumb: req.body.thumb,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    slug: req.body.slug
  })

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }

});

productRouter.delete(`${productPath}/:id`, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductSchema.deleteOne({ _id: productId });
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
})

productRouter.put(`${productPath}/:id`, async (req, res) => {
  const productId: string = req.params.id;

  console.log('productID > ', productId);
  // Product.updateOne(productId, )
})

export default productRouter;
