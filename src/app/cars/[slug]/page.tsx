'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import CarCard from '@/components/CarCard';

import { 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Palette, 
  Users, 
  DoorOpen,
  MessageCircle,
  ArrowLeft,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Make sure it's correctly set up
import { useRouter } from 'next/navigation';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

// import router from 'next/router';


export default function CarDetailPage() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { user } = useAuth(); // Safe hook call
  const router = useRouter();


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const [carResponse, relatedResponse] = await Promise.all([
          api.get(`/cars/${params.slug}/`),
          api.get(`/cars/${params.slug}/related/`)
        ]);
        
        setCar(carResponse.data);
        setRelatedCars(relatedResponse.data);
        setSelectedImage(carResponse.data.main_image);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCarDetails();
    }
  }, [params.slug]);

  // Compute prevCar and nextC]ar based on relatedCars and params.slug
  const currentIndex = relatedCars.findIndex((c) => c.slug === params.slug);
  const prevCar = currentIndex > 0 ? relatedCars[currentIndex - 1] : null;
  const nextCar = currentIndex < relatedCars.length - 1 ? relatedCars[currentIndex + 1] : null;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

const handleContactWhatsApp = () => {
  if (!user) {
    // Redirect using router (preferred over window.location.href)
    router.push('/auth/login');
    return;
  }

  // const adminNumber = '233557557236';
  // const message = `Hi, I'm interested in the ${car?.title} listed for ${formatPrice(car?.price || '0')}. Is it still available?`;
  // const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
  // window.open(whatsappUrl, '_blank');


  // const adminNumber = '233557557236'; // ✅ No "+" and no spaces
  // const message = `Hi, I'm interested in the ${car?.title} listed for ${formatPrice(car?.price || '0')}. Is it still available?`;

  // const encodedMessage = encodeURIComponent(message);
  // const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

  // window.open(whatsappUrl, '_blank');

  const adminNumber = '+233557557236'; // Replace with actual admin number
  const message = `Hi, Am ${user?.first_name || ''} ${user?.last_name || ''} I'm interested in the ${car?.title} listed for ${formatPrice(car?.price || '0')}. Is it still available?`;
  const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');


};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-lg h-96 animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-8 animate-pulse" />
              <div className="bg-gray-200 rounded h-6 animate-pulse" />
              <div className="bg-gray-200 rounded h-32 animate-pulse" />
            </div>
            <div className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Car not found</h1>
            <Link href="/cars" className="text-blue-600 hover:text-blue-700">
              Back to cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/cars"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to cars</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div>
              <div className="relative h-96 mb-4">
                <Image
                  src={selectedImage}
                  alt={car.title}
                  fill
                  className="object-cover rounded-lg"
                />

            {prevCar && (
              <Link href={`/cars/${prevCar.slug}`} className="flex items-center space-x-1 text-blue-600 hover:underline">
                <ArrowLeftCircle className="h-5 w-5" />
                <span>{prevCar.title}</span>
              </Link>
            )}

            {nextCar && (
              <Link href={`/cars/${nextCar.slug}`} className="flex items-center space-x-1 text-blue-600 hover:underline">
                <span>{nextCar.title}</span>
                <ArrowRightCircle className="h-5 w-5" />
              </Link>
            )}

                {car.is_featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Hot Sale
                  </div>
                )}
              </div>
              
              {car.additional_images && car.additional_images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedImage(car.main_image)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      selectedImage === car.main_image ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={car.main_image}
                      alt="Main"
                      fill
                      className="object-cover"
                    />
                  </button>
                  {car.additional_images.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(img.image)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === img.image ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={img.image}
                        alt={img.caption || 'Car image'}
                        fill
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-4">{car.title}</h1>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {formatPrice(car.price)}
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-black" />
                  <div>
                    <p className="text-sm text-black">Year</p>
                    <p className="font-semibold text-black">{car.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="h-5 w-5 text-black" />
                  <div>
                    <p className="text-sm text-black">Mileage</p>
                    <p className="font-semibold text-black">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-5 w-5 text-black" />
                  <div>
                    <p className="text-sm text-black">Fuel Type</p>
                    <p className="font-semibold capitalize text-black">{car.fuel_type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Settings className="h-5 w-5 text-black" />
                  <div>
                    <p className="text-sm text-black">Transmission</p>
                    <p className="font-semibold capitalize text-black">{car.transmission}</p>
                  </div>
                </div>
                
                {car.color && (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Palette className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-sm text-black">Color</p>
                      <p className="font-semibold text-black">{car.color}</p>
                    </div>
                  </div>
                )}
                
                {car.seats && (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-sm text-black">Seats</p>
                      <p className="font-semibold text-black">{car.seats}</p>
                    </div>
                  </div>
                )}
                
                {car.doors && (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <DoorOpen className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-sm text-black">Doors</p>
                      <p className="font-semibold text-black">{car.doors}</p>
                    </div>
                  </div>
                )}
                
                {car.engine_size && (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Zap className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-sm text-black">Engine</p>
                      <p className="font-semibold text-black">{car.engine_size}</p>
                    </div>
                  </div>
                )}


                            {car.primary_damage && (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Settings className="h-5 w-5 text-black" />
                <div>
                  <p className="text-sm text-black">Primary Damage</p>
                  <p className="font-semibold text-black capitalize">{car.primary_damage}</p>
                </div>
              </div>
              )}

                  {car.keys && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-black" />
                      <div>
                        <p className="text-sm text-black">Keys</p>
                        <p className="font-semibold text-black">{car.keys}</p>
                      </div>
                    </div>
                  )}

                  {/* {car.cylinders && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Zap className="h-5 w-5 text-black" />
                      <div>
                        <p className="text-sm text-black">Cylinders</p>
                        <p className="font-semibold text-black">{car.cylinders}</p>
                      </div>
                    </div>
                  )} */}

                  {car.drive && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Gauge className="h-5 w-5 text-black" />
                      <div>
                        <p className="text-sm text-black">Drive</p>
                        <p className="font-semibold text-black capitalize">{car.drive}</p>
                      </div>
                    </div>
                  )}

                  {car.body_style && (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <DoorOpen className="h-5 w-5 text-black" />
                      <div>
                        <p className="text-sm text-black">Body Style</p>
                        <p className="font-semibold text-black capitalize">{car.body_style}</p>
                      </div>
                    </div>
                  )}

                </div>

              

              {/* Contact Button */}
              <button
                onClick={handleContactWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Us on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Description and Features */}
          <div className="p-6 border-t">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
                <p className="text-black leading-relaxed">{car.description}</p>
              </div>
              
              {car.features_list && car.features_list.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
                  <div className="grid grid-cols-1 gap-2">
                    {car.features_list.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              Related {car.model} Cars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar.id} car={relatedCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}