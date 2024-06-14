import AuthWrapper from "@/components/auth/AuthWrapper"
import Input from "@/components/forms/Input"
import { useState } from "react"


const LockScreen = () => {
  const [password, setPassword] = useState("")
  return (
    <AuthWrapper>
      <div className=" flex flex-col items-center justify-center lg:py-6 md:py-4 py-2">
        <div className="w-36 h-36 bg-orange-500 rounded-xl mb-4"></div>
        <h1 className="font-bold text-2xl">ACCOUNT LOCKED</h1>
        <p className="px-2 pt-2 text-lg text-center">Please enter your account associated with your account to login again</p>
      </div>
      <form className="  space-y-5">
        <Input value={password} setValue={setPassword} label="Password" type="email" />
        <div className="bg-orange-500  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
          <button type="submit" className="">Login</button>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default LockScreen