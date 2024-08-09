import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaChurch, FaCalendarAlt, FaUsers, FaDollarSign, FaHandshake, FaMobileAlt, FaSun, FaMoon } from 'react-icons/fa';
import Header from './components/layout/Header';
import HeroSection from './components/home/HeroSection';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="font-sans">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      {/* <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Membership Management</h3>
              <p>Manage all your visitor & congregant details and next of kin, effectively in one single place.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Funds Management</h3>
              <p>Creating and capturing donations, funds and pledges made easy for you and your team.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Church Calendar</h3>
              <p>Easily plan church events. Automatically invite relevant members and send auto reminders.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <img src="https://d1apv996ym6tfo.cloudfront.net/website/logo.webp" alt="ChurchPro Software" className="h-8 mb-4" />
              <p>&copy; Church Pro Software 2022-2024</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Terms & Policies</h3>
              <ul>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-of-service.html">Terms and Conditions</a></li>
                <li><a href="faq.html">Frequently Asked Questions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer> */}
    </div>

    //   <main className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">


    //     <div className="mt-16 sm:mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    //       <FeatureCard
    //         icon={<FaUsers />}
    //         title="Member Management"
    //         description="Keep track of your congregation with ease."
    //       />
    //       <FeatureCard
    //         icon={<FaCalendarAlt />}
    //         title="Event Planning"
    //         description="Organize and schedule church events effortlessly."
    //       />
    //       <FeatureCard
    //         icon={<FaDollarSign />}
    //         title="Financial Tracking"
    //         description="Manage donations and expenses in one place."
    //       />
    //       <FeatureCard
    //         icon={<FaChurch />}
    //         title="Resource Booking"
    //         description="Efficiently manage church facilities and resources."
    //       />
    //     </div>

    //     <section className="mt-16 sm:mt-24">
    //       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Seamless Integrations</h2>
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
    //         {['QuickBooks', 'Mailchimp', 'Zoom', 'Stripe', 'Google Calendar', 'Slack'].map((integration) => (
    //           <Card key={integration} className="p-4 text-center">
    //             <FaHandshake className="text-3xl sm:text-4xl text-indigo-600 mx-auto mb-2" />
    //             <p className="font-semibold text-sm sm:text-base">{integration}</p>
    //           </Card>
    //         ))}
    //       </div>
    //     </section>

    //     <section className="mt-16 sm:mt-24">
    //       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">What Our Users Say</h2>
    //       <div className="grid md:grid-cols-2 gap-8">
    //         <Card className="p-6">
    //           <p className="italic mb-4 text-sm sm:text-base">"ChurchConnect has revolutionized how we manage our congregation. It's user-friendly and comprehensive!"</p>
    //           <p className="font-semibold text-sm sm:text-base">- Pastor John, Grace Community Church</p>
    //         </Card>
    //         <Card className="p-6">
    //           <p className="italic mb-4 text-sm sm:text-base">"The financial tracking feature has made our accounting so much easier. Highly recommended!"</p>
    //           <p className="font-semibold text-sm sm:text-base">- Sarah, Church Treasurer</p>
    //         </Card>
    //       </div>
    //     </section>

    //     <section className="mt-16 sm:mt-24 text-center">
    //       <h2 className="text-2xl sm:text-3xl font-bold mb-4">Experience ChurchConnect Today</h2>
    //       <p className="text-lg sm:text-xl mb-6">Start your 30-day free trial. No credit card required.</p>
    //       <Button size="lg" className="px-8">Start Free Trial</Button>
    //     </section>

    //     <section className="mt-16 sm:mt-24 flex flex-col md:flex-row items-center justify-between">
    //       <div className="md:w-1/2 mb-8 md:mb-0">
    //         <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage on the Go</h2>
    //         <p className="text-lg sm:text-xl mb-6">Access ChurchConnect anytime, anywhere with our mobile app.</p>
    //         <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
    //           <Button variant="outline" className="w-full sm:w-auto">
    //             <FaMobileAlt className="mr-2" /> App Store
    //           </Button>
    //           <Button variant="outline" className="w-full sm:w-auto">
    //             <FaMobileAlt className="mr-2" /> Google Play
    //           </Button>
    //         </div>
    //       </div>
    //       <div className="md:w-1/2 flex justify-center">
    //         <div className="bg-gray-300 h-64 w-32 sm:h-80 sm:w-48 rounded-3xl border-8 border-gray-800 shadow-xl">
    //           <div className="h-full w-full bg-white rounded-2xl p-2">
    //             <div className="bg-indigo-100 h-full w-full rounded-xl flex items-center justify-center text-indigo-600 text-sm sm:text-base">
    //               App Screenshot
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     <section className="mt-16 sm:mt-24">
    //       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Streamline Your Donations</h2>
    //       <Card className="p-6">
    //         <div className="flex flex-col md:flex-row items-center">
    //           <div className="md:w-1/2 mb-6 md:mb-0">
    //             <FaDollarSign className="text-4xl sm:text-6xl text-indigo-600 mb-4" />
    //             <h3 className="text-xl sm:text-2xl font-semibold mb-2">Efficient Donation Management</h3>
    //             <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
    //               <li>Accept online and offline donations</li>
    //               <li>Generate tax receipts automatically</li>
    //               <li>Track pledges and recurring gifts</li>
    //               <li>Create detailed financial reports</li>
    //             </ul>
    //           </div>
    //           <div className="md:w-1/2 md:pl-8 w-full">
    //             <div className="bg-gray-200 h-48 sm:h-64 rounded-lg flex items-center justify-center text-gray-600">
    //               Donation Management Interface
    //             </div>
    //           </div>
    //         </div>
    //       </Card>
    //     </section>
    //   </main>

    //   <footer className="bg-gray-800 text-white py-8 px-4 mt-16">
    //     <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
    //       <div className="mb-4 md:mb-0 text-center md:text-left">
    //         <span className="text-xl sm:text-2xl font-bold">ChurchConnect</span>
    //         <p className="mt-2 text-sm">Empowering churches through technology</p>
    //       </div>
    //       <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0">
    //         <Button variant="ghost" className="text-white w-full sm:w-auto">Privacy Policy</Button>
    //         <Button variant="ghost" className="text-white w-full sm:w-auto">Terms of Service</Button>
    //         <Button variant="ghost" className="text-white w-full sm:w-auto">Contact Us</Button>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-3xl sm:text-4xl text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </Card>
  );
};

export default App;