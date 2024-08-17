import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  add(input: string): number {
    if (this.isEmpty(input)) return 0;

    const { delimiters, numbers } = this.parseInput(input);
    const numberList = this.splitAndConvertToNumbers(numbers, delimiters);
    
    this.validateNoNegativeNumbers(numberList);

    return this.calculateSum(numberList);
  }

  private isEmpty(input: string): boolean {
    return !input || input.trim().length === 0;
  }

  private parseInput(input: string): { delimiters: RegExp, numbers: string } {
    let delimiters = /[\n,]/;

    if (input.startsWith('//')) {
      const delimiterEnd = input.indexOf('\n');
      let delimiterSection = input.substring(2, delimiterEnd);

      if (delimiterSection.startsWith('[') && delimiterSection.endsWith(']')) {
        delimiterSection = delimiterSection.slice(1, -1);
        const delimiterList = delimiterSection.split('][');
        delimiters = new RegExp(delimiterList.map(del => this.escapeRegExp(del)).join('|'));
      } else {
        delimiters = new RegExp(this.escapeRegExp(delimiterSection));
      }

      input = input.substring(delimiterEnd + 1);
    }

    return { delimiters, numbers: input };
  }

  private splitAndConvertToNumbers(numbers: string, delimiters: RegExp): number[] {
    return numbers
      .split(delimiters)
      .map(num => parseInt(num, 10))
      .filter(num => !isNaN(num));
  }

  private validateNoNegativeNumbers(numbers: number[]): void {
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  }

  private calculateSum(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
