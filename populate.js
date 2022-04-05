import { createRequire } from "module";
const require = createRequire(import.meta.url);
import dotenv from "dotenv";

import connectDB from "./db/connect.js";
import Product from "./models/product.js";
const jsonProducts = require("./products.json");
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // clean database
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("connected to db");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
start();
