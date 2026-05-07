import { NextResponse } from 'next/server';
import { deployContract } from '@/lib/rpc';

// Max bytecode length in hex characters (256 KB of bytecode)
const MAX_BYTECODE_HEX_LEN = 524_288;
// Max ABI entries
const MAX_ABI_ENTRIES = 500;
// Hex-only pattern (optional 0x prefix)
const HEX_RE = /^(0x)?[0-9a-fA-F]*$/;

export async function POST(request: Request) {
  try {
    // Reject oversized request bodies early (body > 512 KB raw)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 524_288) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Body must be a JSON object' }, { status: 400 });
    }

    const { abi, bytecode } = body as Record<string, unknown>;

    if (!Array.isArray(abi)) {
      return NextResponse.json({ error: 'abi must be an array' }, { status: 400 });
    }
    if (abi.length > MAX_ABI_ENTRIES) {
      return NextResponse.json({ error: 'abi exceeds maximum entry count' }, { status: 400 });
    }
    if (typeof bytecode !== 'string') {
      return NextResponse.json({ error: 'bytecode must be a string' }, { status: 400 });
    }
    if (bytecode.length > MAX_BYTECODE_HEX_LEN) {
      return NextResponse.json({ error: 'bytecode too large' }, { status: 400 });
    }
    if (!HEX_RE.test(bytecode)) {
      return NextResponse.json({ error: 'bytecode must be a hex string' }, { status: 400 });
    }

    const result = await deployContract(abi, bytecode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}
