import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './services/calculator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AppComponent {
  title = 'string-calculator-tdd';
  input = '';
  result: number | null = null;
  error: string | null = null;
  isLoading = false;

  constructor(private calculatorService: CalculatorService) {}

  calculate(): void {
    if (this.isInputInvalid()) {
      this.error = 'Please enter a valid string of numbers.';
      this.result = null;
      return;
    }

    this.isLoading = true;

    try {
      this.error = null;
      this.result = this.calculatorService.add(this.input);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private isInputInvalid(): boolean {
    return this.input.trim() === '';
  }

  private handleError(error: any): void {
    this.result = null;
    this.error = error.message || 'An unexpected error occurred';
  }

  reset(): void {
    this.input = '';
    this.result = null;
    this.error = null;
  }
}
