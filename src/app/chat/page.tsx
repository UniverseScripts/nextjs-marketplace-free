'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MessageSquareDashed, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DUMMY_CHATS = [
  {
    partner_id: 1,
    partner_name: "Alice Smith",
    last_message: "Is the room still available?",
    unread_count: 2,
    last_message_time: new Date().toISOString(),
    is_online: true,
  },
  {
    partner_id: 2,
    partner_name: "John Doe",
    last_message: "Great, see you tomorrow!",
    unread_count: 0,
    last_message_time: new Date(Date.now() - 86400000).toISOString(),
    is_online: false,
  }
];

export default function ChatListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');


  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages (Demo)</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..." 
            className="pl-9 bg-gray-50 border-transparent focus:bg-white transition-all rounded-xl" 
          />
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="px-4 py-2">
          <div className="space-y-1">
            {DUMMY_CHATS.map((chat) => (
              <div 
                key={chat.partner_id}
                onClick={() => alert("Chat Logic is available in the PRO version.")}
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {chat.partner_name[0]}
                  </div>
                  {chat.is_online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900 truncate pr-2">
                      {chat.partner_name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatTime(chat.last_message_time)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm truncate pr-4 text-gray-500">
                      {chat.last_message}
                    </p>
                    {chat.unread_count > 0 && (
                       <div className="h-5 px-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                         {chat.unread_count}
                       </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}