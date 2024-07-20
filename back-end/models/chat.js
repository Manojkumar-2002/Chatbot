const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['user', 'bot'], 
                required: true
            },
            text: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});


const UserMessageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const BotResponseSchema = new Schema({
    sessionId: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const Chat = mongoose.model('Chat', ChatSchema,"chats");
const UserMessage = mongoose.model('UserMessage', UserMessageSchema);
const BotResponse = mongoose.model('BotResponse', BotResponseSchema);

module.exports = { Chat, UserMessage, BotResponse };
