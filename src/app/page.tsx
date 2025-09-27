import AnimatedPage from '@/components/AnimatedPage';
import StoreList from '@/components/StoreList';

interface Store {
  id: number;
  name: string;
  category: string;
  address: string;
}

async function getStores(): Promise<Store[]> {
  // APIのURLを絶対パスで指定
  const res = await fetch('http://localhost:3001/api/stores', { cache: 'no-store' });
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
