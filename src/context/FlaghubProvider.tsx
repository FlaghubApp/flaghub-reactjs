import React, { useEffect, useState } from 'react';
import { Feature } from '../types';
import { getFlaghubConfig } from '../utils/initializer';
import { FlaghubContext } from './FlaghubContext';

export const FlaghubProvider = ({
  children,
  loading,
  apiVersion = 1,
  environment = 'default',
}: {
  children?: React.ReactNode;
  loading?: React.ReactNode;
  apiVersion?: number;
  environment?: string;
}) => {
  const [flags, setFlags] = useState<Feature[]>([]);
  const [hasFetchedFlags, setHasFetchedFlags] = useState<boolean>(false);

  const { apiKey, workspaceId } = getFlaghubConfig();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.flaghub = {
      setFeatureActive: (reference: string) =>
        setFlags(flags.map<Feature>((f) => (f.reference === reference ? { ...f, isActive: true } : f))),
    };

    return () => {
      try {
        delete window.flaghub;
      } catch (e) {
        window['flaghub'] = undefined;
      }
    };
  }, [flags]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          `https://api.flaghub.io/v${apiVersion}/workspaces/${workspaceId}/flags?env=${environment}`,
          {
            headers: new Headers({
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            }),
          },
        );

        const parsedResult: { flags: Feature[] } = await result.json();

        setFlags(parsedResult.flags);
      } finally {
        setHasFetchedFlags(true);
      }
    })();
  }, [apiKey, apiVersion, environment, workspaceId]);

  if (!hasFetchedFlags) return loading ?? <></>;

  return <FlaghubContext.Provider value={{ flags }}>{children}</FlaghubContext.Provider>;
};
