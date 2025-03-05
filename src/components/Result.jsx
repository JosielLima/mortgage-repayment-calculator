import illustrationEmpty from '../assets/illustration-empty.svg';
const Result = ({ results }) => {

  const formatarEuro = (valor) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    }).format(valor);
  }

  return (
    <div className="result">
    {results.monthlyPayment === null ? (
      <div className='result-empty'>
        <img src={illustrationEmpty} alt="No calculations performed" className="result-image" />
        <h6 className="text-preset-2 text-center text-white">Results shown here</h6>
        <p className="text-preset-4 text-slate-300 text-center">Complete the form and click “calculate repayments” to see what 
        your monthly repayments would be.</p>
      </div>
    ) : (
      <div className='result-full'>
          <div className='header'>
            <h6 className="text-preset-2 text-white">Your results</h6>
            <p className="text-preset-4 text-slate-300">
            Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.
            </p>
          </div>
          <div className='card'>
            <div>
              <p className='text-preset-4 text-slate-300'>Your monthly repayments</p>
              <div className='text-preset-1 text-primary'>{formatarEuro(results.monthlyPayment)}</div>
            </div>
            {results.totalRepayment !== null && (
            <>
              <hr />
              <div>
                <p className="text-preset-4 text-slate-300">Total you&apos;ll repay over the term</p>
                <p className="text-preset-2 text-white">
                  {formatarEuro(results.totalRepayment)}
                </p>
              </div>
            </>
            )}
          </div>
      </div>)
    }
    </div>
  );
};

export default Result;