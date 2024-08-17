import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  add(input: string): number {
    if (!input) return 0;

    let delimiters = /[\n,]/;
    if (input.startsWith('//')) {
      const delimiterEnd = input.indexOf('\n');
      delimiters = new RegExp(`[${input.substring(2, delimiterEnd)}]`);
      input = input.substring(delimiterEnd + 1);
    }

    const numbers = input.split(delimiters).map((num) => parseInt(num));
    const negatives = numbers.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
}
