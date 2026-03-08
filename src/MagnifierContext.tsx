'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface MagnifierTheme {
  borderColor: string;
  borderWidth: number;
  shadowColor: string;
  handleColor: string;
  gripColor: string;
  backdropBlur: boolean;
}

export const themes: Record<string, MagnifierTheme> = {
  classic: {
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 3,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    handleColor: 'rgba(139, 69, 19, 0.9)',
    gripColor: 'rgba(160, 82, 45, 0.9)',
    backdropBlur: true,
  },
  modern: {
    borderColor: 'rgba(59, 130, 246, 0.8)',
    borderWidth: 2,
    shadowColor: 'rgba(59, 130, 246, 0.2)',
    handleColor: 'rgba(59, 130, 246, 0.9)',
    gripColor: 'rgba(37, 99, 235, 0.9)',
    backdropBlur: true,
  },
  dark: {
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 2,
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    handleColor: 'rgba(75, 85, 99, 0.9)',
    gripColor: 'rgba(55, 65, 81, 0.9)',
    backdropBlur: false,
  },
  neon: {
    borderColor: 'rgba(236, 72, 153, 0.9)',
    borderWidth: 3,
    shadowColor: 'rgba(236, 72, 153, 0.4)',
    handleColor: 'rgba(236, 72, 153, 0.9)',
    gripColor: 'rgba(219, 39, 119, 0.9)',
    backdropBlur: true,
  },
};

interface MagnifierContextType {
  activeMagnifierId: string | null;
  setActiveMagnifierId: (id: string | null) => void;
  globalSettings: {
    theme: string;
    performanceMode: boolean;
    smoothAnimations: boolean;
    touchEnabled: boolean;
  };
  updateGlobalSettings: (settings: Partial<MagnifierContextType['globalSettings']>) => void;
  getTheme: (themeName?: string) => MagnifierTheme;
}

const MagnifierContext = createContext<MagnifierContextType | undefined>(undefined);

export const useMagnifierContext = () => {
  const context = useContext(MagnifierContext);
  if (!context) {
    // Return default values if no provider is used
    return {
      activeMagnifierId: null,
      setActiveMagnifierId: () => {},
      globalSettings: {
        theme: 'classic',
        performanceMode: false,
        smoothAnimations: true,
        touchEnabled: true,
      },
      updateGlobalSettings: () => {},
      getTheme: (themeName?: string) => themes[themeName || 'classic'] || themes.classic,
    };
  }
  return context;
};

interface MagnifierProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  performanceMode?: boolean;
  smoothAnimations?: boolean;
  touchEnabled?: boolean;
}

export const MagnifierProvider: React.FC<MagnifierProviderProps> = ({
  children,
  defaultTheme = 'classic',
  performanceMode = false,
  smoothAnimations = true,
  touchEnabled = true,
}) => {
  const [activeMagnifierId, setActiveMagnifierId] = useState<string | null>(null);
  const [globalSettings, setGlobalSettings] = useState({
    theme: defaultTheme,
    performanceMode,
    smoothAnimations,
    touchEnabled,
  });

  const updateGlobalSettings = useCallback((settings: Partial<typeof globalSettings>) => {
    setGlobalSettings(prev => ({ ...prev, ...settings }));
  }, []);

  const getTheme = useCallback((themeName?: string): MagnifierTheme => {
    const theme = themeName || globalSettings.theme;
    return themes[theme] || themes.classic;
  }, [globalSettings.theme]);

  return (
    <MagnifierContext.Provider
      value={{
        activeMagnifierId,
        setActiveMagnifierId,
        globalSettings,
        updateGlobalSettings,
        getTheme,
      }}
    >
      {children}
    </MagnifierContext.Provider>
  );
};