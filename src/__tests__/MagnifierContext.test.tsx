import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { MagnifierProvider, useMagnifierContext, themes } from '../MagnifierContext';

describe('MagnifierContext', () => {
  describe('useMagnifierContext without provider', () => {
    it('should return default values when used outside provider', () => {
      const { result } = renderHook(() => useMagnifierContext());

      expect(result.current.activeMagnifierId).toBeNull();
      expect(result.current.globalSettings.theme).toBe('classic');
      expect(result.current.globalSettings.performanceMode).toBe(false);
      expect(result.current.globalSettings.smoothAnimations).toBe(true);
      expect(result.current.globalSettings.touchEnabled).toBe(true);
    });

    it('should return classic theme by default', () => {
      const { result } = renderHook(() => useMagnifierContext());
      const theme = result.current.getTheme();

      expect(theme).toEqual(themes.classic);
    });

    it('should return requested theme', () => {
      const { result } = renderHook(() => useMagnifierContext());
      const theme = result.current.getTheme('modern');

      expect(theme).toEqual(themes.modern);
    });

    it('setActiveMagnifierId should be a no-op', () => {
      const { result } = renderHook(() => useMagnifierContext());

      act(() => {
        result.current.setActiveMagnifierId('test-id');
      });

      expect(result.current.activeMagnifierId).toBeNull();
    });

    it('updateGlobalSettings should be a no-op', () => {
      const { result } = renderHook(() => useMagnifierContext());

      act(() => {
        result.current.updateGlobalSettings({ performanceMode: true });
      });

      expect(result.current.globalSettings.performanceMode).toBe(false);
    });
  });

  describe('useMagnifierContext with provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MagnifierProvider>{children}</MagnifierProvider>
    );

    it('should provide context values', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });

      expect(result.current.activeMagnifierId).toBeNull();
      expect(result.current.globalSettings).toBeDefined();
      expect(result.current.getTheme).toBeDefined();
    });

    it('should update activeMagnifierId', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });

      act(() => {
        result.current.setActiveMagnifierId('test-magnifier');
      });

      expect(result.current.activeMagnifierId).toBe('test-magnifier');
    });

    it('should clear activeMagnifierId when set to null', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });

      act(() => {
        result.current.setActiveMagnifierId('test-magnifier');
      });
      expect(result.current.activeMagnifierId).toBe('test-magnifier');

      act(() => {
        result.current.setActiveMagnifierId(null);
      });
      expect(result.current.activeMagnifierId).toBeNull();
    });

    it('should update global settings', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });

      act(() => {
        result.current.updateGlobalSettings({ performanceMode: true });
      });

      expect(result.current.globalSettings.performanceMode).toBe(true);
    });

    it('should partially update global settings', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });

      act(() => {
        result.current.updateGlobalSettings({ performanceMode: true });
      });

      expect(result.current.globalSettings.performanceMode).toBe(true);
      expect(result.current.globalSettings.smoothAnimations).toBe(true); // Unchanged
    });
  });

  describe('MagnifierProvider props', () => {
    it('should accept defaultTheme prop', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MagnifierProvider defaultTheme="modern">{children}</MagnifierProvider>
      );

      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      expect(result.current.globalSettings.theme).toBe('modern');
    });

    it('should accept performanceMode prop', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MagnifierProvider performanceMode={true}>{children}</MagnifierProvider>
      );

      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      expect(result.current.globalSettings.performanceMode).toBe(true);
    });

    it('should accept smoothAnimations prop', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MagnifierProvider smoothAnimations={false}>{children}</MagnifierProvider>
      );

      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      expect(result.current.globalSettings.smoothAnimations).toBe(false);
    });

    it('should accept touchEnabled prop', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MagnifierProvider touchEnabled={false}>{children}</MagnifierProvider>
      );

      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      expect(result.current.globalSettings.touchEnabled).toBe(false);
    });
  });

  describe('getTheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MagnifierProvider defaultTheme="dark">{children}</MagnifierProvider>
    );

    it('should return the theme from globalSettings when no theme specified', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      const theme = result.current.getTheme();

      expect(theme).toEqual(themes.dark);
    });

    it('should return specified theme', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      const theme = result.current.getTheme('neon');

      expect(theme).toEqual(themes.neon);
    });

    it('should fallback to classic theme for unknown theme name', () => {
      const { result } = renderHook(() => useMagnifierContext(), { wrapper });
      const theme = result.current.getTheme('unknown-theme');

      expect(theme).toEqual(themes.classic);
    });
  });

  describe('themes object', () => {
    it('should have classic theme', () => {
      expect(themes.classic).toBeDefined();
      expect(themes.classic.borderColor).toBeDefined();
      expect(themes.classic.borderWidth).toBeDefined();
    });

    it('should have modern theme', () => {
      expect(themes.modern).toBeDefined();
    });

    it('should have dark theme', () => {
      expect(themes.dark).toBeDefined();
    });

    it('should have neon theme', () => {
      expect(themes.neon).toBeDefined();
    });

    it('all themes should have required properties', () => {
      const requiredProps = [
        'borderColor',
        'borderWidth',
        'shadowColor',
        'handleColor',
        'gripColor',
        'backdropBlur',
      ];

      Object.values(themes).forEach((theme) => {
        requiredProps.forEach((prop) => {
          expect(theme).toHaveProperty(prop);
        });
      });
    });
  });
});
