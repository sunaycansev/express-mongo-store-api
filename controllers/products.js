import Product from "../models/product.js";

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};
export const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products testing route" });
};
