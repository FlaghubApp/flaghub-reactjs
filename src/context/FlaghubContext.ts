import { createContext, useContext } from 'react';
import { Feature } from '../types';

export interface FlaghubContextProps {
  flags: Feature[];
}

export const FlaghubContext = createContext<FlaghubContextProps | null>(null);

export const useFlaghubContext = () => useContext(FlaghubContext) as FlaghubContextProps;
