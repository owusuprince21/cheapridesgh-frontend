// 'use client';

// import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
// import { useRouter } from 'next/navigation';
// import { getCurrentUser, isAuthenticated } from '@/lib/auth';
// import api from '@/lib/api';
// import { AdminStats, AdminUser, Car } from '@/types/car';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Car as CarIcon, 
//   Users, 
//   BarChart3, 
//   Plus, 
//   Shield, 
//   Activity,
//   TrendingUp,
//   Eye,
//   UserCheck,
//   Calendar
// } from 'lucide-react';
// import AccessDenied from '../access-denied/page';
// import Loader from '@/components/Loader';

// const CAR_BRANDS = [
//   { value: 'audi', label: 'AUDI' },
//   { value: 'bently', label: 'BENTLY' },
//   { value: 'bmw', label: 'BMW' },
//   { value: 'ford', label: 'FORD' },
//   { value: 'gmc', label: 'GMC' },
//   { value: 'honda', label: 'HONDA' },
//   { value: 'hyundai', label: 'HYUNDAI' },
//   { value: 'jaguar', label: 'JAGUAR' },
//   { value: 'jeep', label: 'JEEP' },
//   { value: 'kia', label: 'KIA' },
//   { value: 'land rover', label: 'LAND ROVER' },
//   { value: 'lexus', label: 'LEXUS' },
//   { value: 'mazda', label: 'MAZDA' },
//   { value: 'mercedes', label: 'MERCEDES' },
//   { value: 'mitsubishi', label: 'MITSUBISHI' },
//   { value: 'nissan', label: 'NISSAN' },
//   { value: 'porsche', label: 'PORSCHE' },
//   { value: 'toyota', label: 'TOYOTA' },
// ];

// const FUEL_TYPES = [
//   { value: 'petrol', label: 'Petrol' },
//   { value: 'diesel', label: 'Diesel' },
//   { value: 'hybrid', label: 'Hybrid' },
//   { value: 'electric', label: 'Electric' },
//   { value: 'gas', label: 'Gas' }
// ];

// const TRANSMISSION_TYPES = [
//   { value: 'manual', label: 'Manual' },
//   { value: 'automatic', label: 'Automatic' },
// ];

// const CONDITION_TYPES = [
//   { value: 'new', label: 'New' },
//   { value: 'used', label: 'Used' },
//   { value: 'certified', label: 'Certified Pre-owned' },
//   { value: 'damaged', label: 'Damaged' },
//   { value: 'accident', label: 'Accident' },
//   { value: 'salvage', label: 'Salvage' }
// ];

// const YEARS = Array.from({ length: new Date().getFullYear() - 2015 }, (_, i) => {
//   const year = new Date().getFullYear() - i;
//   return { value: year.toString(), label: year.toString() };
// });


// export default function AdminDashboard() {
//   const [stats, setStats] = useState<AdminStats | null>(null);
//   const [users, setUsers] = useState<AdminUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingCar, setIsAddingCar] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   // Car form state
//   const [carForm, setCarForm] = useState({
//     title: '',
//     description: '',
//     price: '',
//     make: '',
//     model: '',
//     year: '',
//     mileage: '',
//     fuel_type: 'petrol',
//     transmission: 'manual',
//     condition: 'used',
//     color: '',
//     engine_size: '',
//     doors: '4',
//     seats: '5',
//     features: '',
//     is_featured: false,
//     is_available: true
//   });

//     const [mainImage, setMainImage] = useState<File | null>(null);
//     const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

//   useEffect(() => {
//     const checkAdminAccess = async () => {
//       if (!isAuthenticated()) {
//         router.push('/auth/login');
//         return;
//       }

//       const user = getCurrentUser();
//       if (!user) {
//         router.push('/auth/login');
//         return;
//       }

//       try {
//         // Check if user is admin by trying to access admin stats
//         const [statsResponse, usersResponse] = await Promise.all([
//           api.get('/admin/stats/'),
//           api.get('/admin/users/')
//         ]);
        
//         setStats(statsResponse.data);
//         setUsers(usersResponse.data);
//       } catch (error: any) {
//         if (error.response?.status === 403) {
//           toast({
//             title: "Access Denied",
//             description: "You don't have admin privileges to access this page.",
//             variant: "destructive",
//           });
//           router.push('/');
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to load admin data.",
//             variant: "destructive",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAdminAccess();
//   }, [router, toast]);

