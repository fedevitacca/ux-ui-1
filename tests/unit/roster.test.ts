import { describe, it, expect } from 'vitest';
// AJUSTAR: el nombre y la ruta del import a lo que tengas en tu codigo.
// Si la funcion de filtro vive en bucks.ts con otro nombre, cambialo aca.
import { filterRoster } from '../../src/data/bucks';

const roster = [
  { id: 1, name: 'Giannis Antetokounmpo', position: 'PF' },
  { id: 2, name: 'Damian Lillard', position: 'PG' },
  { id: 3, name: 'Brook Lopez', position: 'C' },
  { id: 4, name: 'Bobby Portis', position: 'PF' },
];

describe('filterRoster', () => {
  it('filtra por nombre sin distinguir mayusculas', () => {
    const result = filterRoster(roster, { name: 'giannis', position: '' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Giannis Antetokounmpo');
  });

  it('filtra por posicion y devuelve todos los que coinciden', () => {
    const result = filterRoster(roster, { name: '', position: 'PF' });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.name)).toContain('Bobby Portis');
  });

  it('devuelve el plantel completo cuando no hay filtros', () => {
    const result = filterRoster(roster, { name: '', position: '' });
    expect(result).toHaveLength(roster.length);
  });
});
