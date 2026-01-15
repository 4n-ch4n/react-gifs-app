import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGifs } from './useGifs';
import * as gifActions from '../actions/get-gifs-by-query.action';

describe('useGifs', () => {
  test('should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleTermClick).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  });

  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('Viper');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClick('Goku');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClick('Goku');
    });

    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('This is a custom error')
    );

    await act(async () => {
      await result.current.handleTermClick('Goku');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return no more than 8 previous terms', async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch('God of war');
    });
    await act(async () => {
      await result.current.handleSearch('Dante');
    });
    await act(async () => {
      await result.current.handleSearch('Ezio');
    });
    await act(async () => {
      await result.current.handleSearch('Sly');
    });
    await act(async () => {
      await result.current.handleSearch('Snake');
    });
    await act(async () => {
      await result.current.handleSearch('Messi');
    });
    await act(async () => {
      await result.current.handleSearch('Kirito');
    });
    await act(async () => {
      await result.current.handleSearch('Kratos');
    });
    await act(async () => {
      await result.current.handleSearch('Atreus');
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      'atreus',
      'kratos',
      'kirito',
      'messi',
      'snake',
      'sly',
      'ezio',
      'dante',
    ]);
  });
});