//   // const handleAddCar = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setIsAddingCar(true);

//   //   try {
//   //     const formData = new FormData();
//   //     Object.entries(carForm).forEach(([key, value]) => {
//   //       if (key === 'is_featured' || key === 'is_available') {
//   //         formData.append(key, value.toString());
//   //       } else {
//   //         formData.append(key, value as string);
//   //       }
//   //     });
      
           
//   //     if (mainImage) {
//   //       formData.append('main_image', mainImage);
//   //     }

      
//   //     if (galleryImages) {
//   //       for (let i = 0; i < galleryImages.length; i++) {
//   //         formData.append('gallery_images', galleryImages[i]);
//   //       }
//   //     }


//   //     await api.post('/admin/add-car/', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     toast({
//   //       title: "Success",
//   //       description: "Car added successfully!",
//   //     });

//   //     // Reset form
//   //     setCarForm({
//   //       title: '',
//   //       description: '',
//   //       price: '',
//   //       make: '',
//   //       model: '',
//   //       year: '',
//   //       mileage: '',
//   //       fuel_type: 'petrol',
//   //       transmission: 'manual',
//   //       condition: 'used',
//   //       color: '',
//   //       engine_size: '',
//   //       doors: '4',
//   //       seats: '5',
//   //       features: '',
//   //       is_featured: false,
//   //       is_available: true
//   //     });

//   //     setMainImage(null);
//   //     setGalleryImages(null);

//   //     setIsDialogOpen(false);

//   //     // Refresh stats
//   //     const statsResponse = await api.get('/admin/stats/');
//   //     setStats(statsResponse.data);
//   //   } catch (error: any) {
//   //     toast({
//   //       title: "Error",
//   //       description: error.response?.data?.error || "Failed to add car.",
//   //       variant: "destructive",
//   //     });
//   //   } finally {
//   //     setIsAddingCar(false);
//   //   }
//   // };
// const handleAddCar = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsAddingCar(true);

//   try {
//     const formData = new FormData();

//     Object.entries(carForm).forEach(([key, value]) => {
//       if (key === 'is_featured' || key === 'is_available') {
//         formData.append(key, value ? 'true' : 'false'); // lowercase string
//       } else if (key === 'features') {
//         // If features is an array, send each separately
//         if (Array.isArray(value)) {
//           value.forEach((feature) => formData.append('features', feature));
//         } else {
//           formData.append('features', value as string);
//         }
//       } else {
//         formData.append(key, value as string);
//       }
//     });

//     if (mainImage) {
//       formData.append('main_image', mainImage);
//     }

//     if (galleryImages && galleryImages.length > 0) {
//       for (let i = 0; i < galleryImages.length; i++) {
//         formData.append('gallery_images', galleryImages[i]);
//       }
//     }

//     await api.post('/admin/add-car/', formData); // remove manual Content-Type

//     toast({
//       title: "Success",
//       description: "Car added successfully!",
//     });

//     // Reset form...
//   } catch (error: any) {
//     console.error("Add Car Error:", error.response?.data);
//     toast({
//       title: "Error",
//       description: JSON.stringify(error.response?.data) || "Failed to add car.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsAddingCar(false);
//   }
// };

//     const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMainImage(file);
//     }
//   };

//   const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       setGalleryImages(files);
//     }
//   };

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return 'Never';
//     return new Date(dateString).toLocaleDateString();
//   };


'use client';

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, isAdmin } from '@/lib/auth';
import api from '@/lib/api';
import { AdminStats, AdminUser, Car } from '@/types/car';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Car as CarIcon, 
  Users, 
  BarChart3, 
  Plus, 
  Shield, 
  Activity,
  TrendingUp,
  Eye,
  UserCheck,
  Calendar
} from 'lucide-react';
import Loader from '@/components/Loader';
import AccessDenied from '../access-denied/page';

