import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import hubLogo from '../../assets/logo.png';
import { resetPassword } from "../../features/auth/authSlice";

const ResetPasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing reset token. Please try resetting your password again.');
            navigate('/authentication/forgot-password');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const validateForm = () => {
        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm() || !token) return;

        try {
            const resultAction = await dispatch(resetPassword({
                token,
                newPassword,
                confirmPassword
            }));
            if (resetPassword.fulfilled.match(resultAction)) {
                toast.success('Password reset successful!');
                console.log('Password reset successful');
                navigate('/authentication/sign-in');
            }
        } catch (error) {
            // Error handling is now done in the useEffect for the 'error' state
            console.error(error)
        }
    };

    if (!token) {
        return null; // We'll redirect in useEffect
    }

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
                    Reset Your Password
                </h1>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                    Enter your new password below to reset your account password.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-y-3">
                        <Label htmlFor="newPassword">New Password</Label>
                        <TextInput
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-y-3">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="submit" className="w-full lg:w-auto" disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;