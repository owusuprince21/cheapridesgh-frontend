import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/types/car';
import { Calendar, Gauge, Fuel, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
  showHotSaleBadge?: boolean; // Optional prop for showing hot sale badge
}

export default function CarCard({ car, showHotSaleBadge }: CarCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <Link href={`/cars/${car.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-48">
          <Image
            src={car.main_image}
            alt={car.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {showHotSaleBadge ? (
            <>
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                Hot Sale
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {car.condition}
              </div>
            </>
          ) : (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {car.condition}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {car.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(car.price)}
            </span>
            <span className="text-sm text-gray-500">
              {car.make} {car.model}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Gauge className="h-4 w-4" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fuel className="h-4 w-4" />
              <span className="capitalize">{car.fuel_type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span className="capitalize">{car.transmission}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
