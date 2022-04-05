import dotenv from "dotenv";
import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
// async errors
dotenv.config();

const app = express();

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Store API </h1><a href='/api/v1/products'>products</a>");
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
