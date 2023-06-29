import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1];
    const linkedList = generateLinkedList(values);

    expect(linkedList).toStrictEqual({
      next: {
        next: null,
        value: null,
      },
      value: 1,
    });
  });

  test('should generate linked list from values 2', () => {
    const values = [1, 2];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
