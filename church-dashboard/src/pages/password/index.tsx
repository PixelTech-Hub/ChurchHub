import AuthWrapper from "@/components/auth/AuthWrapper"
import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  return (
    <AuthWrapper>
      <div className=" flex flex-col items-center justify-center lg:py-6 md:py-4 py-2">
        <div className="w-36 h-36 bg-orange-500 rounded-xl mb-4"></div>
        <h1 className="font-bold text-2xl">RESET YOUR ACCOUNT</h1>
        <p className="px-2 pt-2 text-lg">Please enter the email associated with your account and we'll send you a link to reset your password </p>
      </div>
      <form className="  space-y-5">
        <Input value={email} setValue={setEmail} label="Email" type="email" />
        <div className="bg-orange-500  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
          <button type="submit" className="">Submit</button>
        </div>
      </form>

      <div className="absolute bottom-10">
        <Link to="/login" className="text-orange-500">I have remembered my password? Login</Link>
      </div>
    </AuthWrapper>
  )
}

export default ForgotPassword