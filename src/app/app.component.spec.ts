import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'string-calculator-tdd' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('string-calculator-tdd');
  });

  it('should render the title in the DOM', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('String Calculator');
  });

  it('should display the loading spinner when the form is submitted', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoading = true;
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('.loading'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should display the result when calculation is complete', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.result = 10;
    fixture.detectChanges();

    const resultElement = fixture.debugElement.query(By.css('.result'));
    expect(resultElement.nativeElement.textContent).toContain('Result: 10');
  });

  it('should display an error message when an error occurs', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.error = 'Something went wrong';
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error'));
    expect(errorElement.nativeElement.textContent).toContain('Error: Something went wrong');
  });

  it('should reset the form when the Reset button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.result = 10;
    fixture.detectChanges();

    const resetButton = fixture.debugElement.query(By.css('.result button'));
    resetButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(app.input).toBe('');
    expect(app.result).toBeNull();
    expect(app.error).toBeNull();
  });
});
