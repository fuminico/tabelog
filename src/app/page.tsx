import AnimatedPage from '@/components/AnimatedPage';
import StoreList from '@/components/StoreList';

interface Store {
  id: number;
  name: string;
  category: string;
  address: string;
  photo_url: string | null;
}

async function getStores(): Promise<Store[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/stores`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch stores');
  }
  return res.json();
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
