
const ForgotPassword = () => {
  return (
    <div className="relative bg-image">
      <div className="border border-[#49d205] absolute lg:top-[20rem] h-[27rem] md:top-[25rem] top-[10rem] lg:left-[40rem] md:left-[8rem] left-[1rem] lg:right-[40rem] md:right-[8rem] right-[1rem]  bg-white rounded-lg  pt-10 pb-10 ">
        <div className="font-extrabold flex flex-col items-center justify-center">
          <h1 className="lg:text-3xl text-xl"> CHURCHPRO </h1>
          <h1 className="lg:text-xl text-sm"> RESET ACCOUNT </h1>

        </div>
        <div className="h-[2px] w-auto px-0 bg-gray-500 mt-4" />
        <p className="px-2 pt-2 text-sm">Please enter the email associated with your account and we'll send you a link to reset your password </p>
        <form className="flex flex-col space-y-3 m-2 mt-8 p-2 ">


        </form>
      </div>
      <div className="absolute lg:bottom-4 bottom-2 left-0 right-0 flex items-center justify-center  lg:px-4 px-2 font-bold lg:text-xl md:text-lg text-sm text-white ">
        <p className="">Designed by PixelTech 2024</p>
      </div>
    </div>
  )
}

export default ForgotPassword