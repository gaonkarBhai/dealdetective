import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(productUrl:string){

    if (!productUrl) return;

    const userName = String(process.env.BRIGHT_DATA_USER_ID);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const sessionId = Math.floor(Math.random() * 500000);

    const options = {
        auth:{
            username:`${userName}-session-${sessionId}`,
            password
        },
        host:"brd.superproxy.io",
        port,
        rejectUnauthorized:false
    }
    try {
        const res = await axios.get(productUrl, options);
        console.log(res.data);
        const $ = cheerio.load(res.data);

        const title = $("#productTitle").text().trim();
        
        
    } catch (error:any) {
        console.log(error);
        throw new Error("Error scraping product : BrightData");
        
        
    }
}