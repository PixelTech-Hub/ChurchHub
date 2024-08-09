import { Button, Card, Label, TextInput } from "flowbite-react";
import { FC, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updatePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";

const PasswordInformationCard: FC = function () {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        try {
            await dispatch(updatePassword({ currentPassword, newPassword })).unwrap();
            toast.success('Password updated successfully');
            console.log('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to update password');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }

    return (
        <Card>
            <h3 className="text-xl font-bold dark:text-white">
                Update Password
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <div className="col-span-6 grid grid-cols-1 sm:col-span-3">
                        <Label htmlFor="current-password">Current password</Label>
                        <div className="relative">
                            <TextInput
                                id="current-password"
                                name="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type={showCurrentPassword ? "text" : "password"}
                            />
                            <Button
                                type="button"
                                size="xs"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-3 text-xs"
                            >
                                {showCurrentPassword ? (
                                    <HiEyeOff />
                                ) : <HiEye />}
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-1 sm:col-span-3">
                        <Label htmlFor="new-password">New password</Label>
                        <div className="relative">
                            <TextInput
                                id="new-password"
                                name="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showNewPassword ? "text" : "password"}
                            />
                            <Button
                                type="button"
                                size="xs"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-3 text-xs"
                            >
                                {showNewPassword ? (
                                    <HiEyeOff />
                                ) : <HiEye />}
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-1 sm:col-span-3">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <div className="relative">
                            <TextInput
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                            />
                            <Button
                                type="button"
                                size="xs"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-3 text-xs"
                            >
                               {showConfirmPassword ? (
                                    <HiEyeOff />
                                ) : <HiEye />}
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <Button color="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default PasswordInformationCard;
