// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

import AnimatedPage from '@/components/AnimatedPage';
import StoreList from '@/components/StoreList';
import { prisma } from '@/lib/prisma';
import type { Store } from '@prisma/client';

/**
 * Fetches store data directly from the database.
 * This function runs on the server and is called when the page is rendered.
 */
async function getStores(): Promise<Store[]> {
  try {
    // Directly query the database using Prisma
    const stores = await prisma.store.findMany({
      orderBy: {
        created_at: 'desc', // Sort by creation date
      },
    });
    return stores;
  } catch (error) {
    // In case of a database error, log it and re-throw to be caught by Next.js error handling
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores from database.');
  }
}

export default async function Home() {
  // Fetch the stores when a user visits the page
  const stores = await getStores();

  return (
    <AnimatedPage>
      <h1 className="text-3xl font-bold mb-6">店舗一覧</h1>
      <StoreList stores={stores} />
    </AnimatedPage>
  );
}