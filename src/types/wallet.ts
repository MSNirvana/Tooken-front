export interface AgentBudget {
  keyName: string;
  walletAddress: string;
  monthlyLimit: number;
  currentUsed: number;
  autoRefill: boolean;
  refillThreshold: number;
  refillAmount: number;
}
