import { act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@components/ThemeSwitcher/ThemeContext';

describe('Theme Context', () => {
  test('should use dark default theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.isDarkTheme).toBe(true);
  });

  test('should switch theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.themeSwitchHandler();
    });

    expect(result.current.isDarkTheme).toBe(false);

    act(() => {
      result.current.themeSwitchHandler();
    });

    expect(result.current.isDarkTheme).toBe(true);
  });
});
