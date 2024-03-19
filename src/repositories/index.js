import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";

import { dbProductManager } from "../dao/managers/dbProductManager.js";
import { dbCartManager } from "../dao/managers/dbCartManager.js";

import { connectDB } from "../config/dbConnection.js";

connectDB();

export const CartsService = new CartsRepository(dbCartManager);
export const ProductsService = new ProductsRepository(dbProductManager);