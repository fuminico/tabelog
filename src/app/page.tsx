'use client';

import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import StoreList from '@/components/StoreList';
import type { Store } from '@prisma/client';

export default function Home() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch('/api/stores');
        if (!res.ok) {
          throw new Error('Failed to fetch stores');
        }
        const data = await res.json();
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <AnimatedPage>
      <h1 className="text-3xl font-bold mb-6">店舗一覧</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p className="text-destructive">エラー: {error}</p>}
      {!loading && !error && <StoreList stores={stores} />}
    </AnimatedPage>
  );
}
