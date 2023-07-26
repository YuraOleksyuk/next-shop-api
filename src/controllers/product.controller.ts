import ProductSchema from "../models/Product";
import CategorySchema from "../models/Category";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getProductBySlug = async (req, res) => {
    const productSlug = req.params.slug;

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
}

export const getProductByCategorySlug = async (req, res) => {
    try {
        const categorySlug = req.params.slug;

        if (categorySlug) {
            const category = await CategorySchema.findOne({slug: categorySlug})

            if (category === null) {
                res.status(404).json({message: 'Not Found'});
                return;
            }

            if (category) {
                const products = await ProductSchema.find({category: category.id});
                res.status(200).json(products);
                return;
            }
        }

        res.status(404).json({message: 'Not Found'});

    } catch (err) {
        res.status(500).json(err);
    }
}

export const createProduct = async (req, res)=> {
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
}

export const deleteProductByID = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductSchema.deleteOne({ _id: productId });
        res.status(200).json(deletedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateProductById = async (req, res) => {
    try {
        const productId: string = req.params.id;

        console.log('productID > ', productId);
        // Product.updateOne(productId, )
    } catch (err) {
        res.status(500).json(err);
    }
}