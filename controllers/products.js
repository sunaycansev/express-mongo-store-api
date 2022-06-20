import Product from "../models/product.js";

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    price: { $gt: 20 },
  })
    .sort("name")
    .select("name price")
    .limit(10);
  // .skip(10 * (req.query.page - 1));
  res.status(200).json({ products, nbHits: products.length });
};
export const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    // const filters = JSON.parse(numericFilters);
    // const filtersQuery = {};
    // filters.forEach((filter) => {
    //   const [field, operation, value] = filter.split(":");
    //   filtersQuery[field] = {};
    //   filtersQuery[field][operation] = value;
    // });
    // queryObject.$and = [filtersQuery];
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operation, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operation]: Number(value) };
        // queryObject[field][operation] = value;
      }
    });
    //  console.log(filters);
  }
  console.log(queryObject);
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
    console.log(sort);
  } else {
    result = result.sort("createdAt");
  }
  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // const startIndex = (page - 1) * limit;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
