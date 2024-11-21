const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:5173', // Your Vite dev server
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  class ContinuousChatbot {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,
                topP: 1,
                maxOutputTokens: 2048,
            }
        });

        // Initialize chat session with a predefined context
        this.chat = this.model.startChat({
            history: [
                {
                    role: 'user', // Specify the role
                    parts: [
                        { text: "I am a victim in need of first aid and you are an AI language model with knowledge of what to do in different situations. Answer my questions accordingly.If the query is out of topic for first aid and health. just answer that you dont have an answer. Also give the answers in markdown." }
                    ],
                },
            ],
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });
        
        
        
    }

    async getChatResponse(message) {
        try {
            // Send user message and get response
            const result = await this.chat.sendMessage(message);
            const response = await result.response;
            return response.text(); // Only return the AI's response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}


// Middleware to parse JSON bodies
app.use(express.json());

// Create chatbot instance
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('Please set GEMINI_API_KEY in your .env file');
    process.exit(1);
}
const chatbot = new ContinuousChatbot(apiKey);

// Chatbot endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Validate input
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get response from chatbot
        const response = await chatbot.getChatResponse(message);

        // Send response back to client
        res.json({ 
            message: response 
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: 'An error occurred while processing your message' 
        });
    }
});

// Optional: Serve static files or frontend (if you have one)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Gemini Chatbot server running on port ${port}`);
});

// Optional: Graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit();
});

module.exports = app; // For testing purposes