import React, { useState } from 'react';
import './App.css';

function App() {
  // State for incoming money
  const [paycheck, setPaycheck] = useState('');
  const [grossPaycheck, setGrossPaycheck] = useState('');
  
  // State for credit cards
  const [creditCards, setCreditCards] = useState([
    { id: 1, balance: '', minimumPayment: '', interestRate: '' }
  ]);
  
  // State for car loan
  const [carLoan, setCarLoan] = useState({
    balance: '',
    monthlyPayment: '',
    interestRate: ''
  });

  // Handle paycheck input change
  const handlePaycheckChange = (e) => {
    setPaycheck(e.target.value);
  };

  const handleGrossPaycheckChange = (e) => {
    setGrossPaycheck(e.target.value);
  };

  // Handle credit card input changes
  const handleCreditCardChange = (id, field, value) => {
    setCreditCards(creditCards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  // Add a new credit card form
  const addCreditCard = () => {
    const newId = creditCards.length > 0 ? Math.max(...creditCards.map(card => card.id)) + 1 : 1;
    setCreditCards([...creditCards, { id: newId, balance: '', minimumPayment: '', interestRate: '' }]);
  };

  // Remove a credit card form
  const removeCreditCard = (id) => {
    setCreditCards(creditCards.filter(card => card.id !== id));
  };

  // Handle car loan input changes
  const handleCarLoanChange = (field, value) => {
    setCarLoan({ ...carLoan, [field]: value });
  };

  // Generate financial recommendation
  const generateRecommendation = () => {
    // Simple recommendation logic - to be expanded
    let availableMoney = parseFloat(paycheck);
    let recommendation = [];
    
    // Account for credit card minimum payments
    let totalMinPayments = 0;
    creditCards.forEach(card => {
      const minPayment = parseFloat(card.minimumPayment) || 0;
      totalMinPayments += minPayment;
      recommendation.push(`Pay minimum payment of $${minPayment.toFixed(2)} for credit card with balance $${parseFloat(card.balance).toFixed(2)}`);
    });
    
    // Account for car loan
    const carPayment = parseFloat(carLoan.monthlyPayment) || 0;
    if (carPayment > 0) {
      recommendation.push(`Pay car loan monthly payment of $${carPayment.toFixed(2)}`);
    }
    
    availableMoney -= (totalMinPayments + carPayment);
    
    // Recommend paying highest interest rate debt first
    if (availableMoney > 0) {
      let highestRateCard = { interestRate: -1 };
      creditCards.forEach(card => {
        if (parseFloat(card.interestRate) > parseFloat(highestRateCard.interestRate)) {
          highestRateCard = card;
        }
      });
      
      if (highestRateCard.interestRate > 0) {
        recommendation.push(`Use remaining $${availableMoney.toFixed(2)} to pay down credit card with highest interest rate (${highestRateCard.interestRate}%)`);
      } else {
        recommendation.push(`You have $${availableMoney.toFixed(2)} remaining for savings or other financial goals`);
      }
    } else if (availableMoney < 0) {
      recommendation.push(`Warning: Your expenses exceed your paycheck by $${Math.abs(availableMoney).toFixed(2)}`);
    }
    
    return recommendation;
  };

  // // Format currency input
  // const formatCurrency = (value) => {
  //   return value ? parseFloat(value).toFixed(2) : '';
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Next Dollar</h1>
        <p>Obey the FOO! (Financial Order of Operations)</p>
        <p>Discover the most efficient place for every soldier in your army of dollars!</p>
      </header>
      
      <main className="App-main">
        <section className="income-section">
          <h2>Income</h2>
          <div className="form-group">
            <label htmlFor="paycheck">Net Paycheck Amount ($):</label>
            <input
              type="number"
              id="paycheck"
              value={paycheck}
              onChange={handlePaycheckChange}
              placeholder="Enter paycheck amount"
            />
            <label htmlFor="grossPaycheck">Gross Paycheck Amount ($):</label>
            <input
              type="number"
              id="grossPaycheck"
              value={grossPaycheck}
              onChange={handleGrossPaycheckChange}
              placeholder="Enter paycheck amount"
            />
          </div>
        </section>
        
        <section className="car-loan-section">
          <h2>Car Loan</h2>
          <div className="form-group">
            <label>Loan Balance ($):</label>
            <input
              type="number"
              value={carLoan.balance}
              onChange={(e) => handleCarLoanChange('balance', e.target.value)}
              placeholder="Enter loan balance"
            />
          </div>
          <div className="form-group">
            <label>Monthly Payment ($):</label>
            <input
              type="number"
              value={carLoan.monthlyPayment}
              onChange={(e) => handleCarLoanChange('monthlyPayment', e.target.value)}
              placeholder="Enter monthly payment"
            />
          </div>
          <div className="form-group">
            <label>Interest Rate (%):</label>
            <input
              type="number"
              value={carLoan.interestRate}
              onChange={(e) => handleCarLoanChange('interestRate', e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>
        </section>

        <section className="credit-cards-section wide-section">
        {/* <div className="credit-cards-grid"> */}
          <h2>Credit Cards</h2>
          {creditCards.map(card => (
            <div key={card.id} className="credit-card-form">
              <h3>Credit Card {card.id}</h3>
              <div className="form-group">
                <label>Balance ($):</label>
                <input
                  type="number"
                  value={card.balance}
                  onChange={(e) => handleCreditCardChange(card.id, 'balance', e.target.value)}
                  placeholder="Enter balance"
                />
              </div>
              <div className="form-group">
                <label>Minimum Payment ($):</label>
                <input
                  type="number"
                  value={card.minimumPayment}
                  onChange={(e) => handleCreditCardChange(card.id, 'minimumPayment', e.target.value)}
                  placeholder="Enter minimum payment"
                />
              </div>
              <div className="form-group">
                <label>Interest Rate (%):</label>
                <input
                  type="number"
                  value={card.interestRate}
                  onChange={(e) => handleCreditCardChange(card.id, 'interestRate', e.target.value)}
                  placeholder="Enter interest rate"
                />
              </div>
              <button 
                type="button" 
                onClick={() => removeCreditCard(card.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addCreditCard} className="add-button">
            Add Another Credit Card
          </button>
        {/* </div> */}
        </section>

        <section className="recommendations-section wide-section">
          <h2>Financial Recommendations</h2>
          <div className="recommendations">
            {paycheck ? (
              <ul>
                {generateRecommendation().map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p>Enter your paycheck amount to get recommendations.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;