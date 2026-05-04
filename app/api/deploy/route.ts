import { NextResponse } from 'next/server';
import { deployContract } from '@/lib/rpc';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { abi, bytecode } = body;
    if (!abi || !bytecode) {
      return NextResponse.json({ error: 'abi and bytecode required' }, { status: 400 });
    }
    const result = await deployContract(abi, bytecode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}
