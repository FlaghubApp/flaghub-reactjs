export interface FlaghubConfig {
  workspaceId: string;
  apiKey: string;
}

let apiKey: string | null = null;
let workspaceId: string | null = null;

export const initializeFlaghub = (config: FlaghubConfig) => {
  apiKey = config.apiKey;
  workspaceId = config.workspaceId;
};

export const getFlaghubConfig: () => FlaghubConfig = () => {
  if (!apiKey || !workspaceId) throw new Error('Missing Flaghub configuration');

  return {
    apiKey,
    workspaceId,
  };
};
