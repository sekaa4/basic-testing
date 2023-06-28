import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: Action.Add,
      }),
    ).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: Action.Subtract,
      }),
    ).toBe(-3);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: Action.Multiply,
      }),
    ).toBe(4);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: Action.Divide,
      }),
    ).toBeCloseTo(0.25);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: Action.Exponentiate,
      }),
    ).toBeCloseTo(1);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 4,
        action: '**',
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '1',
        b: '4',
        action: Action.Add,
      }),
    ).toBeNull();
  });
});
