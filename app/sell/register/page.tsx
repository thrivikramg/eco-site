"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SellerRegistrationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!session) {
      setError('You must be logged in to register as a seller.');
      return;
    }

    try {
      const response = await fetch('/api/seller/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeName, storeDescription }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Become a Seller</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="storeDescription">Store Description</Label>
          <Input
            id="storeDescription"
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
          />
        </div>
        <Button type="submit">Register as Seller</Button>
      </form>
    </div>
  );
}
