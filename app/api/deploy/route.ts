import { NextResponse } from 'next/server';
import { deployContract } from '@/lib/rpc';

// Max bytecode length in hex characters (256 KB of bytecode = 524288 hex chars)
const MAX_BYTECODE_HEX_LEN = 524_288;
// Max ABI entries
const MAX_ABI_ENTRIES = 500;
// Max raw body size in bytes (512 KB)
const MAX_BODY_BYTES = 524_288;
// Pure hex pattern (no prefix) — applied to rawHex after prefix stripping
const RAW_HEX_RE = /^[0-9a-fA-F]+$/;
// Reusable encoder for byte-length calculation
const textEncoder = new TextEncoder();

export async function POST(request: Request) {
  try {
    // Read the body as text first so we can enforce a hard size limit regardless
    // of whether the client sends a Content-Length header.
    let rawBody: string;
    try {
      const text = await request.text();
      if (textEncoder.encode(text).length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
      }
      rawBody = text;
    } catch {
      return NextResponse.json({ error: 'Failed to read request body' }, { status: 400 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
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
    // Strip optional 0x prefix; all subsequent checks operate on rawHex
    const rawHex = bytecode.startsWith('0x') || bytecode.startsWith('0X')
      ? bytecode.slice(2)
      : bytecode;
    if (rawHex.length === 0) {
      return NextResponse.json({ error: 'bytecode must not be empty' }, { status: 400 });
    }
    if (rawHex.length > MAX_BYTECODE_HEX_LEN) {
      return NextResponse.json({ error: 'bytecode too large' }, { status: 400 });
    }
    if (rawHex.length % 2 !== 0) {
      return NextResponse.json({ error: 'bytecode must have even hex length' }, { status: 400 });
    }
    if (!RAW_HEX_RE.test(rawHex)) {
      return NextResponse.json({ error: 'bytecode must be a valid hex string' }, { status: 400 });
    }

    const result = await deployContract(abi, bytecode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}
