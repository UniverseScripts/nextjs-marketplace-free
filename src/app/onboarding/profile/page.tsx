'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// REMOVED: import { submitProfile } from '@/services/onBoardingService'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, UserCircle } from 'lucide-react';
import { ONBOARDING_CONFIG } from '@/config/constants';

export default function ProfileSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: '',
    university: '',
    major: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
        setLoading(false);
        router.push('/explore');
    }, 1500);
  };

  const setField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="max-w-xl w-full p-8 shadow-xl border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
          <p className="text-sm text-gray-500 mt-2">Tell us a bit about yourself (Demo Mode)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary flex items-center gap-2 uppercase tracking-wider">
              <UserCircle className="w-4 h-4" /> Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Full Name</label>
                <Input 
                  required 
                  placeholder="John Doe"
                  onChange={(e) => setField('full_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Age</label>
                <Input 
                  type="number" 
                  required 
                  placeholder="20"
                  onChange={(e) => setField('age', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Gender</label>
              <Select onValueChange={(val) => setField('gender', val)} required>
                <SelectTrigger className="bg-gray-50/50">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Academic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary flex items-center gap-2 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> Professional Info
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Institution / Company</label>
                <Select onValueChange={(val) => setField('university', val)} required>
                  <SelectTrigger className="bg-gray-50/50">
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {ONBOARDING_CONFIG.universities.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">Role / Major</label>
                <Select onValueChange={(val) => setField('major', val)} required>
                  <SelectTrigger className="bg-gray-50/50">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {ONBOARDING_CONFIG.majors.map(major => (
                      <SelectItem key={major} value={major}>{major}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 3: Bio */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Bio</label>
            <Textarea 
              placeholder="I am a quiet person who loves coding..." 
              className="bg-gray-50/50 min-h-[100px]"
              onChange={(e) => setField('bio', e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? 'Saving Demo Profile...' : 'Complete Setup'}
          </Button>
        </form>
      </Card>
    </div>
  );
}