import React, { lazy, Suspense, useState, useEffect } from 'react';
import { IGrantigate, useLocation, useNavigate } from 'react-router-dom';
import { Spin, Button, notification, Radio, Typography } from 'antd';
import { CheckCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import quickbooksLogo from '~/images/qb_logo.png';
import amexLogo from '~/images/credit_suisse.png';


interface StyleProps {
    style: React.CSSProperties;
}
const ConfettiComponent = lazy(() => import("./confetti"));

const { Title } = Typography;

const welcomeWrapperProps: StyleProps = {
    style: {
        background: "url('images/login_gradient.avif')",
        backgroundSize: "cover",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

// Define styles for the Welcome text similar to the auth page
const welcomeTextStyle: React.CSSProperties = {
    // Add your auth page text styles here
    fontFamily: '"Your font family, as on the auth page"',
    fontSize: '24px', // Example font size, adjust as needed
    color: '#333', // Example text color, adjust as needed
    // Add any other styles that were used on the auth page
};

// Styles for the white box
const whiteBoxStyle: React.CSSProperties = {
    maxWidth: '450px', // Narrowed the width a bit
    width: '100%', // Make sure it doesn't exceed the viewport width
    minHeight: '300px', // Increased minimum height
    backgroundColor: '#fff',
    padding: '40px', // Same padding
    borderRadius: '12px', // Same border radius
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align the items
    gap: '20px', // Add some space between items
};

interface RenderWelcomeContentProps {
    quickBooksButton: JSX.Element;
    banksButton: JSX.Element;
}

const renderWelcomeContent = ({ quickBooksButton, banksButton }: RenderWelcomeContentProps): JSX.Element => {
    return (
        <div
            style={{
                maxWidth: 408,
                margin: "auto",
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            
            {quickBooksButton}
            {banksButton}
        </div>
    );
};


export const Welcome: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [showConfetti, setShowConfetti] = useState(false);

    const [quickBooksLoading, setQuickBooksLoading] = useState<boolean>(false);
    const [banksLoading, setBanksLoading] = useState<boolean>(false);
    const [quickBooksClicked, setQuickBooksClicked] = useState<boolean>(false);
    const [banksClicked, setBanksClicked] = useState<boolean>(false);

    useEffect(() => {
        // Trigger the confetti animation when the component mounts and the path is "/welcome"
        if (location.pathname === '/welcome') {
            setShowConfetti(true);
            // Optionally hide the confetti after some time
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000); // 5 seconds for example

            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleQuickBooksConnect = (): void => {
        if (!quickBooksClicked) {
            setQuickBooksLoading(true);
            setQuickBooksClicked(true);
            setTimeout(() => {
                setQuickBooksLoading(false);
                notification.success({ message: 'Connected to QuickBooks!' });
            }, 2000);
        }
    };

    const handleBanksConnect = (): void => {
        if (!banksClicked) {
            setBanksLoading(true);
            setBanksClicked(true);
            setTimeout(() => {
                setBanksLoading(false);
                notification.success({ message: 'Connected to Banks!' });
                // Redirect to the root route after 2 seconds
                setTimeout(() => navigate('/'), 1000);
            }, 1000);
        }
    };

    const logoStyle: React.CSSProperties = {
        width: '20px', // Set the width as desired
        height: 'auto', // Keep the aspect ratio
    };
    const buttonStyle: React.CSSProperties = {
        width: '200px', // Keep the width as before
        height: '80px', // Increase height to make buttons taller
        fontSize: '32px', // Increased font size for larger buttons
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 0', // Increase padding to make buttons taller
    };

    const iconStyle: React.CSSProperties = {
        marginRight: '10px', // Add space between icon and text
    };

    const statusIconStyle: React.CSSProperties = {
        color: '#d9d9d9', // Grey color for empty circle
        fontSize: '16px', // Adjust size as needed
    };


    const quickBooksButton: JSX.Element = (
        <div style={buttonStyle}>
            <Button
                onClick={handleQuickBooksConnect}
                icon={<img src={quickbooksLogo} alt="QuickBooks" style={logoStyle} />}
                disabled={quickBooksClicked}
                style={{ flexGrow: 1 }} // Ensure button takes full width
                block // Ant Design property to make the button display block (full width)
            >
                Connect QuickBooks
            </Button>
            {quickBooksClicked && (
                quickBooksLoading ? <Spin /> : <CheckCircleOutlined style={{ color: 'green', marginLeft: 8 }} />
            )}
        </div>
    );

    const banksButton: JSX.Element = (
        <div style={buttonStyle}>
            <Button
                onClick={handleBanksConnect}
                icon={<img src={amexLogo} alt="American Express" style={logoStyle} />}
                disabled={banksClicked}
                style={{ flexGrow: 1 }} // Ensure button takes full width
                block // Ant Design property to make the button display block (full width)
            >
                Connect Banks
            </Button>
            {banksClicked && (
                banksLoading ? <Spin /> : <CheckCircleOutlined style={{ color: 'green', marginLeft: 8 }} />
            )}
        </div>
    );

    return (
        
        <div style={welcomeWrapperProps.style}>
           {/* <Suspense >
                {showConfetti && <ConfettiComponent />}
            </Suspense> */}
            <div style={whiteBoxStyle}>
                <Title>Welcome, Luca!</Title>

                {quickBooksButton}
                {banksButton}
            </div>
        </div>
    );
};