import Link from 'next/link';
import { Search, Car } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6">

            <Image
                src="/logo3.png" // Assuming it's logo1.png, adjust if it's .jpg or .svg
                alt="Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-yellow-400">Cheap Ride</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover quality used cars at unbeatable prices in Ghana. 
            Your dream car is just a click away!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cars"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Browse Cars</span>
            </Link>
            
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold">Over 100+ Cars Available</p>
              <p className="text-sm opacity-90">Updated Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}