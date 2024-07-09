/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

const SignInPage: FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);


  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (validateForm()) {
      console.log("Hello Valid Form")
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        toast.success('Logged in successfully');
        navigate("/")
        console.log('result: ', result);
      } else if (login.rejected.match(result)) {
        toast.error(result.payload as string || 'Login failed');
      }
    }

  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <a href="/" className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-10"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Flowbite
        </span>
      </a>
      <Card
        horizontal
        imgSrc="data:image/jpeg;base64,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"
        imgAlt="here image"

        className="w-full md:max-w-[1024px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              // placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              // placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              {isLoading ? 'processsing' : 'Login to your account'}
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a href="#" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
