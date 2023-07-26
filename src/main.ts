import express from 'express';
import serverless from 'serverless-http';

import 'dotenv/config';

import * as mongoose from "mongoose";
import bodyParser from "body-parser";

import userRouter from './routes/user'
import productRouter from './routes/product'
import categoryRouter from "./routes/category";

import m2s from 'mongoose-to-swagger';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express';

import CategorySchema from './models/Category';
import ProductSchema from './models/Product';
import OrderSchema from './models/Order';


const port: string | number = process.env.PORT || 3333;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop API project',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${port}/`
      }
    ],
    components: {
      schemas: {
        category: m2s(CategorySchema, { omitFields: ['createdAt', 'updatedAt'] }),
        product: m2s(ProductSchema, { omitFields: ['createdAt', 'updatedAt'] }),
        order: m2s(OrderSchema, { omitFields: [] }),
      }
    }
  },
  apis: ["**/*.ts"]
}

mongoose
  .connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@shop-db.riovzfy.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('DB Connected!')
  })
  .catch((err) => {
    console.log(err);
  })

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to shop-api' });
});

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

server.on('error', console.error);

module.exports.handler = serverless(app);
