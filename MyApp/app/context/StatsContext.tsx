import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Stat {
  label: string;
  value: number;
  color: string;
}

interface StatsState {
  stats: Stat[];
}

interface StatsAction {
  type: 'INCREMENT_STAT';
  payload: string; // Label of the stat to increment
}

interface StatsContextType {
  stats: Stat[];
  incrementStat: (label: string) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const initialState: StatsState = {
  stats: [
    { label: 'Captions Generated', value: 0, color: '#FF6B6B' },
    { label: 'Hashtags Created', value: 0, color: '#4ECDC4' },
    { label: 'Content Plans', value: 0, color: '#45B7D1' },
  ],
};

const statsReducer = (state: StatsState, action: StatsAction): StatsState => {
  switch (action.type) {
    case 'INCREMENT_STAT':
      return {
        ...state,
        stats: state.stats.map((stat) =>
          stat.label === action.payload ? { ...stat, value: stat.value + 1 } : stat
        ),
      };
    default:
      return state;
  }
};

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(statsReducer, initialState);

  const incrementStat = (label: string) => {
    dispatch({ type: 'INCREMENT_STAT', payload: label });
  };

  return (
    <StatsContext.Provider value={{ stats: state.stats, incrementStat}}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};