import { Button, Card } from "flowbite-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import hubLogo from '../../assets/logo.png';

const PasswordResetSentPage: FC = function () {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12 gap-y-2">
            <div className="lg:hidden -mb-24">
                <img src={hubLogo} alt="" />
            </div>
            <Card
                horizontal
                imgSrc={hubLogo}
                imgAlt="logo"
                className="w-full md:max-w-[1024px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
            >
                <h1 className="mb-3 text-2xl font-bold text-green-600 dark:text-green-400 md:text-3xl">
                    Password Reset Email Sent
                </h1>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    We've sent an email to your inbox with instructions to reset your password. Please check your email and follow the link provided.
                </p>
                <ul className="mb-6 list-disc pl-5 text-gray-600 dark:text-gray-400">
                    <li>The link in the email will be valid for 30 minutes.</li>
                    <li>If you don't see the email, please check your spam folder.</li>
                    <li>Make sure to use a strong, unique password when resetting.</li>
                </ul>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button onClick={() => navigate("/authentication/sign-in")} color="gray">
                        Return to Sign In
                    </Button>
                    <Button onClick={() => navigate("/authentication/forgot-password")}>
                        Resend Reset Email
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PasswordResetSentPage;