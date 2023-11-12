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
            subject = `Welcome to Deal Detective`;
            body = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Welcome to DealDetective 🕵️</h2>
                <p>Hello there!</p>
                <p>You are now tracking <strong>${product.title}</strong> on DealDetective.</p>
                <p>Here's an example of how you'll receive updates:</p>

                <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
                <h3>Welcome to DealDetective!</h3>
                <p>We're thrilled to inform you that you can now track the price of <strong>${product.title}</strong>.</p>
                <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #007bff;">Start tracking now</a>!</p>
                <img src="${product.image}" alt="Product Image" style="max-width: 100%; border-radius: 5px; margin-top: 10px;" />
                </div>
                <p>Stay tuned for more updates on ${product.title} and other fantastic deals you're tracking with DealDetective.</p>
                <p>If you have any questions or need assistance, feel free to reach out to us. Happy shopping!</p>
                <p>Best regards,</p>
                <p>The DealDetective Team 🌟</p>
                </div>`;
            break;

        case Message.CHANGE_OF_STOCK:
            subject = `${shortenedTitle} is now back in stock!`;
            body = `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h4>Hey there!</h4>
            <p>We're excited to share that <strong>${product.title}</strong> is now back in stock! 🎉</p>
            <img src="${product.image}" alt="Product Image" style="max-width: 100%; border-radius: 5px; margin-top: 10px;" />
            <p>Grab yours before they run out again! Check out the product <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #007bff;">here</a>.</p>

            <p>If you have any questions or need assistance, feel free to reach out to us. Happy shopping!</p>

            <p>Best regards,</p>
            <p>The DealDetective Team 🌟</p>
            </div>
      `;
            break;

        case Message.LOWEST_PRICE:
            subject = `Lowest Price Alert for ${shortenedTitle}`;
            body = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <h4>Exciting News!</h4>
                <p>We're thrilled to let you know that <strong>${product.title}</strong> has reached its lowest price ever! 🚀</p>
                <p>Don't miss out on this fantastic deal - grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #007bff;">here</a> now.</p>
                <img src="${product.image}" alt="Product Image" style="max-width: 100%; border-radius: 5px; margin-top: 10px;" />

                <p>If you have any questions or need assistance, feel free to reach out to us. Happy shopping!</p>

                <p>Best regards,</p>
                <p>The DealDetective Team 🌟</p>
                </div>
      `;
            break;

        case Message.THRESHOLD_MET:
            subject = `Discount Alert for ${shortenedTitle}`;
            body = `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h4>Exciting News!</h4>
        <p>We're thrilled to inform you that <strong>${product.title}</strong> is now available at a discount of more than ${THRESHOLD_PERCENTAGE}%!</p>
        <p>Don't miss out on this amazing offer - grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #007bff;">here</a>.</p>

        <p>If you have any questions or need assistance, feel free to reach out to us. Happy shopping!</p>

        <p>Best regards,</p>
        <p>The DealDetective Team 🌟</p>
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
        console.log("Email Sent....");
    } catch (error) {
        console.log(error);
    }
}
