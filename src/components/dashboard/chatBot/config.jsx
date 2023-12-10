import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture.jsx';

const botName = "Deep Thought";

const config = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. I am designed by hyper-intelligent pan-dimensional beings who wanted to know the answer to the Ultimate Question of Life, the Universe, and Everything. It is 42`)],
    botname: botName,
    widgets: [
        {
            widgetName: 'dogPicture',
            widgetFunc: (props) => <DogPicture {...props} />,
        },
    ],
   // customStyles: {
    
    // botMessageBox: {
    //  backgroundColor: '#376B7E',
    //},
    //chatButton: {
    //  backgroundColor: '#5ccc9d',
    //},
 // },
};

export default config;