import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;  // Ensure 'service' is declared here

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);  // Initialize 'service' here
  });

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

  it('should support different delimiters defined in the input', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });
  
  
});
