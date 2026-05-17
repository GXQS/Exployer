export type DataSource = 'core' | 'derived' | 'unavailable';

export type AvailabilityMap = Partial<Record<string, DataSource>>;

export interface Block {
  height: number;
  hash: string | null;
  parentHash: string | null;
  timestamp: number;
  txCount: number;
  size: number | null;
  gasUsed: number | null;
  gasLimit: number | null;
  proposer: string | null;
  finalized: boolean;
  tps: number | null;
  availability?: AvailabilityMap;
}

export type TransactionStatus = 'success' | 'failed' | 'pending' | 'unknown';
export type TransactionType = 'transfer' | 'contract' | 'deploy' | 'stake' | 'unknown';

export interface Transaction {
  hash: string;
  blockHeight: number | null;
  from: string | null;
  to: string | null;
  value: string;
  rawValue: string;
  gasUsed: number | null;
  gasPrice: number | null;
  status: TransactionStatus;
  timestamp: number;
  type: TransactionType;
  data?: string;
  fee: number | null;
  availability?: AvailabilityMap;
}

export type MempoolPriority = 'high' | 'medium' | 'low';

export interface MempoolTx {
  hash: string;
  from: string | null;
  to: string | null;
  gasPrice: number | null;
  gasLimit: number | null;
  value: string;
  timestamp: number;
  priority: MempoolPriority;
  size: number | null;
  availability?: AvailabilityMap;
}

export type ValidatorStatus = 'active' | 'inactive' | 'jailed' | 'unknown';

export interface Validator {
  address: string;
  name: string | null;
  stake: number;
  votingPower: number;
  delegators: number | null;
  uptime: number | null;
  blocksProposed: number | null;
  commission: number | null;
  status: ValidatorStatus;
  apy: number | null;
  availability?: AvailabilityMap;
}

export interface ChainStats {
  blockHeight: number;
  tps: number | null;
  avgBlockTime: number | null;
  totalTx: number;
  activeValidators: number;
  totalStake: number;
  marketCap: number | null;
  price: number | null;
  mempoolSize: number | null;
  finality: number | null;
  availability?: AvailabilityMap;
}

export interface ChainEvent {
  eventType: string;
  height: number;
  payload: string;
  timestamp: number;
  eventHash: string | null;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  lastBlock: number;
  details?: {
    endpoint: string;
    error?: string;
    latestTimestamp?: number;
  };
}
