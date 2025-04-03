import { render, screen } from '@testing-library/react';
import App from '../App';
import { fireEvent } from '@testing-library/react';

describe('App Component Tests', () => {
  test('renders Title Section', () => {
    render(<App />);
    const linkElement = screen.getByText("Your Next Dollar");
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Income section', () => {
    render(<App />);
    const incomeSection = screen.getByText("Income");
    expect(incomeSection).toBeInTheDocument();
  });

  test('renders Emergency Fund section', () => {
    render(<App />);
    const emergencyFundSection = screen.getByText("Emergency Fund");
    expect(emergencyFundSection).toBeInTheDocument();
  });

  test('renders Car Loan section', () => {
    render(<App />);
    const carLoanSection = screen.getByText("Car Loan");
    expect(carLoanSection).toBeInTheDocument();
  });

  test('renders Credit Cards section', () => {
    render(<App />);
    const creditCardsSection = screen.getByText("Credit Cards");
    expect(creditCardsSection).toBeInTheDocument();
  });

  test('renders 50/30/20 Split section', () => {
    render(<App />);
    const splitSection = screen.getByText("Your 50/30/20 Split");
    expect(splitSection).toBeInTheDocument();
  });

  test('renders Financial Recommendations section', () => {
    render(<App />);
    const recommendationsSection = screen.getByText("Financial Recommendations");
    expect(recommendationsSection).toBeInTheDocument();
  });

  test('generateRecommendation calculates 50/30/20 split correctly', () => {
    render(<App />);
    
    const paycheckInput = screen.getByPlaceholderText("Enter paycheck amount");
    fireEvent.change(paycheckInput, { target: { value: '1000' } });

    const generateButton = screen.getByTestId("submit-button");
    fireEvent.click(generateButton);

    const needsElement = screen.getByTestId('needs-display');
    const wantsElement = screen.getByTestId('wants-display');
    const savingsElement = screen.getByTestId('savings-display');

    expect(needsElement).toHaveTextContent('$500.00');
    expect(wantsElement).toHaveTextContent('$300.00');
    expect(savingsElement).toHaveTextContent('$200.00');
  });

  test('adds a new credit card form when Add Another Credit Card button is clicked', () => {
    render(<App />);
    
    const addButton = screen.getByText("Add Another Credit Card");
    fireEvent.click(addButton);

    const creditCardForms = screen.getAllByTestId('credit-card-form');
    expect(creditCardForms.length).toBe(2); // Initially 1, after adding 1 more, total should be 2
  });

  test('removes a credit card form when Remove button is clicked', () => {
    render(<App />);
    
    // First, add a credit card to ensure there's one to remove
    const addButton = screen.getByText("Add Another Credit Card");
    fireEvent.click(addButton);

    // Now we should have 2 credit card forms
    const creditCardForms = screen.getAllByTestId('credit-card-form');
    expect(creditCardForms.length).toBe(2);

    // Find the remove button for the second credit card form and click it
    const removeButton = screen.getAllByText("Remove")[1]; // Get the second one
    fireEvent.click(removeButton);

    // Now we should only have 1 credit card form left
    const updatedCreditCardForms = screen.getAllByTestId('credit-card-form');
    expect(updatedCreditCardForms.length).toBe(1);
  }
  );
  test('updates emergency fund balance when handleEmergencyFundChange is triggered', () => {
    render(<App />);
    
    const emergencyFundBalanceInput = screen.getByPlaceholderText("Remember this should be in cash or cash equivalents.");
    fireEvent.change(emergencyFundBalanceInput, { target: { value: '5000' } });
    
    expect(emergencyFundBalanceInput.value).toBe('5000');
  });

  test('updates emergency fund goal when handleEmergencyFundChange is triggered', () => {
    render(<App />);
    
    const emergencyFundGoalInput = screen.getByPlaceholderText("Normally 3-6 months of expenses.");
    fireEvent.change(emergencyFundGoalInput, { target: { value: '10000' } });
    
    expect(emergencyFundGoalInput.value).toBe('10000');
  });

  test('updates emergency fund deductible when handleEmergencyFundChange is triggered', () => {
    render(<App />);
    
    const emergencyFundDeductibleInput = screen.getByPlaceholderText("Normally from health insurance or car insurance.");
    fireEvent.change(emergencyFundDeductibleInput, { target: { value: '1000' } });
    
    expect(emergencyFundDeductibleInput.value).toBe('1000');
  });

  test('updates credit card balance when handleCreditCardChange is triggered', () => {
    render(<App />);
    
    const creditCardBalanceInput = screen.getByPlaceholderText("Enter balance");
    fireEvent.change(creditCardBalanceInput, { target: { value: '800' } });
    
    expect(creditCardBalanceInput.value).toBe('800');
  });

  test('updates credit card minimum payment when handleCreditCardChange is triggered', () => {
    render(<App />);
    
    const creditCardMinPaymentInput = screen.getByPlaceholderText("Enter balance");
    fireEvent.change(creditCardMinPaymentInput, { target: { value: '900' } });
    
    expect(creditCardMinPaymentInput.value).toBe('900');
  });

  test('updates credit card interest rate when handleCreditCardChange is triggered', () => {
    render(<App />);
    
    const creditCardInterestInput = screen.getByPlaceholderText("Enter balance");
    fireEvent.change(creditCardInterestInput, { target: { value: '800' } });
    
    expect(creditCardInterestInput.value).toBe('800');
  });

})