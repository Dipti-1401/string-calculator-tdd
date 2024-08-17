# String Calculator TDD Assessment

This project implements a `StringCalculator` using Test-Driven Development (TDD) in Angular 18. The calculator processes a string of numbers separated by delimiters and returns their sum.

## Functional Requirements

1. **Sum Calculation**:
   - **Input**: A string of comma-separated numbers.
   - **Output**: Sum of the numbers.
   - **Examples**:
     - `""` → `0`
     - `"1"` → `1`
     - `"1,5"` → `6`

2. **Multiple Inputs**: Handle any number of inputs.

3. **Newline Delimiters**: Treat newlines as valid delimiters.
   - `"1\n2,3"` → `6`

4. **Custom Delimiters**: Support custom delimiters.
   - `"//;\n1;2"` → `3`

5. **Negative Numbers**: Throw an exception for negative numbers.
   - `"1,-2,3"` → "Negatives not allowed: -2"

## Development Approach

1. **Setup**: 
   - Initialize Angular project.
   - Create `CalculatorService`.
   - Commit: "Initial commit - Angular project setup"

2. **TDD Process**:
   - Implement and test each feature step-by-step:
     - Empty string returns `0`.
     - Single number returns that number.
     - Sum multiple numbers.
     - Support for newlines and custom delimiters.
     - Handle negative numbers.

## Running the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dipti-1401/string-calculator-tdd.git
   cd string-calculator-tdd
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```
   - Visit `http://localhost:4200/`.

4. **Run Tests**:
   ```bash
   ng test
   ```

## Project Structure

- `calculator.service.ts`: Core logic.
- `app.component.ts`: Handles user interaction.
- `app.component.html`: User interface.
- `app.component.css`: Styling.

## Contact

For any questions or suggestions, please reach out to [deeptigupta522@gmail.com](mailto:deeptigupta522@gmail.com).
