import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

const postTimestamps = new Map<string, number>();
const POST_INTERVAL_SECONDS = 60;

// GET: 指定した店舗のレビュー一覧を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const store_id = searchParams.get('store_id');

    if (!store_id) {
      return NextResponse.json({ error: 'store_id is required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { store_id },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: 新しいレビューを投稿
export async function POST(request: NextRequest) {
  try {
    // レート制限
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
    const now = Date.now();
    const lastPostTime = postTimestamps.get(ip);

    if (lastPostTime && now - lastPostTime < POST_INTERVAL_SECONDS * 1000) {
      const timeLeft = Math.ceil((POST_INTERVAL_SECONDS * 1000 - (now - lastPostTime)) / 1000);
      return NextResponse.json({ error: `連続投稿はできません。あと ${timeLeft}秒 お待ちください。` }, { status: 429 });
    }

    const body = await request.json();
    const { store_id, rating, comment } = body;

    if (!store_id || typeof store_id !== 'string' || rating === undefined || !comment) {
      return NextResponse.json({ error: 'store_id (string), rating, and comment are required' }, { status: 400 });
    }
    
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be a number between 1 and 5' }, { status: 400 });
    }

    const store = await prisma.store.findUnique({ where: { id: store_id } });
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const newReview = await prisma.review.create({
      data: {
        store_id,
        rating,
        comment,
      },
    });

    // 成功したらタイムスタンプを記録
    postTimestamps.set(ip, now);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}