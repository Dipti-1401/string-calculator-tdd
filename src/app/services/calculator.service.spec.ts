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
  

  
});
