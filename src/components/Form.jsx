import { useState } from 'react';

const Form = ({setResults}) => {
  const [form, setForm] = useState({
    amount: '',
    termYears: '',
    interestRate: '',
    type: 'repayment',
  });

  const [errors, setErrors] = useState({
    amount: null,
    termYears: null,
    interestRate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({...errors, [name]: null});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.amount || form.amount.trim() === "" || parseFloat(form.amount) <= 0) {
      newErrors.amount = 'This field is required';
    }
    if (!form.termYears || form.termYears.trim() === "" || parseFloat(form.termYears) <= 0) {
      newErrors.termYears = 'This field is required';
    }
    if (!form.interestRate || form.interestRate.trim() === "" || parseFloat(form.interestRate) < 0 || parseFloat(form.interestRate) > 100) {
      newErrors.interestRate = 'This field is required';
    }
    console.log('teste erros', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const calculateRepayment = () => {
    const principal = parseFloat(form.amount);
    const annualInterestRate = parseFloat(form.interestRate) / 100;
    const numberOfYears = parseFloat(form.termYears);
    const numberOfMonths = numberOfYears * 12;
    const monthlyInterestRate = annualInterestRate / 12;

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(numberOfYears) || principal <= 0 || numberOfYears <= 0 || annualInterestRate <=0) {
      return null;
    }

    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
    const totalRepayment = monthlyPayment * numberOfMonths;

    return { monthlyPayment: monthlyPayment.toFixed(2), totalRepayment: totalRepayment.toFixed(2) };
  };

  const calculateInterestOnly = () => {
    const principal = parseFloat(form.amount);
    const annualInterestRate = parseFloat(form.interestRate) / 100;
    const monthlyInterestRate = annualInterestRate / 12;

    if (isNaN(principal) || isNaN(annualInterestRate) || principal <= 0 || annualInterestRate <=0) {
      return null;
    }

    const monthlyPayment = principal * monthlyInterestRate;
    return {monthlyPayment: monthlyPayment.toFixed(2), totalRepayment: null};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const results = form.type === 'repayment' ? calculateRepayment() : calculateInterestOnly();
      if(results){
        setResults(results);
      } else {
        console.log("Valores inválidos para o cálculo.")
      }
    } else {
      console.log('Por favor, preencha todos os campos corretamente');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({ amount: '', termYears: '', interestRate: '', type: 'repayment' });
    setErrors({});
    setResults({ monthlyPayment: null, totalRepayment: null });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {/* ... header ... */}
        <div className="form-group">
          <label htmlFor="amount">Mortgage amount (€)</label>
          <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="termYears">Term (years)</label>
          <input type="number" id="termYears" name="termYears" value={form.termYears} onChange={handleChange} />
          {errors.termYears && <p className="error">{errors.termYears}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="interestRate">Interest rate (%)</label>
          <input type="number" id="interestRate" name="interestRate" value={form.interestRate} onChange={handleChange} />
          {errors.interestRate && <p className="error">{errors.interestRate}</p>}
        </div>
        <div className="form-group">
          <label>Type</label>
          <input type="radio" id="repayment" name="type" value="repayment" checked={form.type === 'repayment'} onChange={handleChange} />
          <label htmlFor="repayment">Repayment</label>
          <input type="radio" id="interest" name="type" value="interest" checked={form.type === 'interest'} onChange={handleChange} />
          <label htmlFor="interest">Interest Only</label>
        </div>
        <button type="submit" className="btn btn-primary">Calculate repayments</button>
      </form>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Form;