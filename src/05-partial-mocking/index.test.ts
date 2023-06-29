import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 1,
    mockTwo: () => 2,
    mockThree: () => 3,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log');

    expect(mockOne()).toBe(1);
    expect(mockTwo()).toBe(2);
    expect(mockThree()).toBe(3);

    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    jest.spyOn(console, 'log');

    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
  });
});
