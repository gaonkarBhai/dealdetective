import { EmailProductInfo, MessageType } from "@/types";
// import sgMail from "@sendgrid/mail";
import { EmailContent } from "@/types";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

export const Message = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export async function generateEmailBody(
  product: EmailProductInfo,
  type: MessageType
) {
  const THRESHOLD_PERCENTAGE = 40;
  let subject = "";
  let body = "";
  const shortenedTitle =
    product.title.length > 25
      ? product.title.slice(0, 25) + "..."
      : product.title;
     switch (type) {
    case Message.WELCOME:
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to PriceWise 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
      break;

    case Message.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    case Message.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;

    case Message.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid Message type.")
    }
    console.log(subject, body)
    return { subject, body };
}


export async function sendEmail(emailBody: EmailContent, sendTo: string[]) {
    if (!process.env.SENDGRID_API_KEY) return;
    console.log("Sending email....");
    
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg: MailDataRequired = {
            to: sendTo,
            from: {
                email: process.env.SENDGRID_VERIFIED_SENDER || 'example@example.com',
            },
            subject: emailBody.subject,
            html: emailBody.body,
        };
        await sgMail.send(msg);
        console.log("Email sent");
    } catch (error) {
        console.log(error);
    }   
}
