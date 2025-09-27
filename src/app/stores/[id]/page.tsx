'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ReviewForm from '@/components/ReviewForm';
import AnimatedPage from '@/components/AnimatedPage';
import { UtensilsCrossed, Star, MessageSquare, CalendarDays } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  description: string | null;
  photo_url: string | null;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const [store, setStore] = useState<Store | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [storeRes, reviewsRes] = await Promise.all([
          fetch(`/api/stores/${params.id}`),
          fetch(`/api/reviews?store_id=${params.id}`),
        ]);

        if (!storeRes.ok) {
          throw new Error('店舗情報の取得に失敗しました。');
        }
        const storeData = await storeRes.json();
        setStore(storeData);

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'データの取得中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">読み込み中...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64">エラー: {error}</div>;
  }

  if (!store) {
    return <div className="flex justify-center items-center h-64">店舗が見つかりません。</div>;
  }

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-secondary border-border/60 overflow-hidden">
          {store.photo_url && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={store.photo_url}
                alt={store.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-4xl font-bold">{store.name}</CardTitle>
            <CardDescription className="pt-2">{store.category} - {store.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{store.description || '説明はありません。'}</p>
          </CardContent>
        </Card>

        <ReviewForm storeId={store.id} />

        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <MessageSquare className="h-7 w-7 text-primary" />
            レビュー
          </h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="bg-secondary border-border/60">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{review.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-secondary border-border/60 text-center py-12">
              <p className="text-muted-foreground">まだレビューはありません。</p>
            </Card>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}