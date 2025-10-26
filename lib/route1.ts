import { NextResponse } from 'next/server';
import { indianIfsc } from '@/lib/indian-ifsc';

export async function GET(
  req: Request,
  { params }: { params: { bank: string } }
) {
  const bankCode = params.bank;

  if (!bankCode || !indianIfsc[bankCode]) {
    return NextResponse.json({ message: 'Bank not found or no IFSC codes available' }, { status: 404 });
  }

  // In a real app, you might have more complex logic to search/filter
  const branches = indianIfsc[bankCode];

  return NextResponse.json(branches);
}