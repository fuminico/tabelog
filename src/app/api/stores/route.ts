import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    return NextResponse.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, category, photo_url, description } = body;

    if (!name || !address || !category) {
      return NextResponse.json({ error: 'Name, address, and category are required' }, { status: 400 });
    }

    const newStore = await prisma.store.create({
      data: {
        name,
        address,
        category,
        photo_url,
        description,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}