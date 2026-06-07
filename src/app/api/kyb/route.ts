import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Cached connection for serverless environments
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form } = body;

    if (!form || !form.full_name) {
      return NextResponse.json({ error: 'Invalid submission data' }, { status: 400 });
    }

    const mongoClient = await getClientPromise();
    const db = mongoClient.db(process.env.MONGODB_DB_NAME ?? '9qc-africa-db');
    const collection = db.collection('spotlight_kyb_submissions');

    const doc = {
      ...form,
      source: 'seed-stage-spotlight',
      status: 'pending',
      submittedAt: new Date(),
    };

    const result = await collection.insertOne(doc);

    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (err: unknown) {
    console.error('[KYB API] Error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
