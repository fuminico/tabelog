import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding with final, verified, real photo URLs ...`);

  // Delete existing data
  await prisma.review.deleteMany();
  await prisma.store.deleteMany();

  const stores = [
    {
      name: 'モダンカフェ東京',
      address: '東京都渋谷区神南1-1-1',
      category: 'カフェ',
      description: 'スペシャルティコーヒーと自家製ケーキが楽しめる落ち着いた雰囲気のカフェ。',
      photo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    },
    {
      name: '麺屋 龍の咆哮',
      address: '東京都新宿区歌舞伎町2-2-2',
      category: 'ラーメン',
      description: '濃厚な豚骨スープと自家製麺が自慢。一度食べたら忘れられない味。',
      photo_url: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
    },
    {
      name: 'トラットリア・フィレンツェ',
      address: '東京都港区麻布十番3-3-3',
      category: 'イタリアン',
      description: '本場トスカーナ地方の家庭料理を再現。ワインと共にどうぞ。',
      photo_url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7',
    },
    {
      name: '寿司処 匠',
      address: '東京都中央区銀座4-4-4',
      category: '寿司',
      description: '豊洲市場から毎朝仕入れる新鮮なネタを使った本格江戸前寿司。',
      photo_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    },
    {
      name: 'グリーンオアシス',
      address: '東京都目黒区自由が丘5-5-5',
      category: 'オーガニック',
      description: '新鮮な有機野菜をふんだんに使ったヘルシーなデリとスムージー。',
      photo_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    },
    {
      name: 'スパイスキングダム',
      address: '東京都豊島区池袋6-6-6',
      category: 'カレー',
      description: '30種類以上のスパイスをブレンドした本格インドカレー。',
      photo_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    },
    {
      name: 'Boulangerie Le Ciel',
      address: '神奈川県横浜市中区元町7-7-7',
      category: 'ベーカリー',
      description: 'フランス産小麦を使用したこだわりのパンが毎日焼き上がります。',
      photo_url: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877',
    },
    {
      name: '焼肉 牛門',
      address: '大阪府大阪市中央区難波8-8-8',
      category: '焼肉',
      description: 'A5ランクの黒毛和牛を一頭買い。希少部位もリーズナブルに。',
      photo_url: 'https://images.unsplash.com/photo-1663569820326-fece03afdf1c?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'The Burger Factory',
      address: '東京都世田谷区下北沢9-9-9',
      category: 'ハンバーガー',
      description: '100%ビーフパティと特注バンズで作るグルメバーガー。',
      photo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    },
    {
      name: '甘味処 ことり',
      address: '京都府京都市東山区祇園町10-10',
      category: '甘味処',
      description: '抹茶パフェやあんみつなど、京都ならではの和スイーツをご提供。',
      photo_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
    },
  ];

  await prisma.store.createMany({
    data: stores,
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });