import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }
  
  add(input: string): number {
    if (!input) return 0;
    const numbers = input.split(',').map(num => parseInt(num));
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
  
}
