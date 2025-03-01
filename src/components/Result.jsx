import illustrationEmpty from '../assets/illustration-empty.svg';
const Result = ({ results }) => {
  return (
    <div className="result">
    {results.monthlyPayment === null ? (
      <>
        <img src={illustrationEmpty} alt="No calculations performed" className="result-image" />
        <h6 className="text-preset-2 text-center text-white">Results shown here</h6>
        <p className="text-preset-4 text-center">Complete the form and click “calculate repayments” to see what 
        your monthly repayments would be.</p>
      </>
    ) : (
      <>
          <h6 className="text-preset-2 text-center text-white">Calculation Results</h6>
          <p className="text-preset-4 text-center">
            Monthly repayments (€): {results.monthlyPayment}
          </p>
          {results.totalRepayment !== null && (
            <p className="text-preset-4 text-center">
              Total repayment (€): {results.totalRepayment}
            </p>
          )}
      </>)
    }
    </div>
  );
 
};

export default Result;