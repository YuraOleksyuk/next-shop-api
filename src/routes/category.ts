import express from "express";
import CategorySchema from "../models/Category";

const categoryRouter = express.Router();
const categoryPath = '/category';

/**
 * @openapi
 * /api/category:
 *   get:
 *     tags: [Category]
 *     description: Get list of categories.
 *     responses:
 *       200:
 *         description: Returns list of categories.
 */
categoryRouter.get(categoryPath, async (req, res) => {
  try {
    const categories = await CategorySchema.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 * /api/category:
 *   post:
 *     tags: [Category]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     description: Create new category.
 *     responses:
 *       200:
 *         description: Returns created category.
 */
categoryRouter.post(categoryPath, async (req, res) => {
  console.log('req.body > ', req.body);
  const newCategory = new CategorySchema({
    title: req.body.title,
    slug: req.body.slug,
    icon: req.body.icon,
    color: req.body.color,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default categoryRouter;
