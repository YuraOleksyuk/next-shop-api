import express from 'express';

const productRouter = express.Router();

import {
  createProduct,
  deleteProductByID,
  getAllProducts,
  getProductByCategorySlug,
  getProductBySlug,
  updateProductById
} from "../controllers/product.controller";

const productPath = '/product';

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags: [Product]
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Provide categoryId to return products related to category
 *       - in: query
 *         name: categorySlug
 *         schema:
 *           type: string
 *         required: false
 *         description: Provide categorySlug to return products related to category
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
productRouter.get(productPath, getAllProducts);

/**
 * @swagger
 * /api/product/category-slug/{slug}:
 *   get:
 *     tags: [Product]
 *     description: Get products by category slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Returns products array related to category (slug)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns products array related to category (slug).
 *       404:
 *         description: Products not found.
 */
productRouter.get(`${productPath}/category-slug/:slug`, getProductByCategorySlug);

/**
 * @swagger
 * /api/product/slug/{slug}:
 *   get:
 *     tags: [Product]
 *     description: Get product by slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Single product slug to get Product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns product related to slug.
 *       404:
 *         description: Product not found.
 */
productRouter.get(`${productPath}/slug/:slug`, getProductBySlug);

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
productRouter.post(productPath, createProduct);

/**
 * @openapi
 * /api/product/{id}:
 *   delete:
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID.
 *         schema:
 *           type: string
 *     description: Delete product by ID.
 *     responses:
 *       200:
 *         description: Returns deleted product.
 */
productRouter.delete(`${productPath}/:id`, deleteProductByID);

/**
 * @openapi
 * /api/product/{id}:
 *   put:
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Single product slug to get Product
 *         schema:
 *           type: string
 *     description: Create new product.
 *     responses:
 *       200:
 *         description: Returns created product.
 */
productRouter.put(`${productPath}/:id`, updateProductById)

export default productRouter;
