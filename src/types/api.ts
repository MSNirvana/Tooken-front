export interface APIKey {
  id: string;
  name: string;
  keyPreview: string;
  monthlyLimit: number | null;
  monthlyUsed: number;
  status: "active" | "disabled";
}
