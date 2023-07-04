import express from 'express';

const productRouter = express.Router();
import ProductSchema from "../models/Product";
import mongoose, {isValidObjectId} from "mongoose";
import CategorySchema from "../models/Category";

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
productRouter.get(productPath, async (req, res) => {
  console.log('categoryId > ', req.query.categoryId)
  try {
    let querySchema = {};
    
    const categoryId = req.query.categoryId;
    const categorySlug = req.query.categorySlug;
    
    if (categoryId) {
      if (!isValidObjectId(categoryId)) {
        res.status(404).json({ message: 'Typo in categoryId' })
        return;
      }
      
      querySchema = {
        category: categoryId
      };
    }
    
    if (categorySlug) {
      const category = await CategorySchema.findOne({slug: categorySlug})

      if (category === null) {
        res.status(404).json({message: 'Not Found'});
        return;
      }
      
      if (category) {
        querySchema = {
          category: category.id
        }
      }
    }
    
    const products = await ProductSchema.find(querySchema);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 * /api/product/slug:
 *   get:
 *     tags: [Product]
 *     description: Get product by slug.
 *     parameters:
 *       - in: query
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug of the product to get Product
 *     responses:
 *       200:
 *         description: Returns product related to slug.
 *       404:
 *         description: Product not found.
 */
productRouter.get(`${productPath}/slug`, async (req, res) => {
  const productSlug = req.query.slug;

  try {
    const product = await ProductSchema.findOne({ slug: productSlug });

    if (product === null) {
      res.status(404).json({message: 'Not Found'});
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
