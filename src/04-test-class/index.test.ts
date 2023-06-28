import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account).toHaveProperty('getBalance');
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => account.withdraw(105)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const secondAccount = getBankAccount(50);

    expect(() => account.transfer(105, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(105, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);

    expect(account.deposit(50).getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);

    expect(account.withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const secondAccount = getBankAccount(50);

    expect(account.transfer(60, secondAccount).getBalance()).toBe(40);
    expect(secondAccount.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const mockRandom = jest.spyOn(lodash, 'random').mockImplementation(() => 1);

    const number = await account.fetchBalance();

    expect(mockRandom).toHaveBeenCalledTimes(2);
    expect(number).toEqual(expect.any(Number));
    expect(number).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(200);
    const mockRandom = jest.spyOn(lodash, 'random').mockImplementation(() => 1);

    await account.synchronizeBalance();
    expect(mockRandom).toHaveBeenCalledTimes(2);

    const newBalance = account.getBalance();
    expect(newBalance).toEqual(expect.any(Number));

    expect(newBalance).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(200);
    const mockRandom = jest.spyOn(lodash, 'random').mockImplementation(() => 0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(mockRandom).toHaveBeenCalledTimes(2);
  });
});
