import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  describe('Basic Operations', () => {
    it('should return 0 for an empty string', () => {
      expect(service.add('')).toBe(0);
    });

    it('should return the number itself if only one number is provided', () => {
      expect(service.add('1')).toBe(1);
    });

    it('should return the sum of two comma-separated numbers', () => {
      expect(service.add('1,2')).toBe(3);
    });

    it('should handle multiple numbers', () => {
      expect(service.add('1,2,3,4')).toBe(10);
    });

    it('should handle newlines between numbers as well as commas', () => {
      expect(service.add('1\n2,3')).toBe(6);
    });
  });

  describe('Delimiter Handling', () => {
    it('should support different delimiters defined in the input', () => {
      expect(service.add('//;\n1;2')).toBe(3);
    });

    it('should support multiple custom delimiters', () => {
      expect(service.add('//[***][%%%]\n1***2%%%3')).toBe(6);
    });

    it('should handle input with only delimiters', () => {
      expect(service.add('//;\n;;;')).toBe(0);
    });

    it('should handle invalid or malformed delimiter definitions', () => {
      expect(() => service.add('//[;\n1;2')).toThrow(
        new Error('Invalid delimiter section: [;')
      );
    });

    it('should handle input with leading and trailing delimiters', () => {
      expect(service.add(',1,2,,')).toBe(3);
      expect(service.add('1,2,\n')).toBe(3);
    });

    it('should handle empty delimiter section gracefully', () => {
      expect(service.add('//\n1,2,3')).toBe(6);
    });

    it('should handle large input strings efficiently', () => {
      const largeInput = new Array(1000).fill('1').join(',');
      expect(service.add(largeInput)).toBe(1000);
    });

    it('should sum only even numbers if delimiter contains "odd"', () => {
      expect(service.add('//odd\n1odd2***3')).toBe(2);
    });
  });

  describe('Error Handling', () => {
    it('should throw an error for negative numbers', () => {
      expect(() => service.add('1,-2,3')).toThrow(
        new Error('Negatives not allowed: -2')
      );
    });

    it('should throw an error listing all negative numbers', () => {
      expect(() => service.add('1,-2,-3')).toThrow(
        new Error('Negatives not allowed: -2, -3')
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle mixed delimiters without custom specification', () => {
      expect(service.add('1,\n2,3')).toBe(6);
    });

    it('should handle very large numbers', () => {
      expect(service.add('1,1000,1000000')).toBe(1001001);
    });

    it('should handle non-numeric characters gracefully', () => {
      expect(() => service.add('1,a,3')).toThrow(new Error('Invalid input: a'));
    });
  });
});
