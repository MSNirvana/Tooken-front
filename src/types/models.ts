export interface ModelCard {
  id: string;
  name: string;
  provider: string;
  context: string;
  creditsPer1k: number;
  features?: string[];
}
