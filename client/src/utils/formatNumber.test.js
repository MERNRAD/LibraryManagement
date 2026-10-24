import {
  fNumber,
  fCurrency,
  fPercent,
  fShortenNumber
} from './formatNumber';

describe('Pruebas unitarias de formato de numeros', () => {
  test('TF-01: convierte un numero a formato legible', () => {
    expect(fNumber(1000)).toBe('1,000');
  });

  test('TF-02: convierte un numero a formato de moneda', () => {
    expect(fCurrency(100)).toBe('$100');
  });

  test('TF-03: convierte un valor a porcentaje', () => {
    expect(fPercent(50)).toBe('50%');
  });

  test('TF-04: abrevia un numero grande', () => {
    expect(fShortenNumber(2000)).toBe('2k');
  });
});
