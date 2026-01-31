'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Sparkles, User, Users, Home, Star, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { ListingCard } from '@/components/ListingCard';
import { Logo } from '@/components/Logo';
import { EmptyState } from '@/components/EmptyState';

// --- MOCK DATA (No Backend Required) ---
const MOCK_PROFILES = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 21,
    university: "RMIT University",
    major: "Design",
    city: "District 7",
    compatibility: 95,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
  },
  {
    id: 2,
    name: "Sarah Chen",
    age: 20,
    university: "Fulbright",
    major: "Computer Science",
    city: "District 1",
    compatibility: 88,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
  },
  {
    id: 3,
    name: "Mike Ross",
    age: 22,
    university: "Ton Duc Thang",
    major: "Business",
    city: "District 4",
    compatibility: 75,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
  }
];

const MOCK_LISTINGS = [
  {
    id: 101,
    title: "Modern Studio near RMIT",
    price: 6500000,
    size: 35,
    location: "District 7, HCMC",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    fitScore: 92,
    host: { name: "Owner", image: "", compatibility: 0 },
    features: ["Wifi", "AC", "Gym"],
    description: "Perfect for students."
  },
  {
    id: 102,
    title: "Cozy Room in D1",
    price: 4500000,
    size: 20,
    location: "District 1, HCMC",
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80"],
    fitScore: 85,
    host: { name: "Owner", image: "", compatibility: 0 },
    features: ["Washer", "Balcony"],
    description: "Central location."
  }
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'roommates' | 'listings'>('roommates');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // --- TOUCH STATE ---
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  // --- DATA STATE ---
  const [profiles, setProfiles] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH MOCK DATA ---
  useEffect(() => {
    const loadMockData = () => {
      setLoading(true);
      
      const stored = localStorage.getItem('starredItems');
      const starred = stored ? JSON.parse(stored) : [];

      const filteredProfiles = MOCK_PROFILES.filter(p => 
        !starred.some((s: any) => s.id === p.id && s.type === 'roommates')
      );
      
      const filteredListings = MOCK_LISTINGS.filter(l => 
        !starred.some((s: any) => s.id === l.id && s.type === 'listings')
      );

      setProfiles(filteredProfiles);
      setListings(filteredListings);
      setLoading(false);
    };

    setTimeout(loadMockData, 800);
  }, []);

  // --- SWIPE LOGIC ---
  const handleSwipe = (direction: 'left' | 'right') => {
    const currentData = activeTab === 'roommates' ? profiles : listings;
    
    if (currentIndex >= currentData.length) {
      setCurrentIndex(0); 
      return;
    }
    
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
      setDragOffset(0); // Reset drag after animation
    }, 800);
  };

  // --- TOUCH HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Swipe Threshold: 100px
    if (dragOffset > 100) {
      handleSwipe('right');
    } else if (dragOffset < -100) {
      handleSwipe('left');
    } else {
      // Snap back if threshold not met
      setDragOffset(0);
    }
  };

  // Helper to determine active styles
  const getCardStyle = () => {
    // 1. If animating out (button click or swipe finish), let CSS handle it
    if (swipeDirection) return {}; 
    
    // 2. If dragging, follow the finger
    if (isDragging || dragOffset !== 0) {
       return {
         transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
         cursor: 'grabbing',
         transition: isDragging ? 'none' : 'transform 0.3s ease-out' // No transition while dragging, smooth snap back
       };
    }
    
    // 3. Default state
    return { cursor: 'grab' };
  };

  const handleStar = () => {
    const currentItem = activeTab === 'roommates' ? profiles[currentIndex] : listings[currentIndex];
    if (!currentItem) return;

    const userId = localStorage.getItem('userId') || 'demo_user';
    const storageKey = `starredItems_${userId}`;
    const stored = localStorage.getItem(storageKey); 
    const starredItems = stored ? JSON.parse(stored) : [];

    const newItem = {
      id: currentItem.id,
      type: activeTab,
      title: activeTab === 'roommates' ? currentItem.name : currentItem.title,
      image: activeTab === 'listings' ? currentItem.images?.[0] : currentItem.image,
      subtitle: activeTab === 'roommates' ? currentItem.major : `${(currentItem.price / 1000000).toFixed(1)}M`,
    };

    const exists = starredItems.find((i: any) => i.id === newItem.id && i.type === newItem.type);
    if (!exists) {
      const updatedList = [newItem, ...starredItems];
      localStorage.setItem(storageKey, JSON.stringify(updatedList)); 
      const globalStored = localStorage.getItem('starredItems');
      const globalList = globalStored ? JSON.parse(globalStored) : [];
      localStorage.setItem('starredItems', JSON.stringify([...globalList, newItem]));
      
      alert(`⭐ Saved to your collection!`);
    }
    
    handleSwipe('right');
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return 'bg-[#00B5A7] text-white';
    if (score >= 70) return 'bg-[#FFC400] text-[#1A1A1A]';
    return 'bg-gray-400 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#00B5A7] mb-4" />
        <p className="text-muted-foreground animate-pulse">Finding best matches...</p>
      </div>
    );
  }

  const currentData = activeTab === 'roommates' ? profiles : listings;
  const isRoommates = activeTab === 'roommates';
  const currentItem = currentData[currentIndex];

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-white flex flex-col pb-24">
         <Header 
           activeTab={activeTab} 
           setActiveTab={setActiveTab} 
           onReset={() => setCurrentIndex(0)} 
           count={0}
         />
        <div className="flex-1 flex items-center justify-center p-4">
          <EmptyState 
              type="discovery" 
              onAction={() => window.location.reload()} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onReset={() => setCurrentIndex(0)}
        count={currentData.length - currentIndex}
      />

      {/* CARD STACK */}
      <div className="flex-1 p-4 flex items-center justify-center overflow-hidden">
        <div 
            className="relative w-full px-4 max-w-sm h-[65vh] min-h-[500px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
          {isRoommates ? (
            <Card 
              style={getCardStyle()}
              className={`
                relative w-full h-full overflow-hidden shadow-xl border-0 bg-white rounded-3xl touch-pan-y
                ${!isDragging && !swipeDirection ? 'transition-all duration-800 ease-out' : ''}
                ${swipeDirection === 'left' ? '-translate-x-full -rotate-12 opacity-0' : ''}
                ${swipeDirection === 'right' ? 'translate-x-full rotate-12 opacity-0' : ''}
              `}
            >
              <div className="relative h-[65%] w-full">
                <ImageWithFallback
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <Badge className={`absolute top-4 right-4 px-3 py-1.5 backdrop-blur-md border-0 text-sm ${getCompatibilityColor(currentItem.compatibility)}`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {currentItem.compatibility}% Match
                </Badge>
              </div>

              <div className="p-6 h-[35%] flex flex-col justify-between relative bg-white">
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">{currentItem.name}</h2>
                    <span className="text-xl text-gray-500 font-light">{currentItem.age}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <User className="w-4 h-4 text-[#00B5A7]" />
                    <span className="text-sm font-medium">{currentItem.university}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-[#00B5A7]/10 text-[#00B5A7]">
                      {currentItem.major}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {currentItem.city}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div 
                style={getCardStyle()}
                className={`
                    w-full transition-all duration-300 touch-pan-y
                    ${swipeDirection === 'left' ? '-translate-x-full -rotate-12 opacity-0' : ''}
                    ${swipeDirection === 'right' ? 'translate-x-full rotate-12 opacity-0' : ''}
                `}
            >
              <ListingCard 
                listing={currentItem} 
                onViewListing={() => alert("Details available in PRO version")} 
              />
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="fixed bottom-24 left-0 right-0 z-40 pointer-events-none">
        <div className="flex justify-center pointer-events-auto">
          <div className="flex items-center gap-6 px-8 py-3 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20">
            <Button
              variant="outline"
              onClick={() => handleSwipe('left')}
              className="w-14 h-14 rounded-full border-2 border-red-100 hover:bg-red-50 text-red-500 hover:scale-110 transition-all shadow-sm"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              onClick={handleStar}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-2 border-blue-100 hover:bg-blue-50 text-blue-500 hover:scale-110 transition-all shadow-sm"
            >
              <Star className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => handleSwipe('right')}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00B5A7] to-[#00A693] hover:scale-110 transition-all shadow-lg border-0 text-white"
            >
              <Heart className="w-6 h-6 fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ activeTab, setActiveTab, onReset, count }: any) {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Logo /> 
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Discover</h1>
            <p className="text-xs text-muted-foreground">Find your perfect match</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {count > 0 && (
             <Badge className="bg-[#00B5A7]/10 text-[#00B5A7] hover:bg-[#00B5A7]/20 border-0">
               {count} left
             </Badge>
           )}
        </div>
      </div>
      
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => { setActiveTab('roommates'); onReset(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md transition-all text-sm font-medium ${
            activeTab === 'roommates' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-500'
          }`}
        >
          <Users className="w-4 h-4" /> Roommates
        </button>
        <button
          onClick={() => { setActiveTab('listings'); onReset(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md transition-all text-sm font-medium ${
            activeTab === 'listings' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-500'
          }`}
        >
          <Home className="w-4 h-4" /> Listings
        </button>
      </div>
    </div>
  );
}