const CAR_BRANDS = [
  { value: 'audi', label: 'AUDI' },
  { value: 'bently', label: 'BENTLY' },
  { value: 'bmw', label: 'BMW' },
  { value: 'ford', label: 'FORD' },
  { value: 'gmc', label: 'GMC' },
  { value: 'honda', label: 'HONDA' },
  { value: 'hyundai', label: 'HYUNDAI' },
  { value: 'jaguar', label: 'JAGUAR' },
  { value: 'jeep', label: 'JEEP' },
  { value: 'kia', label: 'KIA' },
  { value: 'land rover', label: 'LAND ROVER' },
  { value: 'lexus', label: 'LEXUS' },
  { value: 'mazda', label: 'MAZDA' },
  { value: 'mercedes', label: 'MERCEDES' },
  { value: 'mitsubishi', label: 'MITSUBISHI' },
  { value: 'nissan', label: 'NISSAN' },
  { value: 'porsche', label: 'PORSCHE' },
  { value: 'toyota', label: 'TOYOTA' },
];

const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
  { value: 'gas', label: 'Gas' }
];

const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
];

const CONDITION_TYPES = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'certified', label: 'Certified Pre-owned' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'accident', label: 'Accident' },
  { value: 'salvage', label: 'Salvage' }
];

// Generate years from current year down to 1990
const YEARS = Array.from({ length: new Date().getFullYear() - 2015 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Car form state
  const [carForm, setCarForm] = useState({
    title: '',
    description: '',
    price: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuel_type: 'petrol',
    transmission: 'manual',
    condition: 'used',
    color: '',
    engine_size: '',
    doors: '4',
    seats: '5',
    features: '',
    is_featured: false,
    is_available: true
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isAuthenticated()) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
        router.push('/auth/login');
        return;
      }

      if (!isAdmin()) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to access this page.",
          variant: "destructive",
        });
        router.push('/auth/login');
        return;
      }

      try {
        // Fetch admin data
        const [statsResponse, usersResponse] = await Promise.all([
          api.get('/admin/stats/'),
          api.get('/admin/users/')
        ]);
        
        setStats(statsResponse.data);
        setUsers(usersResponse.data);
      } catch (error: any) {
        if (error.response?.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges to access this page.",
            variant: "destructive",
          });
          router.push('/');
        } else {
          console.error('Admin data fetch error:', error);
          toast({
            title: "Error",
            description: "Failed to load admin data.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router, toast]);

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingCar(true);

    try {
      const formData = new FormData();
      Object.entries(carForm).forEach(([key, value]) => {
        if (key === 'is_featured' || key === 'is_available') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value as string);
        }
      });

      // Add main image
      if (mainImage) {
        formData.append('main_image', mainImage);
      }

      // Add gallery images
      if (galleryImages) {
        for (let i = 0; i < galleryImages.length; i++) {
          formData.append('gallery_images', galleryImages[i]);
        }
      }

      await api.post('/admin/add-car/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Success",
        description: "Car added successfully!",
      });

      // Reset form
      setCarForm({
        title: '',
        description: '',
        price: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        fuel_type: 'petrol',
        transmission: 'manual',
        condition: 'used',
        color: '',
        engine_size: '',
        doors: '4',
        seats: '5',
        features: '',
        is_featured: false,
        is_available: true
      });
      setMainImage(null);
      setGalleryImages(null);

      setIsDialogOpen(false);

      // Refresh stats
      const statsResponse = await api.get('/admin/stats/');
      setStats(statsResponse.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to add car.",
        variant: "destructive",
      });
    } finally {
      setIsAddingCar(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setGalleryImages(files);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
          <Loader />
    );
  }

  if (!stats) {
    return (
      <AccessDenied />

    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car inventory and users</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6 ">
          <TabsList className="grid w-full grid-cols-4 text-black ">
            <TabsTrigger value="overview" className='font-extrabold cursor-pointer'>Overview</TabsTrigger>
            <TabsTrigger value="cars" className='font-extrabold cursor-pointer'>Cars</TabsTrigger>
            <TabsTrigger value="users" className='font-extrabold cursor-pointer'>Users</TabsTrigger>
            <TabsTrigger value="analytics" className='font-extrabold cursor-pointer'>Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-black font-medium">Total Cars</CardTitle>
                  <CarIcon className="h-6 w-6 text-black text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl text-black font-bold">{stats.car_overview.total}</div>
                  <p className="text-xs text-black text-muted-foreground">
                    {stats.car_overview.available} available
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-black font-medium">Featured Cars</CardTitle>
                  <TrendingUp className="h-6 w-6 text-black text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl text-black font-bold">{stats.car_overview.featured}</div>
                  <p className="text-xs text-black text-muted-foreground">
                    Hot sales cars
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-black font-medium">Total Users</CardTitle>
                  <Users className="h-6 w-6 text-black text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl text-black font-bold">{stats.user_stats.total}</div>
                  <p className="text-xs text-black text-muted-foreground">
                    {stats.user_stats.active} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-black font-medium">Admin Users</CardTitle>
                  <Shield className="h-6 w-6 text-black text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl text-black font-bold">{stats.user_stats.admins}</div>
                  <p className="text-xs text-black text-muted-foreground">
                    Staff members
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Car Brands Chart */}
            <Card>
              <CardHeader>
                <CardTitle className='text-black'>Cars by Brand</CardTitle>
                <CardDescription className='text-black'>Distribution of cars across different brands</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.car_stats.map((brand: { make: any; count: any }, index: number) => (
                    <div key={brand.make ? String(brand.make) : `brand-${index}`} className="flex items-center text-black justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="font-medium capitalize">{brand.make}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${
                                typeof brand.count === 'number' &&
                                typeof stats.car_overview.total === 'number' &&
                                stats.car_overview.total > 0
                                  ? (brand.count / stats.car_overview.total) * 100
                                  : 0
                              }%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{brand.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6 text-black">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Car Management</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className='cursor-pointer text-white' variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-7xl h-[90vh] p-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-none shadow-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Car</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new car to the inventory.
                    </DialogDescription>
                  </DialogHeader>
                  {/* <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-6"> */}
                    <form onSubmit={handleAddCar} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.title}
                            onChange={(e) => setCarForm({...carForm, title: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (GHS)</Label>
                          <Input
                            id="price"
                            type="number"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.price}
                            onChange={(e) => setCarForm({...carForm, price: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                          value={carForm.description}
                          onChange={(e) => setCarForm({...carForm, description: e.target.value})}
                          required
                        />
                      </div>
                    {/* Main and Gallery Images */}
                       <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="main_image">Main Image *</Label>
                        <Input
                          id="main_image"
                          type="file"
                          accept="image/*"
                          
                          onChange={handleMainImageChange}
                          required
                          className="
                            file:mr-4 
                            file: mb-2
                            file:py-2 
                            file:px-4 
                            file:rounded-full 
                            file:border-0 
                            file:text-sm 
                            file:font-semibold 
                            file:bg-white/30 
                            file:text-blue-700 
                            file:backdrop-blur-md 
                            hover:file:bg-white/40
                            bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50
                            focus:border-white/40 focus:ring-2 focus:ring-white/30
                            h-12
                            "
                        />
                        {mainImage && (
                          <p className="text-sm text-gray-600 mt-1">
                            Selected: {mainImage.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="gallery_images">Image Gallery (Optional)</Label>
                        <Input
                          id="gallery_images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImagesChange}
                          className="
                          file:mr-4 
                            file:py-2 
                            file:px-4 
                            file:rounded-full 
                            file:border-0 
                            file:text-sm 
                            file:font-semibold 
                            file:bg-white/30 
                            file:text-blue-700 
                            file:backdrop-blur-md 
                            hover:file:bg-white/40
                            bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30
                            h-12
                          "
                        />
                        {galleryImages && galleryImages.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            Selected: {galleryImages.length} image(s)
                          </p>
                        )}
                      </div>
                    </div>


                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="make">Brand</Label>
                          <Select value={carForm.make} onValueChange={(value: any) => setCarForm({...carForm, make: value})}>
                            <SelectTrigger className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-900 border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg" >
                              {CAR_BRANDS.map((brand) => (
                                <SelectItem  key={brand.value} value={brand.value}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-200"
                                >
                                  {brand.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.model}
                            onChange={(e) => setCarForm({...carForm, model: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="year">Year</Label>
                        <Select value={carForm.year} onValueChange={(value) => setCarForm({...carForm, year: value})}>
                          <SelectTrigger className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-gray-900 border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg">
                            {YEARS.map((year) => (
                              <SelectItem key={year.value} value={year.value}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-200"
                              >
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        </div>
                        <div>
                          <Label htmlFor="mileage">Mileage (km)</Label>
                          <Input
                            id="mileage"
                            type="number"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.mileage}
                            onChange={(e) => setCarForm({...carForm, mileage: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.color}
                            onChange={(e) => setCarForm({...carForm, color: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fuel_type">Fuel Type</Label>
                        <Select value={carForm.fuel_type} onValueChange={(value) => setCarForm({...carForm, fuel_type: value})}>
                          <SelectTrigger className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent
                           className="bg-white text-gray-900 border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg"
                          >
                            {FUEL_TYPES.map((fuel) => (
                              <SelectItem key={fuel.value} value={fuel.value}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-200"
                              >
                                {fuel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        </div>
                        <div>
                           <Label htmlFor="transmission">Transmission</Label>
                        <Select value={carForm.transmission} onValueChange={(value) => setCarForm({...carForm, transmission: value})}>
                          <SelectTrigger className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-gray-900 border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg">
                            {TRANSMISSION_TYPES.map((transmission) => (
                              <SelectItem key={transmission.value} value={transmission.value}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-200"
                              >
                                {transmission.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div >
                          <Label htmlFor="condition">Condition</Label>
                        <Select value={carForm.condition} onValueChange={(value) => setCarForm({...carForm, condition: value})}>
                          <SelectTrigger className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent  className="bg-white text-gray-900 border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg">
                            {CONDITION_TYPES.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 focus:bg-gray-200"
                              >
                                {condition.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        </div>
                        <div>
                          <Label htmlFor="doors">Doors</Label>
                          <Input
                            id="doors"
                            type="number"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.doors}
                            onChange={(e) => setCarForm({...carForm, doors: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="seats">Seats</Label>
                          <Input
                            id="seats"
                            type="number"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            value={carForm.seats}
                            onChange={(e) => setCarForm({...carForm, seats: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="features">Features (comma-separated)</Label>
                        <Textarea
                          id="features"
                          value={carForm.features}
                          className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                          onChange={(e) => setCarForm({...carForm, features: e.target.value})}
                          placeholder="Air Conditioning, Power Steering, ABS, etc."
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_featured"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            checked={carForm.is_featured}
                            onChange={(e) => setCarForm({...carForm, is_featured: e.target.checked})}
                          />
                          <Label htmlFor="is_featured">Featured (Hot Sale)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_available"
                            className="bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/30"
                            checked={carForm.is_available}
                            onChange={(e) => setCarForm({...carForm, is_available: e.target.checked})}
                          />
                          <Label htmlFor="is_available">Available</Label>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={isAddingCar}
                          className="
                            border-2 border-white rounded-full 
                            text-white 
                            px-6 py-2 
                            transition-all duration-300 
                            hover:bg-white hover:text-blue-700
                          "
                        >
                          {isAddingCar ? 'Adding...' : 'Add Car'}
                        </Button>

                      </DialogFooter>
                    </form>
                  {/* </div> */}
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Car Inventory Overview</CardTitle>
                <CardDescription>Quick stats about your car inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{stats.car_overview.total}</div>
                    <div className="text-sm text-gray-600">Total Cars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{stats.car_overview.available}</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">{stats.car_overview.featured}</div>
                    <div className="text-sm text-gray-600">Featured</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 text-black">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.is_active ? "default" : "secondary"}>
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className='text-black' variant={user.is_staff ? "destructive" : "outline"}>
                            {user.is_staff ? "Admin" : "User"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.date_joined)}</TableCell>
                        <TableCell>{formatDate(user.last_login)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 text-black">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Distribution</CardTitle>
                  <CardDescription>Cars by brand in your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.car_stats.slice(0, 8).map((brand: { make: string; count: number }, index: number) => (
                      <div key={String(brand.make) || `brand-${index}`} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ 
                              backgroundColor: `hsl(${(index * 45) % 360}, 70%, 50%)` 
                            }}
                          ></div>
                          <span className="font-medium capitalize">{brand.make}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(typeof brand.count === 'number' && typeof stats.car_overview.total === 'number' && stats.car_overview.total > 0
                                  ? (brand.count / stats.car_overview.total) * 100
                                  : 0
                                )}%`,
                                backgroundColor: `hsl(${(index * 45) % 360}, 70%, 50%)`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{brand.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                  <CardDescription>Overview of user activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span>Total Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-green-600" />
                        <span>Active Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span>Admin Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.admins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}