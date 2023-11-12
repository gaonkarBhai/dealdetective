# Deal Detective

![image](https://github.com/WeBrogrammers/kanoon.ai/assets/118743210/dd3c08cb-97b5-4cab-b485-0c3267959251)


Monitor Amazon product prices in real-time and receive instant notifications in you 📩 gmail when prices drop, ensuring you never miss a deal.

## Getting Started
1. Clone the repository.
2. Install dependencies with `npm install` .
3. Set up environment variables for MongoDB, SendGrid, and Bright Data and clerk
the .env should look like this:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
BRIGHT_DATA_USER_ID=
BRIGHT_DATA_PASSWORD=
MONGO_URI=
SENDGRID_API_KEY=
SENDGRID_VERIFIED_SENDER=
````
4. Run the application with `npm run dev` .

what if u get cors error?
solve by running this command in terminal:
```bash title="disableCors.bat"
cd C:\Program Files (x86)\Google\Chrome\Application
chrome.exe --user-data-dir="C:\Users\<user_name>\Documents\my\data" --disable-web-security
```

![1st half dd](https://github.com/WeBrogrammers/kanoon.ai/assets/118743210/e2bfd5e6-573e-4349-9155-44fd2aada280)
