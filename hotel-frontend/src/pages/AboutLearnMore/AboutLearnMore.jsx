import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './AboutLearnMore.css';
import f1 from '../../assets/f1.png';
import f2 from '../../assets/f2.png';
import f3 from '../../assets/f3.png';
import f4 from '../../assets/f4.png';
import Footer from '../../components/Footer/Footer';


export default function LuxuryHotelAbout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <header className="w-full py-16 bg-gray-100 text-center">
        <h1 className="text-4xl font-light mb-2">Elevated luxury</h1>
        <p className="text-xl font-light text-gray-600">in the heart of Colombia</p>
        
        <div className="max-w-3xl mx-auto mt-6 px-4 text-gray-700 text-sm">
          <p>
            You will be awed by the grandeur and sophistication of our luxurious suites, all of which exude opulence. Designed
            to reflect the cultural heritage of Colombia, the styling is both bold and sophisticated. From our prestigious spa
            complex to our exquisite dining options, we ensure each guest leaves with memories to last a lifetime.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Services & Facilities */}
        <section className="flex flex-col md:flex-row py-12 px-6 gap-6">
          <div className="md:w-1/2">
            <h2 className="text-xl font-light mb-4">Services & Facilities</h2>
            <p className="text-gray-700 mb-4">
              At Our Hotel, we pride ourselves on the hospitality community with being
              second to none. Every care and consideration is given to your well-
              being. We strive to provide you with the highest level of attentiveness
              and exceptional service to ensure an unforgettable experience.
            </p>
          </div>
          <div className="md:w-1/2">
          <img src={f1} 
              alt="Hotel lobby with natural lighting and modern furniture" 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Explore Colombia */}
        <section className="flex flex-col md:flex-row py-12 px-6 gap-6 bg-gray-50">
          <div className="md:w-1/2">
            <img 
              src={f2}
              alt="Tuk tuks in a Colombian street" 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-light mb-4">Explore Colombia</h2>
            <p className="text-gray-700 mb-4">
              Colombia is a spectacular blend of natural beauty and metropolitan energy. From lively tuk-tuk adventures to its documented
              colorful streets and welcoming locals, there is so much to discover. Rich in
              captivating history from a significant era and diverse cuisine.
            </p>
          </div>
        </section>

        {/* Corporate Social Responsibility */}
        <section className="flex flex-col md:flex-row py-12 px-6 gap-6">
          <div className="md:w-1/2">
            <h2 className="text-xl font-light mb-4">Corporate Social Responsibility</h2>
          </div>
          <div className="md:w-1/2">
            <img 
              src={f3}
              alt="Coastal view of Colombia" 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Map & Directions */}
        <section className="flex flex-col md:flex-row py-12 px-6 gap-6 bg-gray-50">
          <div className="md:w-1/2">
            <img 
              src={f4}
              alt="Navigation on smartphone" 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-light mb-4">Map & Directions</h2>
            <p className="text-gray-700 mb-4">
              Ideally located in the heart of Colombia's business district between the
              Casa Plaza Tower promenade and Plaza view. The hotel is a strategic
              location 45 minutes' drive from the International Airport and approximately
              20 min by foot.
            </p>
          </div>
        </section>
      </main>

      {/* Management Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl font-light text-center mb-8">Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Manager 1 */}
          <div className="text-center">
            <h3 className="font-medium">Helena Andersson</h3>
            <p className="text-gray-600 mb-2">General Manager</p>
            <p className="flex items-center justify-center text-sm">
              <Phone size={14} className="mr-1" /> +57 (1) 123-4567
            </p>
            <p className="flex items-center justify-center text-sm">
              <Mail size={14} className="mr-1" /> h.anderson@luxuryhotel.com
            </p>
          </div>

          {/* Manager 2 */}
          <div className="text-center">
            <h3 className="font-medium">Sol Takagawa</h3>
            <p className="text-gray-600 mb-2">Director of Operations</p>
            <p className="flex items-center justify-center text-sm">
              <Phone size={14} className="mr-1" /> +57 (1) 123-4568
            </p>
            <p className="flex items-center justify-center text-sm">
              <Mail size={14} className="mr-1" /> s.takagawa@luxuryhotel.com
            </p>
          </div>

          {/* Manager 3 */}
          <div className="text-center">
            <h3 className="font-medium">Gabriel Ventura</h3>
            <p className="text-gray-600 mb-2">Director of Sales and Marketing</p>
            <p className="flex items-center justify-center text-sm">
              <Phone size={14} className="mr-1" /> +57 (1) 123-4569
            </p>
            <p className="flex items-center justify-center text-sm">
              <Mail size={14} className="mr-1" /> g.ventura@luxuryhotel.com
            </p>
          </div>
        </div>
      </section>

     
      <Footer/>
    </div>
  );
}