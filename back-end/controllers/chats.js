const express = require('express');
const { Chat, UserMessage, BotResponse } = require('../models/chat');
const config = require('../utils/config');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(config.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatRouter = express.Router();

chatRouter.post('/', async (req, res) => {
    const { userId, sessionId, messageText } = req.body;

    try {
        // Create and save the user message
        const userMessage = new UserMessage({
            userId,
            message: messageText,
        });
        await userMessage.save();

        // Generate bot response
        const result = await model.generateContent(messageText);
        const botResponseText = await result.response.text();

        // Create and save the bot response
        const botResponse = new BotResponse({
            sessionId,
            response: botResponseText,
        });
        await botResponse.save();

        // Update chat with user and bot messages
        await Chat.updateOne(
            { sessionId },
            {
                $push: {
                    messages: {
                        $each: [
                            { sender: 'user', text: messageText },
                            { sender: 'bot', text: botResponseText }
                        ]
                    }
                }
            },
            { upsert: true }
        );

        res.status(200).json({ botResponse: botResponseText });
    } catch (error) {
        console.error('Error handling chat message:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = chatRouter;
