import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: '**', expected: null },
  { a: 2, b: 2, action: '=', expected: null },
  { a: 3, b: 2, action: '^*', expected: null },
  { a: '1', b: '2', action: Action.Exponentiate, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 3, b: true, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Result for variables: a: $a, b: $b, action: $action, expected: $expected',
    ({ a, b, action, expected }) => {
      const calculatorInput = { a, b, action };
      if (typeof expected === 'number') {
        expect(simpleCalculator(calculatorInput)).toBeCloseTo(expected);
      } else {
        expect(simpleCalculator(calculatorInput)).toBeNull();
      }
    },
  );
});
