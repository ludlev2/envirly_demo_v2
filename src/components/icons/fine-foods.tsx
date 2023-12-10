import React from 'react';

export const FineFoodsIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
    <img
        src="/images/web3found.png"
        alt="Envirly Logo"
        {...props} // This will apply any additional props passed to the component
    />
);

