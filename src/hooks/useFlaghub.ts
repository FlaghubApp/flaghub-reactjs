import { useCallback } from 'react';
import { useFlaghubContext } from '../context/FlaghubContext';

export const useFlaghub = () => {
  const { flags } = useFlaghubContext();

  const isFeatureActive = useCallback(
    (reference: string) => flags.find((f) => f.reference === reference)?.isActive,
    [flags],
  );

  return {
    isFeatureActive,
  };
};
