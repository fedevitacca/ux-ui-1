import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// AJUSTAR: nombre/ruta del import segun tu codigo real.
// loadRoster deberia usar la API si hay key y devolver el fallback si no.
import { loadRoster } from '../../src/data/bucks';

describe('loadRoster - estrategia API / fallback', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('usa el fallback local cuando no hay API key', async () => {
    vi.stubEnv('BALLDONTLIE_API_KEY', '');
    const data = await loadRoster();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('cae al fallback si la API falla', async () => {
    vi.stubEnv('BALLDONTLIE_API_KEY', 'fake-key');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    const data = await loadRoster();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
