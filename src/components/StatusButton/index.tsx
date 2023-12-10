import React from 'react';
import { Button } from 'antd';


// Define the shape of props using an interface
interface StatusButtonProps {
    text: string;
}

export const StatusButton: React.FC<StatusButtonProps> = ({ text }) => {
    let style: React.CSSProperties = {}; // Use React.CSSProperties for style object type

    switch (text) {
        case 'Approved':
            style = { backgroundColor: 'green', borderColor: 'green', color: 'white' };
            break;
        case 'Declined':
            style = { backgroundColor: 'red', borderColor: 'red', color: 'white' };
            break;
        default:
            style = { backgroundColor: 'grey', borderColor: 'grey', color: 'white' };
            break;
    }

    return (
        <Button style={style}>
            {text}
        </Button>
    );
};

