'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { PlusCircle } from 'lucide-react';

const NewStorePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !address || !category) {
      setError('店名、住所、カテゴリは必須です。');
      return;
    }

    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          category,
          description,
          photo_url: photoUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('店舗の登録に失敗しました。');
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-2xl mx-auto">
        <Card className="bg-secondary border-border/60">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <PlusCircle className="h-7 w-7 text-primary" />
              新しい店舗を登録
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">店名</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoUrl">画像URL（任意）</Label>
                <Input id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明（任意）</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              {error && <p className="text-destructive text-sm font-medium">{error}</p>}
              <Button type="submit" size="lg" className="w-full">登録する</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
};

export default NewStorePage;