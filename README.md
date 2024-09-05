# BlogBox

## Development Setup

To set up BlogBox for development:

1. Ensure you have Node.js (version 14 or later) and npm installed.

2. Clone the repository:
   ```
   git clone https://github.com/yourusername/blogbox.git
   ```

3. Navigate to the project directory:
   ```
   cd blogbox
   ```

4. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

5. Set up environment variables:

   For the client, create a `client/.env.local` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

   For the server, create a `server/.env` file:
   ```
   CONNECTION_URI=your_mongodb_connection_string
   PORT=8080
   CLOUDNAME=your_cloudinary_cloud_name
   APIKEY=your_cloudinary_api_key
   APISECRET=your_cloudinary_api_secret
   CLERK_WEBHOOK_SECRET_KEY=your_clerk_webhook_secret_key
   ```

6. Set up ngrok for webhook forwarding:
   - Install ngrok: https://ngrok.com/download
   - Start ngrok to forward your server port:
     ```
     ngrok http 8080
     ```
   - Copy the generated HTTPS URL (e.g., https://your-ngrok-url.ngrok.io)

7. Configure Clerk webhook:
   - Go to your Clerk Dashboard
   - Navigate to Webhooks and create a new endpoint
   - Set the Endpoint URL to your ngrok URL + "/webhook" (e.g., https://your-ngrok-url.ngrok.io/webhook)
   - Select the events you want to sync (e.g., user created, updated, deleted)
   - Copy the Signing Secret and add it to your `server/.env` file:
     ```
     CLERK_WEBHOOK_SECRET_KEY=your_clerk_webhook_signing_secret
     ```

8. Start the development servers:
   
   For the client:
   ```
   cd client && npm run dev
   ```
   
   For the server:
   ```
   cd server && npm start
   ```

9. Open your browser and visit `http://localhost:5173` to see the client application.

Remember to never commit your `.env` files to version control. Add them to your `.gitignore` file to prevent accidental commits.

// ... rest of the content ...
