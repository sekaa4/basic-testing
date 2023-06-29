import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import promises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 4000;
    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
    expect(setTimeout).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const timeout = 4000;
    expect(callback).not.toHaveBeenCalled();
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    jest.runOnlyPendingTimers();

    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const count = 5;
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );

    jest.advanceTimersByTime(interval * count);

    expect(callback).toHaveBeenCalledTimes(count);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const pathToFile = '/path/to/file1.js';

  const mockFs = jest.mocked(fs);
  const mockPromises = jest.mocked(promises);

  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledTimes(1);

    const callJoinArgs = mockJoin.mock.calls[0];

    expect(path.join).toHaveBeenCalledWith(...callJoinArgs);
    expect(callJoinArgs?.[1]).toEqual(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const fileSummary = await readFileAsynchronously(pathToFile);
    expect(mockFs.existsSync).toHaveBeenCalledTimes(1);
    expect(fileSummary).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'test content';

    mockFs.existsSync.mockImplementation(() => true);
    mockPromises.readFile.mockImplementation(async () => Buffer.from(content));

    const fileSummary = await readFileAsynchronously(pathToFile);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(mockPromises.readFile).toHaveBeenCalledTimes(1);
    expect(fileSummary).toEqual(content);
  });
});
