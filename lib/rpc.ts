import { randomHex, randomBetween, generateAddress } from './utils';

export interface Block {
  height: number;
  hash: string;
  parentHash: string;
  timestamp: number;
  txCount: number;
  size: number;
  gasUsed: number;
  gasLimit: number;
  proposer: string;
  finalized: boolean;
  tps: number;
}

export interface Transaction {
  hash: string;
  blockHeight: number;
  from: string;
  to: string;
  value: string;
  gasUsed: number;
  gasPrice: number;
  status: 'success' | 'failed' | 'pending';
  timestamp: number;
  type: 'transfer' | 'contract' | 'deploy' | 'stake';
  data?: string;
  fee: number;
}

export interface MempoolTx {
  hash: string;
  from: string;
  to: string;
  gasPrice: number;
  gasLimit: number;
  value: string;
  timestamp: number;
  priority: 'high' | 'medium' | 'low';
  size: number;
}

export interface Validator {
  address: string;
  name: string;
  stake: number;
  delegators: number;
  uptime: number;
  blocksProposed: number;
  commission: number;
  status: 'active' | 'inactive' | 'jailed';
  apy: number;
}

export interface ChainStats {
  blockHeight: number;
  tps: number;
  avgBlockTime: number;
  totalTx: number;
  activeValidators: number;
  totalStake: number;
  marketCap: number;
  price: number;
  mempoolSize: number;
  finality: number;
}

// Internal state for mock data continuity
let currentHeight = 14_892_341;
let lastBlockTime = Date.now() - 1500;
const blocks: Block[] = [];
const VALIDATOR_NAMES = [
  'NeonForge', 'CyberStake', 'QuantumNode', 'VoidRunner', 'NexusCore',
  'PixelGuard', 'DataShard', 'HyperBlock', 'PulseChain', 'SynthWave',
  'MatrixNode', 'CipherVault', 'ProtoSync', 'ByteForge', 'GridMaster',
  'CosmicDAO', 'StarGate', 'NebulaTX', 'OmegaPool', 'ZenithStake',
];

function generateBlock(height: number): Block {
  const txCount = randomBetween(150, 800);
  const blockTime = randomBetween(1800, 2200);
  return {
    height,
    hash: randomHex(64),
    parentHash: randomHex(64),
    timestamp: Date.now() - randomBetween(0, 3000),
    txCount,
    size: randomBetween(200_000, 1_200_000),
    gasUsed: randomBetween(8_000_000, 15_000_000),
    gasLimit: 15_000_000,
    proposer: `0x${randomHex(40).slice(2)}`,
    finalized: height < currentHeight - 2,
    tps: Math.round(txCount / (blockTime / 1000)),
  };
}

function generateTransaction(blockHeight?: number): Transaction {
  const types: Transaction['type'][] = ['transfer', 'contract', 'deploy', 'stake'];
  const statuses: Transaction['status'][] = ['success', 'success', 'success', 'failed'];
  const gasPrice = randomBetween(1, 50);
  const gasUsed = randomBetween(21_000, 500_000);
  return {
    hash: randomHex(64),
    blockHeight: blockHeight ?? currentHeight,
    from: generateAddress(),
    to: generateAddress(),
    value: `${(Math.random() * 10000).toFixed(4)} GXQS`,
    gasUsed,
    gasPrice,
    status: statuses[randomBetween(0, 3)],
    timestamp: Date.now() - randomBetween(0, 60_000),
    type: types[randomBetween(0, 3)],
    fee: gasUsed * gasPrice,
  };
}

function generateMempoolTx(): MempoolTx {
  const priorities: MempoolTx['priority'][] = ['high', 'medium', 'low'];
  return {
    hash: randomHex(64),
    from: generateAddress(),
    to: generateAddress(),
    gasPrice: randomBetween(1, 100),
    gasLimit: randomBetween(21_000, 300_000),
    value: `${(Math.random() * 1000).toFixed(4)} GXQS`,
    timestamp: Date.now() - randomBetween(0, 30_000),
    priority: priorities[randomBetween(0, 2)],
    size: randomBetween(200, 2000),
  };
}

function generateValidator(index: number): Validator {
  const statuses: Validator['status'][] = ['active', 'active', 'active', 'inactive', 'jailed'];
  return {
    address: generateAddress(),
    name: VALIDATOR_NAMES[index % VALIDATOR_NAMES.length],
    stake: randomBetween(500_000, 5_000_000),
    delegators: randomBetween(50, 2000),
    uptime: randomBetween(95, 100) + Math.random(),
    blocksProposed: randomBetween(10_000, 200_000),
    commission: randomBetween(1, 15) + Math.random(),
    status: statuses[randomBetween(0, 4)],
    apy: randomBetween(8, 25) + Math.random(),
  };
}

// Initialize block history
for (let i = 49; i >= 0; i--) {
  blocks.push(generateBlock(currentHeight - i));
}

export async function getLatestBlocks(count = 20): Promise<Block[]> {
  // Simulate new block if enough time has passed
  if (Date.now() - lastBlockTime > 2000) {
    currentHeight++;
    lastBlockTime = Date.now();
    const newBlock = generateBlock(currentHeight);
    blocks.push(newBlock);
    if (blocks.length > 200) blocks.shift();
  }
  return blocks.slice(-count).reverse();
}

export async function getBlockByHeight(height: number): Promise<Block | null> {
  const found = blocks.find(b => b.height === height);
  if (found) return found;
  if (height <= currentHeight) return generateBlock(height);
  return null;
}

export async function getTransaction(hash: string): Promise<Transaction | null> {
  if (!hash) return null;
  return generateTransaction();
}

export async function getRecentTransactions(count = 20): Promise<Transaction[]> {
  return Array.from({ length: count }, () => generateTransaction());
}

export async function getMempool(): Promise<MempoolTx[]> {
  const size = randomBetween(80, 300);
  return Array.from({ length: size }, () => generateMempoolTx());
}

export async function getValidators(): Promise<Validator[]> {
  return Array.from({ length: 20 }, (_, i) => generateValidator(i));
}

export async function getChainStats(): Promise<ChainStats> {
  const tps = randomBetween(1000, 5000);
  return {
    blockHeight: currentHeight,
    tps,
    avgBlockTime: 2.1 + Math.random() * 0.4,
    totalTx: 892_341_234 + randomBetween(0, 1000),
    activeValidators: randomBetween(18, 20),
    totalStake: 98_234_567 + randomBetween(0, 10000),
    marketCap: 4_234_567_890,
    price: 4.23 + (Math.random() - 0.5) * 0.1,
    mempoolSize: randomBetween(80, 300),
    finality: 2.1 + Math.random() * 0.2,
  };
}

export async function deployContract(
  abi: unknown[],
  bytecode: string
): Promise<{ hash: string; contractAddress: string; blockHeight: number }> {
  await new Promise(r => setTimeout(r, 1500));
  return {
    hash: randomHex(64),
    contractAddress: generateAddress(),
    blockHeight: currentHeight,
  };
}

export async function getHealthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastBlock: number;
}> {
  return {
    status: 'healthy',
    latency: randomBetween(10, 50),
    lastBlock: currentHeight,
  };
}

export { currentHeight };
