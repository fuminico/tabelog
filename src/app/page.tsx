export const dynamic = 'force-dynamic';

import AnimatedPage from '@/components/AnimatedPage';
import StoreList from '@/components/StoreList';
import { prisma } from '@/lib/prisma';
import type { Store } from '@prisma/client';

async function getStores(): Promise<Store[]> {
  try {
    const stores = await prisma.store.findMany();
    return stores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores');
  }
}

export default async function Home() {
  const stores = await getStores();

  return (
    <AnimatedPage>
      <h1 className="text-3xl font-bold mb-6">店舗一覧</h1>
      <StoreList stores={stores} />
    </AnimatedPage>
  );
}
