import { getChainLength, isFinishChain, getMinimalChain } from './routing-problems';

describe('Routing functions', () => {
  const points = [0, 1, 2, -1, -2];

  describe('#isFinishChain', () => {
    it('should work', () => {
      const result = isFinishChain(points, [0, 1, 2, -1, -2, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, -2, -2, -1, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, -2, -2, -1, 1, 2, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, -1, 1, -2, 2, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
  });

  describe('#getChainLength', () => {
    it('should work', () => {
      const result = getChainLength([0, 1, -1, 0]);
      expect(result).toEqual(5);
    });

    it('should work', () => {
      const result = getChainLength([0, 1, 0, -1]);
      expect(result).toEqual(5);
    });
  });

  describe('#getMinimalChain', () => {


    it('should work with 2 points', () => {
      const result = getMinimalChain([0, 1, -1, 0]);
      expect(result).toEqual({ chain: [0, 1, -1, 1, 0], length: 4 });
    });
  });
});