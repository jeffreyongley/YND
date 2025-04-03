import React, { useState } from 'react';
import './App.css';

function App() {

  // Initialize state variables
  const [paycheck, setPaycheck] = useState('')
  const [grossPaycheck, setGrossPaycheck] = useState('')
  const [creditCards, setCreditCards] = useState([
    { id: 1, balance: '', minimumPayment: '', interestRate: '' }
  ]);
  const [carLoan, setCarLoan] = useState({
    balance: '',
    monthlyPayment: '',
    interestRate: ''
  });
  const [emergencyFund, setEmergencyFund] = useState({
    balance: '',
    goal: '',
    deductable: '',
  })
  const [needsBalance, setNeedsBalance] = useState(0);
  const [wantsBalance, setWantsBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  // const [employerMatch, setEmployerMatch] = useState({
  //   matchPercentageCap: 5
  // })

  // Initialize event handlers for state changes
  const handleEmergencyFundChange = (e) => {
    setEmergencyFund(e.target.value);
  };
  const handlePaycheckChange = (e) => {
    setPaycheck(e.target.value);
  };
  const handleGrossPaycheckChange = (e) => {
    setGrossPaycheck(e.target.value);
  };
  const handleCreditCardChange = (id, field, value) => {
    setCreditCards(creditCards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };
  const handleCarLoanChange = (field, value) => {
    setCarLoan({ ...carLoan, [field]: value });
  };

  // Add a new credit card form section
  const addCreditCard = () => {
    const newId = creditCards.length > 0 ? Math.max(...creditCards.map(card => card.id)) + 1 : 1;
    setCreditCards([...creditCards, { id: newId, balance: '', minimumPayment: '', interestRate: '' }]);
  };

  // Remove a credit card form section
  const removeCreditCard = (id) => {
    setCreditCards(creditCards.filter(card => card.id !== id));
  };

  // Generate financial recommendation
  const generateRecommendation = () => {
    // Simple recommendation logic - to be expanded
    let availableMoney = parseFloat(paycheck);
    let recommendation = [];

    // crreate the 50/30/20 Split (Needs/ Wants/ Savings)
    const calculatedNeedsBalance = availableMoney * 0.5;
    setNeedsBalance(calculatedNeedsBalance);
    const calculatedSavingsBalance = availableMoney * .2
    setSavingsBalance(calculatedSavingsBalance);
    const calculatedWantsBalance = availableMoney * .3
    setWantsBalance(calculatedWantsBalance);
    
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
    
    setRecommendations(recommendation);
  };

  // // Format currency input
  // const formatCurrency = (value) => {
  //   return value ? parseFloat(value).toFixed(2) : '';
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontSize: '3rem' }}>Your Next Dollar</h1>
        <p style={{ fontSize: '1.5rem' }}>Obey the FOO! (Financial Order of Operations)</p>
        <p style={{ fontSize: '1.5rem' }}>Discover the most efficient place for every soldier in your army of dollars!</p>
      </header>
      
      <main className="App-main">
        <section className="income-section">
          <h2 style={{ fontSize: '2rem' }}>Income</h2>
          <div className="form-group">
            <label htmlFor="paycheck" style={{ fontSize: '1.2rem' }}>Net Paycheck Amount ($):</label>
            <input
              type="number"
              id="paycheck"
              value={paycheck}
              onChange={handlePaycheckChange}
              placeholder="Enter paycheck amount"
            />
            <label htmlFor="grossPaycheck" style={{ fontSize: '1.2rem' }}>Gross Paycheck Amount ($):</label>
            <input
              type="number"
              id="grossPaycheck"
              value={grossPaycheck}
              onChange={handleGrossPaycheckChange}
              placeholder="Enter Gross paycheck amount"
            />
          </div>
        </section>

        <section className="emergency-section">
          <h2 style={{ fontSize: '2rem' }}>Emergency Fund</h2>
          <div className="form-group">
            <label htmlFor="paycheck" style={{ fontSize: '1.2rem' }}>Emergency Fund Balance ($):</label>
            <input
              type="number"
              id="emergencyFundBalance"
              value={emergencyFund.balance}
              onChange={handleEmergencyFundChange}
              placeholder="Remember this should be in cash or cash equivalents."
            />
            <label htmlFor="paycheck" style={{ fontSize: '1.2rem' }}>Emergency Fund Goal ($):</label>
            <input
              type="number"
              id="emergencyFundGoal"
              value={emergencyFund.goal}
              onChange={handleEmergencyFundChange}
              placeholder="Normally 3-6 months of expenses."
            />
            <label htmlFor="paycheck" style={{ fontSize: '1.2rem' }}>What is your Largest deductable?</label>
            <input
              type="number"
              id="emergencyFundDeductable"
              value={emergencyFund.deductable}
              onChange={handleEmergencyFundChange}
              placeholder="Normally from health insurance or car insurance."
            />
          </div>
        </section>
        
        <section className="car-loan-section">
          <h2 style={{ fontSize: '2rem' }}>Car Loan</h2>
          <div className="form-group">
            <label style={{ fontSize: '1.2rem' }}>Loan Balance ($):</label>
            <input
              type="number"
              value={carLoan.balance}
              onChange={(e) => handleCarLoanChange('balance', e.target.value)}
              placeholder="Enter loan balance"
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '1.2rem' }}>Monthly Payment ($):</label>
            <input
              type="number"
              value={carLoan.monthlyPayment}
              onChange={(e) => handleCarLoanChange('monthlyPayment', e.target.value)}
              placeholder="Enter monthly payment"
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '1.2rem' }}>Interest Rate (%):</label>
            <input
              type="number"
              value={carLoan.interestRate}
              onChange={(e) => handleCarLoanChange('interestRate', e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>
        </section>

        <section className="credit-cards-section">
          <h2 style={{ fontSize: '2rem' }}>Credit Cards</h2>
          {creditCards.map(card => (
            <div key={card.id} className="credit-card-form" data-testid="credit-card-form">
              <h3 style={{ fontSize: '1.5rem' }}>Credit Card {card.id}</h3>
              <div className="form-group">
                <label style={{ fontSize: '1.2rem' }}>Balance ($):</label>
                <input
                  type="number"
                  value={card.balance}
                  onChange={(e) => handleCreditCardChange(card.id, 'balance', e.target.value)}
                  placeholder="Enter balance"
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '1.2rem' }}>Minimum Payment ($):</label>
                <input
                  type="number"
                  value={card.minimumPayment}
                  onChange={(e) => handleCreditCardChange(card.id, 'minimumPayment', e.target.value)}
                  placeholder="Enter minimum payment"
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '1.2rem' }}>Interest Rate (%):</label>
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
        </section>

        <section className="split-section">
          <h2 style={{ fontSize: '2rem' }}>Your 50/30/20 Split</h2>
          <div className="needs-wants-savings">
            <div data-testid="needs-display" style={{ fontSize: '1.5rem' }}><strong>Needs:</strong> ${needsBalance.toFixed(2)}</div>
            <div data-testid="wants-display" style={{ fontSize: '1.5rem' }}><strong>Wants:</strong> ${wantsBalance.toFixed(2)}</div>
            <div data-testid="savings-display" style={{ fontSize: '1.5rem' }}><strong>Savings:</strong> ${savingsBalance.toFixed(2)}</div>
          </div>
        </section>

        <section className="recommendations-section">
          <h2 style={{ fontSize: '2rem' }}>Financial Recommendations</h2>
          <button onClick={generateRecommendation}>Generate Recommendations</button>
          <div className="recommendations">
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index} style={{ fontSize: '1.2rem' }}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '1.2rem' }}>Enter your paycheck amount and click "Generate Recommendations" to get recommendations.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;