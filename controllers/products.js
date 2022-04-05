export const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "products static testing route" });
};
export const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products testing route" });
};
