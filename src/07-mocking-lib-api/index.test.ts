import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockAxios = jest.mocked(axios);

describe('throttledGetDataFromApi', () => {
  const relativePath = 'http://localhost:3000';
  const config = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };
  const mockResponse = {
    data: {
      id: 1,
      name: 'John Doe',
    },
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockAxios.create.mockReturnThis();

    mockAxios.get.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockAxios.create).toHaveBeenCalledTimes(1);
    expect(mockAxios.create).toHaveBeenCalledWith(config);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockAxios.create).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);
  });
});
