import { useState } from 'react';
import calculatorIcon from '../assets/icon-calculator.svg';
import classNames from 'classnames';

const Form = ({setResults}) => {
  const [form, setForm] = useState({
    amount: '',
    termYears: '',
    interestRate: '',
    type: '',
  });

  const [errors, setErrors] = useState({
    amount: null,
    termYears: null,
    interestRate: null,
    type: null,

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

    if (!form.type || form.type.trim() === "" || form.type === null) {
      newErrors.type = 'This field is required';
    }
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
    setForm({ amount: '', termYears: '', interestRate: '', type: '' });
    setErrors({});
    setResults({ monthlyPayment: null, totalRepayment: null });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <header className='header'>
          <h6 className="text-preset-2 text-slate-900">Mortgage Calculator</h6>
          <button onClick={handleReset} className='text-preset-4 btn-reset'>Clear all</button>
        </header>
        <div className="form-group">
          <label htmlFor="amount" className="text-preset-4 text-slate-700">Mortgage amount</label>
          <div className={classNames('input-group', { 'outline-error': errors.amount })}>
            <span className={classNames('icon text-preset-3', { 'icon-error': errors.amount })}>£</span>
            <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} className='input' />
          </div>
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>
        <div className='form-group-horizontal'>
          <div className="form-group">
            <label htmlFor="termYears" className="text-preset-4 text-slate-700">Term</label>
            <div className={classNames('input-group', { 'outline-error': errors.termYears })}>
              <input type="number" id="termYears" name="termYears" value={form.termYears} onChange={handleChange} className='input' />
              <span className={classNames('icon text-preset-3', { 'icon-error': errors.termYears })}>years</span>
            </div>
            {errors.termYears && <p className="error">{errors.termYears}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="interestRate" className="text-preset-4 text-slate-700">Interest rate</label>
            <div className={classNames('input-group', { 'outline-error': errors.interestRate })}>
              <input type="number" id="interestRate" name="interestRate" value={form.interestRate} onChange={handleChange} className='input' />
              <div className={classNames('icon text-preset-3', { 'icon-error': errors.interestRate })}>%</div>
            </div>
            {errors.interestRate && <p className="error">{errors.interestRate}</p>}
          </div>
        </div>
        <div className="form-group">
          <label className="text-preset-4 text-slate-700">Mortgage Type</label>
          <div className='input-group'>
            <input type="radio" id="repayment" name="type" value="repayment" checked={form.type === 'repayment'} onChange={handleChange} className='radio'/>
            <label htmlFor="repayment" className='text-preset-3 text-slate-900'>Repayment</label>
          </div>
          <div className='input-group'>
            <input type="radio" id="interest" name="type" value="interest" checked={form.type === 'interest'} onChange={handleChange} className='radio' />
            <label htmlFor="interest" className='text-preset-3 text-slate-900'>Interest Only</label>
          </div>
          {errors.type && <p className="error">{errors.type}</p>}
        </div>
        <button type="submit" className="btn btn-primary text-preset-3">
          <img src={calculatorIcon} alt="Calculator icon"/>
          Calculate Repayments
        </button>
      </form>
    </div>
  );
};

export default Form;