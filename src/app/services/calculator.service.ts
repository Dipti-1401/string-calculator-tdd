import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private static readonly DEFAULT_DELIMITERS = /[\n,]/;

  constructor() {}

  add(input: string): number {
    if (this.isEmpty(input)) return 0;
    const { delimiters, numbers } = this.parseInput(input);
    const numberList = this.splitStringIntoNumbers(numbers, delimiters);
  
    let filteredNumbers: number[];
  
    if (input.startsWith('//') && delimiters.toString().includes('odd')) {
      filteredNumbers = numberList.filter(num => num % 2 === 0); 
    } else {
      filteredNumbers = numberList;
    }
  
    console.log('Filtered Numbers:', filteredNumbers);
  
    this.validateNoNegativeNumbers(filteredNumbers);
  
    return this.calculateSum(filteredNumbers);
  }
  

  private isEmpty(input: string): boolean {
    return !input || input.trim().length === 0;
  }

  private parseInput(input: string): { delimiters: RegExp; numbers: string } {
    if (input.startsWith('//')) {
      const delimiterEnd = input.indexOf('\n');
      const delimiterSection = input.substring(2, delimiterEnd).trim();
      if (delimiterSection.startsWith('[') && !delimiterSection.endsWith(']')) {
        throw new Error(`Invalid delimiter section: ${delimiterSection}`);
      }

      const delimiters =
        delimiterSection === ''
          ? CalculatorService.DEFAULT_DELIMITERS
          : delimiterSection.startsWith('[')
          ? this.parseCustomDelimiters(delimiterSection)
          : new RegExp(this.escapeRegExp(delimiterSection));

      return { delimiters, numbers: input.substring(delimiterEnd + 1) };
    }

    return { delimiters: CalculatorService.DEFAULT_DELIMITERS, numbers: input };
  }

  private parseCustomDelimiters(delimiterSection: string): RegExp {
    const delimiterList = delimiterSection.slice(1, -1).split('][');
    return new RegExp(delimiterList.map(this.escapeRegExp).join('|'));
  }

  private splitStringIntoNumbers(
    numbers: string,
    delimiters: RegExp
  ): number[] {
    return numbers
      .split(delimiters)
      .map((num) => num.trim())
      .filter((num) => num !== '')
      .map((num) => {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) {
          throw new Error(`Invalid input: ${num}`);
        }
        return parsedNum;
      });
  }

  private validateNoNegativeNumbers(numbers: number[]): void {
    const negatives = numbers.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  }

  private calculateSum(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  private escapeRegExp(delimiter: string): string {
    return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
