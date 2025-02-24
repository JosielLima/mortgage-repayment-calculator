import { useState } from 'react';

const Form = () => {
  const [form, setForm] = useState({
    amount: '', // Números positivos
    termYears: '', // Precisa ser um período de anos
    interestRate: '', // Valor em % de 0 a 100
    type: '', // Repayment ou Interest como radio buttons
  });

  const [errorValidateAmount, setErrorValidateAmount] = useState(null);
  const [errorValidateTermYears, setErrorValidateTermYears] = useState(null);
  const [errorValidateInterestRate, setErrorValidateInterestRate] = useState(null);
  
  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) || numAmount <= 0;
  };

  const validateTermYears = (termYears) => {
    const numTerm = parseFloat(termYears);
    if (numTerm < 1900 || numTerm > 2050) {
      return true;
    }
  };

  const validateInterestRate = (interestRate) => {
    const numRate = parseFloat(interestRate);
    if (numRate < 0 || numRate > 100) {
      return true;
    }
  };


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amountError = validateAmount(form.amount);
    const termError = validateTermYears(form.termYears);
    const rateError = validateInterestRate(form.interestRate);
    if (amountError || termError || rateError) {
      setErrorValidateAmount(amountError);
      setErrorValidateTermYears(termError);
      setErrorValidateInterestRate(rateError);
      return;
    }
    console.log('passou', errorValidateAmount, errorValidateTermYears, errorValidateInterestRate);
    setErrorValidateAmount(false);
    setErrorValidateTermYears(false);
    setErrorValidateInterestRate(false);
  }

  return <div className="form">
     <form onSubmit={handleSubmit}>
      <header className="header">
        <h6 className="text-preset-2 text-slate-900">Mortgage Calculator</h6>
        <button type='reset'>Clear all</button>
      </header>
      <div className="form-group">
        <label htmlFor="amount">Mortgage amount</label>
        <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} />
        {errorValidateAmount && <p className="error">Please enter a valid amount</p>}
      </div>
      <div className="form-group">
        <label htmlFor="termYears">Term (years)</label>
        <input type="number" min={1900} max={2050} id="termYears" name="termYears" value={form.termYears} onChange={handleChange}  />
        {errorValidateTermYears && <p className="error">Please enter a valid term</p>}
      </div>
      <div className="form-group">
        <label htmlFor="interestRate">Interest rate</label>
        <input type="number" min={0} max={100} id="interestRate" name="interestRate" value={form.interestRate} onChange={handleChange} />
        {errorValidateInterestRate && <p className="error">Please enter a valid interest rate</p>}
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select name="type" id="type" value={form.type}  onChange={handleChange} >
          <option value="repayment">Repayment</option>
          <option value="interest">Interest</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Calculate repayments</button>
     </form>
  </div>;
};

export default Form;