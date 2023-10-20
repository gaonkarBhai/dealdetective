"use server"

import { connectToDb } from "../Database/conn";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct (productUrl:string){
    if(!productUrl) return;
    try {
        connectToDb();
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return;

        let product = scrapedProduct;
        // const existingProduct = 
        
    } catch (error:any) {
        console.log(error);
        throw new Error("Error in scraped product");
    }

}