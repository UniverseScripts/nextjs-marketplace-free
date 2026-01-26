'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Filter, Users, Home } from 'lucide-react';
import { ListingCard } from '@/components/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 1. MOCK DATA (Hardcoded "Database")
const MOCK_APARTMENTS = [
  {
    id: 101,
    title: "Sunny Studio in D1",
    price: 450,
    size: 35,
    location: "District 1, HCMC",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"],
    badgeLabel: "New",
    badgeColor: "bg-green-600",
    features: ["Wifi", "AC", "Gym"]
  },
  {
    id: 102,
    title: "Modern Loft near RMIT",
    price: 600,
    size: 55,
    location: "District 7, HCMC",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"],
    badgeLabel: "Popular",
    badgeColor: "bg-orange-500",
    features: ["Pool", "Parking", "Security"]
  },
  {
    id: 103,
    title: "Cozy Room in Shared Apt",
    price: 250,
    size: 20,
    location: "Binh Thanh, HCMC",
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"],
    badgeLabel: "Best Value",
    badgeColor: "bg-blue-600",
    features: ["Kitchen", "Washer"]
  }
];

const MOCK_ROOMMATES = [
  {
    id: 201,
    title: "Alex (CS Student)",
    price: 300, // Budget
    size: 21, // Age
    location: "Looking in D7",
    images: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"],
    badgeLabel: "98% Match",
    badgeColor: "bg-purple-600",
    features: ["Quiet", "Non-smoker", "Gamer"]
  },
  {
    id: 202,
    title: "Sarah (Marketing)",
    price: 400,
    size: 22,
    location: "Looking in D1/D3",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"],
    badgeLabel: "85% Match",
    badgeColor: "bg-teal-600",
    features: ["Social", "Pet friendly", "Clean"]
  }
];

export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("apartments");
  const [searchQuery, setSearchQuery] = useState("");

  const activeData = activeTab === "apartments" ? MOCK_APARTMENTS : MOCK_ROOMMATES;
  
  // Filter logic for the demo
  const filteredData = activeData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder={activeTab === 'apartments' ? "Search apartments..." : "Search roommates..."}
              className="pl-9 bg-gray-100 border-transparent focus:bg-white transition-all rounded-xl" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl" onClick={() => alert("Filters feature is in PRO version")}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* TABS */}
        <Tabs defaultValue="apartments" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="apartments" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Home className="w-4 h-4 mr-2" /> Apartments
            </TabsTrigger>
            <TabsTrigger value="roommates" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="w-4 h-4 mr-2" /> Roommates
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* LISTINGS GRID */}
      <div className="p-4 space-y-4">
        {filteredData.map((item) => (
          <ListingCard 
            key={item.id} 
            listing={item} 
            onViewListing={() => alert(`View Details for ${item.title} (Available in PRO)`)} 
          />
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found in demo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
