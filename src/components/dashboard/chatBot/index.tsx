import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'; // Default styles.
import config from './config.jsx';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';

export const ChatBotComponent = () => {
    return (
        <div>
            <style>
                {`
                    .react-chatbot-kit-chat-container {
                        width: 100%;
                        max-width: 600px;
                    }
                    .react-chatbot-kit-chat-bot-avatar-container {
                    display: none;}  
                    .react-chatbot-kit-chat-bot-message-arrow {
display: none;}     

.react-chatbot-kit-chat-bot-message {
width: 100%;}
                `}
            </style>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
};