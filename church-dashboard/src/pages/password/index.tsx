import AuthWrapper from "@/components/auth/AuthWrapper"
import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '@/assets/svg/logo.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  return (
    <AuthWrapper>
      <div className=" flex flex-col items-center justify-center ">
        <img src={logo} alt="logo" className="w-[15rem]" />
        <h1 className="font-bold text-2xl">RESET YOUR ACCOUNT</h1>
        <p className="px-2 pt-2 text-lg">Please enter the email associated with your account and we'll send you a link to reset your password </p>
      </div>
      <form className="  space-y-5 mt-10">
        <Input value={email} setValue={setEmail} label="Email" type="email" />
        <div className="bg-[#ff8036]  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
          <button type="submit" className="">Submit</button>
        </div>
      </form>

      <div className="absolute bottom-10">
        <Link to="/login" className="text-[#ff8036]">I have remembered my password? Login</Link>
      </div>
    </AuthWrapper>
  )
}

export default ForgotPassword