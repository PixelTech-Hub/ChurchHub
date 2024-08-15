import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState, useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { verifyOtp, login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";
import hubLogo from '../../assets/logo.png'

const VerifyOtpPage: FC = function () {
	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(300); // 5 minutes in seconds
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoading, email } = useAppSelector((state) => state.auth);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!otp) {
			toast.error("Please enter the OTP");
			return;
		}

		if (!/^\d{5}$/.test(otp)) {
			toast.error("OTP should be a 6-digit number");
			return;
		}

		if (!email) {
			toast.error("Email not found. Please try logging in again.");
			navigate("/authentication/sign-in");
			return;
		}

		const result = await dispatch(verifyOtp({ email, otp }));
		if (verifyOtp.fulfilled.match(result)) {
			toast.success('OTP verified successfully');
			toast.success('Login successful');
			navigate("/");
		} else if (verifyOtp.rejected.match(result)) {
			toast.error(result.payload as string || 'OTP verification failed');
		}
	};

	const handleResendOtp = async () => {
		if (!email) {
			toast.error("Email not found. Please try logging in again.");
			navigate("/authentication/sign-in");
			return;
		}

		const result = await dispatch(login({ email, password: "" }));
		if (login.fulfilled.match(result)) {
			toast.success('New OTP sent successfully');
			setTimer(300); // Reset timer
		} else if (login.rejected.match(result)) {
			toast.error(result.payload as string || 'Failed to resend OTP');
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
					Verify OTP
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4 flex flex-col gap-y-3">
						<Label htmlFor="otp">Enter OTP</Label>
						<TextInput
							id="otp"
							name="otp"
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<Button type="submit" className="w-full lg:w-auto" disabled={isLoading}>
							{isLoading ? 'Verifying...' : 'Verify OTP'}
						</Button>
					</div>
				</form>
				<div className="mt-4">
					<p>OTP valid for: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</p>
					<Button onClick={handleResendOtp} disabled={timer > 0 || isLoading}>
						Resend OTP
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default VerifyOtpPage;