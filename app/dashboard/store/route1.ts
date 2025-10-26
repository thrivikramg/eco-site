import { NextResponse } from 'next/server';
import { indianIfsc } from '@/lib/indian-ifsc';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bankCode = searchParams.get('bank');

  if (!bankCode) {
    return NextResponse.json({ message: 'Bank query parameter is required' }, { status: 400 });
  }

  if (!indianIfsc[bankCode]) {
    return NextResponse.json({ message: 'Bank not found or no IFSC codes available' }, { status: 404 });
  }

  const branches = indianIfsc[bankCode];

  return NextResponse.json(branches);
}