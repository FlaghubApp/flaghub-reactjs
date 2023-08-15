import { useFlaghub } from '../hooks/useFlaghub';

export const FlaghubFeature = ({ children, reference }: { children?: React.ReactNode; reference: string }) => {
  const { isFeatureActive } = useFlaghub();

  if (isFeatureActive(reference)) return children;

  return null;
};
