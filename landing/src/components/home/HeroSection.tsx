import {motion} from 'framer-motion'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
	<section id="home" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-center">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Streamline Your <span className="text-indigo-600">Church Management</span>
              </motion.h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Effortlessly manage your congregation, events, and finances with our all-in-one church management system.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow mb-3 sm:mb-0 sm:mr-3">
                  <Button size="lg" className="w-full">Get Started</Button>
                </div>
                <div className="rounded-md shadow">
                  <Button variant="outline" size="lg" className="w-full">Learn More</Button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img src="https://d1apv996ym6tfo.cloudfront.net/website/illustration-3.webp" alt="Home" className="w-full" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection