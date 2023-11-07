"use server";

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice } from "../utilities/getAveragePrice";
import { getHighestPrice } from "../utilities/getHighestPrice";
import { getLowestPrice } from "../utilities/getLowestPrice";
import { connectToDb } from "../database/conn";
import Product from "../database/models/product.model";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDb();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { priceHistory: scrapedProduct.currentPrice },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    // console.log(newProduct);

    revalidatePath(`/products/${newProduct._id}`);
    return newProduct;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error in scraped product");
  }
}

export async function getProductById(productId:string) {
  try {
    connectToDb();
    const product = await Product.findOne({_id:productId})
    if(!product) return null;
    // console.log(product);
    return product
  } catch (error) {
    console.log(error);
    throw new Error("Error in get product by id");
  }
}

export async function getAllProducts() {
  try {
    connectToDb();
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}
export async function getSimilarProduct(productId:string) {
  try {
    connectToDb();
    const product = await Product.findOne({_id:productId})
    if (!product) return null;
    const similarProd = await Product.find({_id:{$ne:productId}}).limit(4);
    return similarProd;
  } catch (error) {
    console.log(error);
  }
}