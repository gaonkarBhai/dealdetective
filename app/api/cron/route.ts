import { connectToDb } from "@/library/database/conn";
import Product from "@/library/database/models/products";
import { scrapeAmazonProduct } from "@/library/scraper";
import { generateEmailBody, sendEmail } from "@/library/sendgrid/sendMail";
import { getEmailMessageType } from "@/library/utilities/emailmsgtype";
import { getAveragePrice } from "@/library/utilities/getAveragePrice";
import { getHighestPrice } from "@/library/utilities/getHighestPrice";
import { getLowestPrice } from "@/library/utilities/getLowestPrice";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDb();
    const product = await Product.find({});
    if (!product) throw new Error("No product found");
    
    const updateProductsByCron = await Promise.all(
      product.map(async (ele) => {
        const scrapedProduct = await scrapeAmazonProduct(ele.url);
        if (!scrapedProduct) throw new Error("No product found");

        const updatedPriceHistory: any = [
          ...ele.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];
        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          product
        );
        const emailMessageType = getEmailMessageType(scrapedProduct,ele);
        if (emailMessageType && updatedProduct.users.length > 0) {
          const productInfo = {
            title:updatedProduct.title,
            url:updatedProduct.url,
            image:updatedProduct.image
          }
        const emailContent = await generateEmailBody(productInfo,emailMessageType);
        const userEmails = updatedProduct.users.map((ele:any) => ele.email);
        await sendEmail( emailContent,userEmails);
        }
        return updatedProduct;
      })
    );
    return NextResponse.json({message:"OK",data:updateProductsByCron})
  } catch (err) {
    console.log(err);
  }
}
