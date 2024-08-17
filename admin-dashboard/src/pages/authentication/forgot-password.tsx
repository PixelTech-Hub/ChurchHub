import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import hubLogo from '../../assets/logo.png';
import { requestPasswordReset } from "../../features/auth/authSlice";

const ForgotPasswordPage: FC = function () {
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const resultAction = await dispatch(requestPasswordReset(email));
            if (requestPasswordReset.fulfilled.match(resultAction)) {
                toast.success('Password reset email sent successfully');
                navigate("/authentication/password-reset-sent"); // Redirect to sign-in page after successful request
            } else if (requestPasswordReset.rejected.match(resultAction)) {
                toast.error(resultAction.payload as string || 'Failed to send password reset email');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        }
    };

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
                <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
                    Forgot your password?
                </h1>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                    Don't fret! Just type in your email and we will send you a code to reset your password!
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-y-3">
                        <Label htmlFor="email">Your email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="submit" className="w-full lg:w-auto" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Reset password'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;