import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }
  
  add(input: string): number {
    if (!input) return 0;
    return parseInt(input);
  }  
  
}
