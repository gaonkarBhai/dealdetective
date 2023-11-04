"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utilities/extractPrice";
import { extractCurrancy } from "../utilities/extractCurrancy";
import { extractDescription } from "../utilities/extractDescription";

export async function scrapeAmazonProduct(productUrl: string) {

  if (!productUrl) return;

  // Bright Data proxy service
  const userName = String(process.env.BRIGHT_DATA_USER_ID);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const sessionId = Math.floor(Math.random() * 500000);

  // configuration options for the proxy request.
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {

    const res = await axios.get(productUrl, options);
    const $ = cheerio.load(res.data);

    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price"),
      $("span.a-offscreen")
    );
    const currancy = extractCurrancy($(".a-price-symbol"));
    const discount = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "";
    const imageUrls = Object.keys(JSON.parse(images));
    const description = extractDescription($);

    // res object
    const data = {
      url: productUrl,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      isOutOfStock: outOfStock,
      image: imageUrls[0],
      currancy,
      priceHistory: [],
      discount: Number(discount),
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    console.log(data);
    return data;
    
  } catch (error: any) {
    console.log(error);
    throw new Error("Error scraping product : BrightData");
  }
}
