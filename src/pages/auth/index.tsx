import { AuthPage as AntdAuthPage, AuthProps } from "@refinedev/antd";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const authWrapperProps = {
    style: {
        background:
            "url('images/login_gradient.avif')",
        backgroundSize: "cover",
    },
};

const renderAuthContent = (content: React.ReactNode) => {
    return (
        <div
            style={{
                maxWidth: 408,
                margin: "auto",
            }}
        >
            <Link to="/">
                <img
                    style={{ marginBottom: 26 }}
                    src="/images/web3found.png"
                    alt="Logo"
                    width="100%"
                />
            </Link>
            {content}
        </div>
    );
};

export const AuthPage: React.FC<AuthProps & { onSuccess?: () => void }> = ({ type, formProps, onSuccess }) => {


    // You need to pass handleSubmit to your form's onSubmit or equivalent form submission handler
    // ...
    return (
        <AntdAuthPage
            type={type}
            wrapperProps={authWrapperProps}
            renderContent={renderAuthContent}
            formProps={{
                ...formProps
            }}
        />
    );
};
