export interface Feature {
  id: string;
  name: string;
  isActive: boolean;
  reference: string;
}

declare global {
  interface Window {
    flaghub: any;
  }
}
